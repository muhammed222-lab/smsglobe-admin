// Removed duplicate getOverviewData function
// fetch.ts
import { getFirestoreData } from "@/lib/firestore";
import { processData } from "@/lib/processData";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const growthRateCrypto = 0; // Define the variable
const growthRateCommission = 0; // Define the variable
const growthRateDeposits = 0; // Define the variable
const growthRateUsers = 0; // Define the variable

export async function getOverviewData() {
  const totalMoneyInSystem = 0; // Initialize the variable
  const firestoreData = await getFirestoreData();
  const processedData = processData(firestoreData);

  return {
    views: {
      value: processedData.totalCryptoPayments,
      growthRate: growthRateCrypto,
    },
    profit: {
      value: processedData.totalCommission,
      growthRate: growthRateCommission,
    },
    products: {
      value: processedData.totalDeposits,
      growthRate: growthRateDeposits,
    },
    users: {
      value: processedData.totalUsers,
      growthRate: growthRateUsers,
    },
    totalMoneyInSystem, // Add total money in the system
  };
}

export async function getChatsData() {
  try {
    const feedbacksCollection = collection(db, "feedbacks");
    const feedbacksSnapshot = await getDocs(feedbacksCollection);

    if (feedbacksSnapshot.empty) {
      console.log("No feedbacks found in Firestore.");
    }

    const feedbacksData = feedbacksSnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("Document data:", data); // Debugging log
      return {
        id: doc.id,
        user_name: data.user_name,
        feedback: data.feedback,
        email: data.email,
        date: data.date.toDate().toISOString(), // Ensure 'date' is a Firestore Timestamp
      };
    });

    console.log("Fetched feedbacks data:", feedbacksData);
    return feedbacksData;
  } catch (error) {
    console.error("Error fetching chats data:", error);
    return [];
  }
}
