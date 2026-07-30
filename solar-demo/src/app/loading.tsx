export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border border-gold/20 border-t-gold" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 text-gold"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </div>
      <div className="mt-6 text-center">
        <div className="text-sm font-semibold tracking-tight text-white">
          Go Green Solution
        </div>
      </div>
    </div>
  );
}
