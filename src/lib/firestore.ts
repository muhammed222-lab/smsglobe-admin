// lib/firestore.ts
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function getFirestoreData() {
  const cryptoPaymentsSnapshot = await getDocs(
    collection(db, "crypto_payment_history"),
  );
  const depositsSnapshot = await getDocs(collection(db, "deposit_history"));
  const feedbacksSnapshot = await getDocs(collection(db, "feedbacks"));
  const ordersSnapshot = await getDocs(collection(db, "orders"));
  const refersSnapshot = await getDocs(collection(db, "refers"));
  const userDepositsSnapshot = await getDocs(collection(db, "userDeposits"));
  const usersSnapshot = await getDocs(collection(db, "users"));

  const cryptoPayments = cryptoPaymentsSnapshot.docs.map((doc) => doc.data());
  const deposits = depositsSnapshot.docs.map((doc) => doc.data());
  const feedbacks = feedbacksSnapshot.docs.map((doc) => doc.data());
  const orders = ordersSnapshot.docs.map((doc) => doc.data());
  const refers = refersSnapshot.docs.map((doc) => doc.data());
  const userDeposits = userDepositsSnapshot.docs.map((doc) => doc.data());
  const users = usersSnapshot.docs.map((doc) => doc.data());

  return {
    cryptoPayments,
    deposits,
    feedbacks,
    orders,
    refers,
    userDeposits,
    users,
  };
}
