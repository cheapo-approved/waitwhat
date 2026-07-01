import Image from "next/image";
import Link from "next/link";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        {/* Masthead */}
        <div className="mx-auto max-w-6xl px-5 pt-7 pb-4">
          <div className="flex justify-center">
            <Link href="/" aria-label="WAIT...WHAT?! Home">
              <Image
                src="/brand/waitwhat-logo.png"
                alt="WAIT...WHAT?!"
                width={520}
                height={120}
                priority
                className="h-16 w-auto md:h-20"
              />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mx-auto flex max-w-6xl justify-end gap-8 px-5 pb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-600">
          <Link href="/" className="transition hover:text-gray-950">
            Discoveries
          </Link>
          <Link href="/random" className="transition hover:text-gray-950">
            Random
          </Link>
        </nav>
      </header>

      {children}
    </>
  );
}