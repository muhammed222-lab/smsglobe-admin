"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Transactions = () => {
  interface Transaction {
    type: string;
    amount?: number;
    date?: any;
    created_at?: any;
    user_email?: string;
    payer_email?: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const collections = [
          "crypto_payment_history",
          "deposit_history",
          "orders",
          "userDeposits",
        ];

        const promises = collections.map((col) => getDocs(collection(db, col)));
        const snapshots = await Promise.all(promises);

        const cryptoPayments = snapshots[0].docs.map((doc) => ({
          ...doc.data(),
          type: "Crypto Payment",
        }));
        const deposits = snapshots[1].docs.map((doc) => ({
          ...doc.data(),
          type: "Deposit",
        }));
        const orders = snapshots[2].docs.map((doc) => ({
          ...doc.data(),
          type: "Order",
        }));
        const userDeposits = snapshots[3].docs.map((doc) => ({
          ...doc.data(),
          type: "User Deposit",
        }));

        const allTransactions = [
          ...cryptoPayments,
          ...deposits,
          ...orders,
          ...userDeposits,
        ];

        setTransactions(allTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-full rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="mb-4 text-xl font-bold">Transactions</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              User Email
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {transaction.type}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {transaction.amount}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {formatDate(transaction.date || transaction.created_at)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {transaction.user_email || transaction.payer_email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
