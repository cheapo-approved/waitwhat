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

  return (
    <div ref={menuRef} className="relative pb-[1px]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open menu"
        aria-expanded={open}
        className="rounded-lg px-2 py-1 text-3xl font-black leading-none text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        ☰
      </button>

      {open && (
        <nav className="absolute right-0 z-50 mt-3 w-48 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
          <Link
            href="/random"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-gray-700 hover:bg-gray-100 hover:text-black"
          >
            Random
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-gray-700 hover:bg-gray-100 hover:text-black"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-gray-700 hover:bg-gray-100 hover:text-black"
          >
            Contact
          </Link>
        </nav>
      )}
    </div>
  );
}