import Image from "next/image";
import Link from "next/link";
import MastheadMenu from "@/components/MastheadMenu";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <Link href="/" className="-ml-2 block">
              <Image
                src="/brand/waitwhat-logo.png"
                alt="WAIT...WHAT?!"
                width={1000}
                height={243}
                priority
                className="h-auto w-[240px] sm:w-[340px] md:w-[400px]"
              />
            </Link>

            <p className="mt-1 text-[0.58rem] font-black leading-none tracking-[0.34em] text-gray-500 sm:text-xs">
              You ain't gonna believe this
            </p>
          </div>

          <MastheadMenu />
        </div>
      </header>

      {children}

      <footer className="mt-4 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-7 text-center sm:px-8 sm:py-8">
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold uppercase tracking-[0.16em] text-gray-600">
            <Link href="/" className="hover:text-black">
              Home
            </Link>

            <Link href="/random" className="hover:text-black">
              Random
            </Link>

            <Link href="/about" className="hover:text-black">
              About
            </Link>

            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </nav>

          <p className="mt-5 text-xs uppercase tracking-[0.22em] text-gray-400">
            © {new Date().getFullYear()} WAIT...WHAT?!
          </p>
        </div>
      </footer>
    </div>
  );
}