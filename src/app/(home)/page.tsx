import { Suspense } from "react";
import ChatsCard from "./_components/chats-card";
import { RegionLabels } from "./_components/region-labels";
import OverviewCards from "./_components/OverviewCards";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <OverviewCards />
      </Suspense>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <RegionLabels />

        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<div>Loading...</div>}>
            <ChatsCard />
          </Suspense>
        </div>
      </div>
    </>
  );
}
