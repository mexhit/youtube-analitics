import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount?: number | string;
  channelId?: string;
};

function formatNumberCompact(num?: number | string) {
  if (num === undefined || num === null) return "0";
  const n = Number(num);
  if (Number.isNaN(n)) return String(num);
  try {
    return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
  } catch {
    return n.toLocaleString();
  }
}

const VideoCard: React.FC<Props> = ({ id, title, thumbnailUrl, viewCount }) => {
  const href = `https://www.youtube.com/watch?v=${id}`;
  return (
    <div className="w-full p-2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
      <Link href={href} target="_blank" aria-label={`${title} on YouTube`}>
        <div className="group h-full overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900 shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl">
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex items-start gap-2 p-3">
            <div className="flex-1">
              <div className="line-clamp-2 text-sm font-medium text-neutral-100">
                {title}
              </div>
              <div className="mt-1 text-xs text-neutral-400">
                Views: {formatNumberCompact(viewCount)}
              </div>
            </div>
            <span
              className="mt-1 shrink-0 text-neutral-500 group-hover:text-neutral-300"
              aria-hidden
            >
              ↗
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
