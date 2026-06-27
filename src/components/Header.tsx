import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-2xl font-black tracking-tight">
          WAITWHAT
        </Link>

        <nav className="flex gap-6 text-sm font-bold">
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