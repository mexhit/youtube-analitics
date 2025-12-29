import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <section className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          YouTube Statistics Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-300 mb-8">
          Explore channel performance, recent uploads, and video analytics
          across your favorite YouTube channels.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={{ pathname: "/dashboard/UCHxjdViHPvbFKiOfj74IbeQ/live/true" }}
            className="rounded-md bg-red-600 text-white px-6 py-3 font-semibold hover:bg-red-500 transition-colors text-center"
          >
            Open Dashboard
          </Link>
          <Link
            href={{
              pathname: "/dashboard/UCHxjdViHPvbFKiOfj74IbeQ/live/false",
            }}
            className="rounded-md border border-gray-300 dark:border-gray-700 px-6 py-3 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
          >
            Start with Live Data
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-2">Channel Selector</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Quickly switch between predefined channels like Big Brother, Top
              Channel, CNN, and more.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-2">Views & Engagement</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Visualize views and comments over recent uploads with interactive
              charts.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-2">Live or Mock</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle between live API data and bundled mock data for fast demos.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-gray-400">
          Tip: configure your API key in .env.local as YOUTUBE_API_KEY to enable
          live mode.
        </p>
      </section>
    </main>
  );
}
