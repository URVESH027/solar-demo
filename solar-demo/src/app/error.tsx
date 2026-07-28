"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6">
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />

      <div className="relative flex flex-col items-center text-center">
        <h1 className="font-display text-6xl font-bold text-white md:text-7xl">
          Error
        </h1>
        <p className="mt-4 max-w-sm text-base text-white/50">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold-dark hover:shadow-[0_4px_16px_rgba(212,168,67,0.3)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
