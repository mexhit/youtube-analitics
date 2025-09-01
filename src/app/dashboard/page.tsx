import { DataPage } from "@/app/dashboard/DataPage";
import { Suspense } from "react";
import { Loader } from "@/app/dashboard/loader";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    channel: string;
    live: string;
  };
}) {
  const params = JSON.stringify(searchParams);

  return (
    <Suspense fallback={<Loader />} key={params}>
      <DataPage searchParams={searchParams} />
    </Suspense>
  );
}
