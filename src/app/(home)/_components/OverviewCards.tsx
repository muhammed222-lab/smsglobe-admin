"use client";
import { useEffect, useState } from "react";
import { fetchOverviewData, OverviewData } from "../fetchOverviewData";
import BarChart from "../_components/BarChart";
import LineChart from "../_components/LineChart";

const OverviewCards = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const overviewData = await fetchOverviewData();
      setData(overviewData);
      setLoading(false);
    }

    getData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: [
      "Total Users",
      "Total Referral Users",
      "Total Money in System",
      "Total Deposits",
    ],
    values: [
      data?.totalUsers || 0,
      data?.totalReferralUsers || 0,
      data?.totalMoney || 0,
      data?.totalDeposits || 0,
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="relative h-[100px] rounded border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="absolute right-2 top-2 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Total Users
        </h3>
        <p className="mt-2 text-3xl text-gray-900 dark:text-white">
          {data?.totalUsers}
        </p>
      </div>
      <div className="relative h-[100px] rounded border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="absolute right-2 top-2 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Total Referral Users
        </h3>
        <p className="mt-2 text-3xl text-gray-900 dark:text-white">
          {data?.totalReferralUsers}
        </p>
      </div>
      <div className="relative h-[100px] rounded border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="absolute right-2 top-2 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Total Money in System
        </h3>
        <p className="mt-2 text-3xl text-gray-900 dark:text-white">
          {formatCurrency(data?.totalMoney || 0)}
        </p>
      </div>
      <div className="relative h-[100px] rounded border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="absolute right-2 top-2 h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Total Deposits
        </h3>
        <p className="mt-2 text-3xl text-gray-900 dark:text-white">
          {formatCurrency(data?.totalDeposits || 0)}
        </p>
      </div>
      <div className="col-span-1 md:col-span-2 xl:col-span-4">
        <BarChart data={chartData} />
      </div>
      <div className="col-span-1 md:col-span-2 xl:col-span-4">
        <LineChart data={chartData} />
      </div>
    </div>
  );
};

export default OverviewCards;
