"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui-elements/button";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const CalendarBox = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleVerification = async (userId: string, currentStatus: boolean) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { verified: !currentStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, verified: !currentStatus } : user,
        ),
      );
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  return (
    <div className="w-full max-w-full rounded-[10px] bg-white p-6 shadow-lg dark:bg-gray-dark dark:shadow-card">
      <Breadcrumb pageName="All Users" />
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        User Management
      </h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col items-center rounded-xl border bg-gray-50 p-5 text-center transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                {user.first_name?.charAt(0)}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {user.first_name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
              <p className="text-sm">
                <strong>Currency:</strong> {user.currency}
              </p>
              <p className="text-sm">
                <strong>Referral:</strong> {user.referral_code}
              </p>
              <p className="mt-2 text-sm">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    user.verified ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.verified ? "Verified" : "Not Verified"}
                </span>
              </p>
              <Button
                label={user.verified ? "Unverify" : "Verify"}
                variant={user.verified ? "outlineDark" : "green"}
                size="small"
                shape="rounded"
                className="mt-4"
                onClick={() => toggleVerification(user.id, user.verified)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarBox;
