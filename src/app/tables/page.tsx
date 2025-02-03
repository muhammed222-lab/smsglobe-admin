import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InvoiceTable from "@/components/Tables/invoice-table";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Referrer Operations",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="space-y-10">
        <Suspense fallback={<div>Loading...</div>}>
          <InvoiceTable />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
