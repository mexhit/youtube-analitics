import { Suspense } from "react";
import { DataPage } from "@/app/dashboard/[channelId]/live/[live]/DataPage";
import { Loader } from "@/app/dashboard/[channelId]/live/[live]/loader";
import { Channels } from "@/app/dashboard/[channelId]/live/[live]/constants";

export async function generateStaticParams() {
  const staticParams = [];

  for (const key in Channels) {
    staticParams.push({
      channelId: Channels[key].id,
      live: "true",
    });

    staticParams.push({
      channelId: Channels[key].id,
      live: "false",
    });
  }

  return staticParams;
}

export default async function Page({
  params,
}: {
  params: {
    channelId: string;
    live: string;
  };
}) {
  return (
    <Suspense fallback={<Loader />} key={params.channelId}>
      <DataPage
        searchParams={{ channel: params.channelId, live: params.live }}
      />
    </Suspense>
  );
}
