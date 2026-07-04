"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MastheadMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/random", label: "Random" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div ref={menuRef} className="relative pb-[1px]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="cursor-pointer rounded-lg px-2 py-1 text-3xl font-black leading-none text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        {open ? "×" : "☰"}
      </button>

      {open && (
        <nav className="absolute right-0 z-50 mt-4 w-56 overflow-hidden rounded-3xl border border-stone-200 bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="divide-y divide-stone-200">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block cursor-pointer px-6 py-5 text-sm font-black uppercase tracking-[0.22em] text-stone-700 transition hover:bg-stone-50 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}