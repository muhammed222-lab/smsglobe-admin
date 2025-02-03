import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export type OverviewData = {
  totalUsers: number;
  totalReferralUsers: number;
  totalMoney: number;
  totalDeposits: number;
};

export async function fetchOverviewData(): Promise<OverviewData> {
  const usersCollection = collection(db, "users");
  const referralsCollection = collection(db, "refers");
  const userDepositsCollection = collection(db, "userDeposits");
  const depositHistoryCollection = collection(db, "deposit_history");

  const usersSnapshot = await getDocs(usersCollection);
  const referralsSnapshot = await getDocs(referralsCollection);
  const userDepositsSnapshot = await getDocs(userDepositsCollection);
  const depositHistorySnapshot = await getDocs(depositHistoryCollection);

  const totalUsers = usersSnapshot.size;
  const totalReferralUsers = referralsSnapshot.size;
  const totalMoney = userDepositsSnapshot.docs.reduce(
    (sum, doc) => sum + doc.data().amount,
    0,
  );
  const totalDeposits = depositHistorySnapshot.docs.reduce(
    (sum, doc) => sum + doc.data().amount,
    0,
  );

  return {
    totalUsers,
    totalReferralUsers,
    totalMoney,
    totalDeposits,
  };
}
