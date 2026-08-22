import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Resend } from "resend";

function loadEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);

  if (!fs.existsSync(filePath)) return;

  const contents = fs.readFileSync(filePath, "utf8");

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET;

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY.");
  process.exit(1);
}

if (!UNSUBSCRIBE_SECRET) {
  console.error("Missing UNSUBSCRIBE_SECRET.");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

const slug = process.argv[2];

if (!slug) {
  console.error("");
  console.error("Missing story slug.");
  console.error("");
  console.error("Example:");
  console.error("  npm run email-story -- snoop-dogg-bowl");
  console.error("");
  process.exit(1);
}

const storyDirectory = path.join(
  process.cwd(),
  "src",
  "data",
  "stories"
);

function findStoryFile(directory, storySlug) {
  if (!fs.existsSync(directory)) {
    return null;
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const found = findStoryFile(fullPath, storySlug);

      if (found) return found;
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))
    ) {
      const contents = fs.readFileSync(fullPath, "utf8");

      const slugMatch = contents.match(
        /slug:\s*["'`]([^"'`]+)["'`]/
      );

      if (slugMatch?.[1] === storySlug) {
        return {
          path: fullPath,
          contents,
        };
      }
    }
  }

  return null;
}

function extractString(contents, fieldName) {
  const regex = new RegExp(
    `${fieldName}:\\s*["'\`]([\\s\\S]*?)["'\`]\\s*,`
  );

  const match = contents.match(regex);

  if (!match) return null;

  return match[1]
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .trim();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function unsubscribeToken(email) {
  return crypto
    .createHmac("sha256", UNSUBSCRIBE_SECRET)
    .update(email)
    .digest("hex");
}

function buildEmail({ email, title, summary, slug }) {
  const cleanEmail = email.trim().toLowerCase();

  const storyUrl =
    `https://waitwhat.media/story/${encodeURIComponent(slug)}`;

  const token = unsubscribeToken(cleanEmail);

  const unsubscribeUrl =
    `https://waitwhat.media/api/unsubscribe` +
    `?email=${encodeURIComponent(cleanEmail)}` +
    `&token=${encodeURIComponent(token)}`;

  const safeTitle = escapeHtml(title);
  const safeSummary = escapeHtml(summary);

  return {
    from: "Wait...What?! <hello@waitwhat.media>",
    to: cleanEmail,
    replyTo: "tom@waitwhat.media",
    subject: title,

    html: `
      <!doctype html>
      <html>
        <body style="
          margin: 0;
          padding: 0;
          background: #ffffff;
          font-family: Arial, Helvetica, sans-serif;
          color: #111111;
        ">
          <div style="
            max-width: 560px;
            margin: 0 auto;
            padding: 48px 24px;
          ">
            <p style="
              margin: 0 0 14px;
              font-size: 12px;
              line-height: 1.4;
              font-weight: 700;
              letter-spacing: 2px;
              color: #888888;
            ">
              NEW DISCOVERY
            </p>

            <h1 style="
              margin: 0 0 24px;
              font-size: 32px;
              line-height: 1.15;
              font-weight: 800;
            ">
              ${safeTitle}
            </h1>

            <p style="
              margin: 0 0 28px;
              font-size: 17px;
              line-height: 1.6;
            ">
              ${safeSummary}
            </p>

            <a
              href="${storyUrl}"
              style="
                display: inline-block;
                background: #111111;
                color: #ffffff;
                text-decoration: none;
                font-size: 14px;
                font-weight: 700;
                padding: 12px 18px;
                border-radius: 8px;
              "
            >
              Read the story →
            </a>

            <p style="
              margin: 32px 0 0;
              font-size: 15px;
              line-height: 1.6;
            ">
              Tom
            </p>

            <p style="
              margin: 48px 0 0;
              font-size: 11px;
              line-height: 1.5;
              color: #888888;
            ">
              Don’t want these anymore?
              <a
                href="${unsubscribeUrl}"
                style="
                  color: #888888;
                  text-decoration: underline;
                "
              >
                Unsubscribe.
              </a>
            </p>
          </div>
        </body>
      </html>
    `,
  };
}

async function getAllContacts() {
  const contacts = [];
  let after;

  while (true) {
    const { data, error } = await resend.contacts.list({
      limit: 100,
      ...(after ? { after } : {}),
    });

    if (error) {
      throw new Error(
        `Could not load contacts: ${JSON.stringify(error)}`
      );
    }

    const pageContacts = data?.data ?? [];

    contacts.push(...pageContacts);

    if (!data?.has_more || pageContacts.length === 0) {
      break;
    }

    after = pageContacts[pageContacts.length - 1].id;
  }

  return contacts;
}

async function main() {
  const storyFile = findStoryFile(storyDirectory, slug);

  if (!storyFile) {
    console.error(`Story not found: ${slug}`);
    process.exit(1);
  }

  const title = extractString(storyFile.contents, "title");
  const summary = extractString(storyFile.contents, "summary");

  if (!title || !summary) {
    console.error(
      `Could not read title/summary from ${storyFile.path}`
    );
    process.exit(1);
  }

  console.log("");
  console.log("Wait...What?! Story Email");
  console.log("-------------------------");
  console.log(`Story: ${title}`);
  console.log(`Slug:  ${slug}`);
  console.log("");

  const contacts = await getAllContacts();

  const active = contacts.filter(
    (contact) => !contact.unsubscribed
  );

  const unsubscribed = contacts.length - active.length;

  console.log(`Contacts:     ${contacts.length}`);
  console.log(`Active:       ${active.length}`);
  console.log(`Unsubscribed: ${unsubscribed}`);
  console.log("");

  if (active.length === 0) {
    console.log("Nobody to email.");
    return;
  }

  const emails = active.map((contact) =>
    buildEmail({
      email: contact.email,
      title,
      summary,
      slug,
    })
  );

  const batches = [];

  for (let i = 0; i < emails.length; i += 100) {
    batches.push(emails.slice(i, i + 100));
  }

  let sent = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    console.log(
      `Sending batch ${i + 1}/${batches.length} (${batch.length} emails)...`
    );

    const idempotencyKey =
      `waitwhat-story-${slug}-batch-${i + 1}`;

    const { error } = await resend.batch.send(
      batch,
      {
        idempotencyKey,
      }
    );

    if (error) {
      console.error("");
      console.error("SEND FAILED");
      console.error(error);
      process.exit(1);
    }

    sent += batch.length;
  }

  console.log("");
  console.log(
    `✓ Sent ${sent} story email${sent === 1 ? "" : "s"}.`
  );
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("Email broadcast failed:");
  console.error(error);
  process.exit(1);
});