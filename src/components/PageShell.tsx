import Image from "next/image";
import Link from "next/link";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-gray-200">
        {/* Logo */}
        <div className="mx-auto max-w-6xl px-5 pt-4 pb-2">
          <div className="flex flex-col items-start">
            <Link href="/" className="-ml-3 block">
              <Image
                src="/brand/waitwhat-logo.png"
                alt="WAIT...WHAT?!"
                width={700}
                height={170}
                priority
                className="w-[260px] h-auto sm:w-[340px] md:w-[420px]"
              />
            </Link>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
              Recover Wonder.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mx-auto flex max-w-6xl justify-end gap-10 px-5 pb-3 text-sm font-semibold uppercase tracking-[0.18em]">
          <Link
            href="/"
            className="transition-colors hover:text-gray-500"
          >
            Discoveries
          </Link>

          <Link
            href="/random"
            className="transition-colors hover:text-gray-500"
          >
            Random
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}