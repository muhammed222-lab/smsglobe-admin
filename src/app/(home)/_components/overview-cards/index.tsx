// components/overview-cards/index.tsx
import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import { CryptoIcon, ProfitIcon, DepositIcon, UsersIcon } from "./icons";

export async function OverviewCardsGroup() {
  const { views, profit, products, users, totalMoneyInSystem } =
    await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Crypto Payments"
        data={{
          value: compactFormat(views.value),
          growthRate: views.growthRate,
        }}
        Icon={CryptoIcon}
      />
      <OverviewCard
        label="Total Commission"
        data={{
          value: compactFormat(profit.value),
          growthRate: profit.growthRate,
        }}
        Icon={ProfitIcon}
      />
      <OverviewCard
        label="Total Deposits"
        data={{
          value: compactFormat(products.value),
          growthRate: products.growthRate,
        }}
        Icon={DepositIcon}
      />
      <OverviewCard
        label="Total Users"
        data={{
          value: compactFormat(users.value),
          growthRate: users.growthRate,
        }}
        Icon={UsersIcon}
      />
      <OverviewCard
        label="Total Money in System"
        data={{
          value: compactFormat(totalMoneyInSystem),
          growthRate: 0, // No growth rate for total money
        }}
        Icon={DepositIcon} // Use an appropriate icon
      />
    </div>
  );
}
