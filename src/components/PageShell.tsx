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
        <div className="mx-auto max-w-6xl px-5 pt-4 pb-2">
          <div className="flex flex-col items-start">
            <Link href="/" className="-ml-3 block">
              <Image
                src="/brand/waitwhat-logo.png"
                alt="WAIT...WHAT?!"
                width={700}
                height={170}
                priority
                className="h-auto w-[230px] sm:w-[320px] md:w-[400px]"
              />
            </Link>

            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.3em] text-gray-500">
              Recover Wonder.
            </p>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl justify-end gap-10 px-5 pb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-700">
          <Link href="/">Discoveries</Link>
          <Link href="/random">Random</Link>
        </nav>
      </header>

      {children}
    </>
  );
}