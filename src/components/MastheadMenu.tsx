import Link from "next/link";

export default function MastheadMenu() {
  return (
    <details className="relative z-[60]">
      <summary
        aria-label="Open menu"
        className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-lg text-3xl font-black leading-none text-gray-700 transition hover:bg-gray-100 active:bg-gray-100 [&::-webkit-details-marker]:hidden"
      >
        ☰
      </summary>

      <nav className="absolute right-0 z-[70] mt-3 w-56 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
        <div className="divide-y divide-stone-200">
          <Link
            href="/"
            className="block px-6 py-5 text-sm font-black uppercase tracking-[0.22em] text-stone-700 transition hover:bg-stone-50 active:bg-stone-100"
          >
            Home
          </Link>

          <Link
            href="/random"
            className="block px-6 py-5 text-sm font-black uppercase tracking-[0.22em] text-stone-700 transition hover:bg-stone-50 active:bg-stone-100"
          >
            Random
          </Link>

          <Link
            href="/about"
            className="block px-6 py-5 text-sm font-black uppercase tracking-[0.22em] text-stone-700 transition hover:bg-stone-50 active:bg-stone-100"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="block px-6 py-5 text-sm font-black uppercase tracking-[0.22em] text-stone-700 transition hover:bg-stone-50 active:bg-stone-100"
          >
            Contact
          </Link>
        </div>
      </nav>
    </details>
  );
}