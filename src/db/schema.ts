import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const votes = sqliteTable("votes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  storySlug: text("story_slug").notNull(),
  vote: text("vote", { enum: ["WAIT", "WHAT"] }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});