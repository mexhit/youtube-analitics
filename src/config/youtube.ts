// Centralized configuration for YouTube API
// Reads the API key from environment variables.
// For server components and server-side code, use YOUTUBE_API_KEY.
// If you need client-side access, expose a separate NEXT_PUBLIC_YOUTUBE_API_KEY.

export function getYoutubeApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";
  if (!key) {
    // We don't throw here to avoid breaking builds; caller can decide how to handle missing key.
    // You can enable the throw below if you want to enforce presence at runtime.
    // throw new Error("YouTube API key is not configured. Set YOUTUBE_API_KEY in your environment.");
  }
  return key;
}

export function isYoutubeConfigured(): boolean {
  return Boolean(process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);
}
