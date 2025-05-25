import { Suspense } from "react";
import { HousePriceEstimatorCard } from "./(home)/_components/house-price-estimator-card";
import {RecentPriceEstimatorCard} from "@/app/(home)/_components/recent-price-estimator-card";

export default async function Home() {

  return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-4 py-6 max-w-[1200px] mx-auto">
          <Suspense fallback={null}>
              <div className="w-full flex justify-center min-w-[250px] lg:min-w-[550px] h-fit">
                  <HousePriceEstimatorCard/>
              </div>
              <div className="w-full flex justify-center min-w-[550px] h-fit">
                  <RecentPriceEstimatorCard/>
              </div>
          </Suspense>
      </div>
  );
}
