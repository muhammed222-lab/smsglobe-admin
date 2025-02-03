import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Transactions from "@/components/TransactionsBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Transactions" />

      <Transactions />
    </>
  );
};

export default CalendarPage;
