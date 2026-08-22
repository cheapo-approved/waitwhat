"use client";

import { useRef, useState } from "react";

export default function EmailSignup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const lastTouchRef = useRef(0);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function subscribe() {
    if (status === "loading") return;

    const email = emailRef.current?.value.trim() ?? "";

    if (!email) {
      emailRef.current?.focus();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  function handleTouchEnd() {
    lastTouchRef.current = Date.now();
    subscribe();
  }

  function handleClick() {
    // iPhone can generate a click immediately after touchend.
    // Ignore that duplicate.
    if (Date.now() - lastTouchRef.current < 700) return;

    subscribe();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      subscribe();
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5 shadow-sm sm:px-6">
      {status === "success" ? (
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900">
            You’re in.
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            We’ll send you the next one.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                Want another one?
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Get the next story when it drops.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl">
              <input
                ref={emailRef}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@email.com"
                onKeyDown={handleKeyDown}
                className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 sm:flex-1"
              />

              <button
                type="button"
                onClick={handleClick}
                onTouchEnd={handleTouchEnd}
                disabled={status === "loading"}
                className="relative z-10 w-full cursor-pointer touch-manipulation whitespace-nowrap rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-black hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {status === "loading" ? "Joining..." : "Send it"}
              </button>
            </div>
          </div>

          {status === "error" && (
            <p className="mt-2 text-sm text-red-600">
              Something went wrong. Try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}