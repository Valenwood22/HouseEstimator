import { Suspense } from "react";
import { HousePriceEstimatorCard } from "./_components/house-price-estimator-card";

export default async function Home() {

  return (
    <>
      <Suspense fallback={null}>
        <HousePriceEstimatorCard />
      </Suspense>
    </>
  );
}
