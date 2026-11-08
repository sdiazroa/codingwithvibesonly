import Link from "next/link";

// The site's mark: the same prompt and cursor as the favicon.
export function Brand() {
  return (
    <Link href="/" className="brand">
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0a0f1f" />
        <path d="m8 10 6 6-6 6" fill="none" stroke="#8fb0ff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16.5" y="20" width="8" height="2.8" rx="1.2" fill="#ffffff" />
      </svg>
      Coding with Vibes Only
    </Link>
  );
}
