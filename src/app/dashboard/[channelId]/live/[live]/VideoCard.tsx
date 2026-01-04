import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount?: number | string;
};

const formatNumberCompact = (num?: number | string) => {
  if (num === undefined || num === null) return "0";

  const n = Number(num);
  if (Number.isNaN(n)) return String(num);

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(n);
};

const VideoCard = React.memo(
  ({ id, title, thumbnailUrl, viewCount }: Props) => {
    const href = `https://www.youtube.com/watch?v=${id}`;

    return (
      <div className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} on YouTube`}
        >
          <article className="h-full overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900 shadow-md transition-shadow hover:shadow-xl">
            <div className="relative aspect-video w-full bg-neutral-800">
              <Image
                src={thumbnailUrl}
                alt={title}
                width={480}
                height={270}
                className="object-cover w-full h-auto"
                sizes="(max-width: 640px) 100vw, 480px"
              />
            </div>

            <div className="flex items-start gap-2 p-3">
              <div className="flex-1">
                <h3 className="line-clamp-2 text-sm font-medium text-neutral-100">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Views: {formatNumberCompact(viewCount)}
                </p>
              </div>

              <span
                className="mt-1 shrink-0 text-neutral-500 group-hover:text-neutral-300"
                aria-hidden
              >
                ↗
              </span>
            </div>
          </article>
        </Link>
      </div>
    );
  },
);

VideoCard.displayName = "VideoCard";

export default VideoCard;
