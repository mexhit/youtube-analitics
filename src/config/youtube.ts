// Centralized configuration for YouTube API
// How it works in Next.js:
// - Server-side code (server components, route handlers, getServerSideProps, etc.)
//   can read process.env.YOUTUBE_API_KEY.
// - Client-side code can only access env vars prefixed with NEXT_PUBLIC_.
//
// IMPORTANT: .env.example is only a sample. Copy it to .env.local and fill in values.
// Next.js automatically loads .env.local (not committed) on dev and build.

export function getYoutubeApiKey(): string {
  // In the browser, only NEXT_PUBLIC_ variables are available.
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";
  }

  // On the server, prefer the private key; fall back to NEXT_PUBLIC_ if necessary.
  const key = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";

  // Do not log secrets. Optionally, warn (non-throw) to make config issues visible during dev.
  if (!key && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "[youtube config] Missing API key. Set YOUTUBE_API_KEY in .env.local (or NEXT_PUBLIC_YOUTUBE_API_KEY for client usage)."
    );
  }
  return key;
}

export function isYoutubeConfigured(): boolean {
  if (typeof window !== "undefined") {
    return Boolean(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);
  }
  return Boolean(process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);
}
