import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-xl font-black tracking-tight sm:text-2xl">
          WAITWHAT
        </Link>

        <nav className="flex gap-4 text-sm font-bold sm:gap-6">
          <Link href="/stories" className="hover:underline">
            Discoveries
          </Link>

          <Link href="/random" className="hover:underline">
            Random
          </Link>
        </nav>
      </div>
    </header>
  );
}