"use client";

import React, { useEffect, useState } from "react";
import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReferralData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";
import { Timestamp } from "firebase/firestore";

type ReferralData = {
  id: string;
  refer_by_name: string;
  refer_by_email: string;
  user_name: string;
  user_email: string;
  commission: number;
  refer_date: Timestamp | null;
};

const InvoiceTable: React.FC = () => {
  const [data, setData] = useState<ReferralData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const referralData = await getReferralData();
      setData(referralData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Referrer</TableHead>
            <TableHead>Referred User</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Referral Date</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">
                  {item.refer_by_name}
                </h5>
                <p className="mt-[3px] text-body-sm font-medium">
                  {item.refer_by_email}
                </p>
              </TableCell>

              <TableCell>
                <h5 className="text-dark dark:text-white">{item.user_name}</h5>
                <p className="mt-[3px] text-body-sm font-medium">
                  {item.user_email}
                </p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">₦{item.commission}</p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {item.refer_date
                    ? item.refer_date.toDate().toString()
                    : "N/A"}
                </p>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">View Referral</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Delete Referral</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Download Referral</span>
                    <DownloadIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
