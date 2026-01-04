import { Suspense } from "react";
import { DataPage } from "@/app/dashboard/[channelId]/live/[live]/DataPage";
import { Loader } from "@/app/dashboard/[channelId]/live/[live]/loader";

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
