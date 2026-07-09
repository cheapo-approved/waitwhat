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
      <header className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto flex max-w-6xl items-end justify-between px-5 pt-6 pb-5 sm:px-8 sm:pt-7 sm:pb-6">
          <div>
            <Link href="/" className="-ml-4 block sm:-ml-5">
              <Image
                src="/brand/waitwhat-logo.png"
                alt="WAIT...WHAT?!"
                width={1000}
                height={243}
                priority
                className="h-auto w-[310px] sm:w-[470px] md:w-[590px]"
              />
            </Link>

            <p className="mt-1 -ml-1 text-[0.68rem] font-black leading-none tracking-[0.38em] text-gray-500 sm:text-sm">
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