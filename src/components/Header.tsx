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
        <div className="mx-auto max-w-6xl px-5 pt-6 pb-3 flex justify-center">
          <Link href="/">
            <Image
              src="/brand/waitwhat-logo.png"
              alt="WAIT...WHAT?!"
              width={520}
              height={120}
              priority
              className="w-auto h-14 md:h-20"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="mx-auto max-w-6xl px-5 pb-4 flex justify-end gap-10 text-sm font-semibold uppercase tracking-[0.18em]">
          <Link href="/">Discoveries</Link>
          <Link href="/random">Random</Link>
        </div>

      </header>

      {children}
    </>
  );
}