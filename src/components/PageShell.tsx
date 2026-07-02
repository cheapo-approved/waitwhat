import Image from "next/image";
import Link from "next/link";
import MastheadMenu from "@/components/MastheadMenu";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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

            <p className="mt-1 text-[0.68rem] font-black uppercase leading-none tracking-[0.38em] text-gray-500 sm:text-sm">
              Rediscover Wonder
            </p>
          </div>

          <MastheadMenu />
        </div>
      </header>

      {children}
    </>
  );
}