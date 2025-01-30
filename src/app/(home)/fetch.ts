// Removed duplicate getOverviewData function
// fetch.ts
import { getFirestoreData } from "@/lib/firestore";
import { processData } from "@/lib/processData";

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
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      name: "Jacob Jones",
      profile: "/images/user/user-01.png",
      isActive: true,
      lastMessage: {
        content: "See you tomorrow at the meeting!",
        type: "text",
        timestamp: "2024-12-19T14:30:00Z",
        isRead: false,
      },
      unreadCount: 3,
    },
    {
      name: "Wilium Smith",
      profile: "/images/user/user-03.png",
      isActive: true,
      lastMessage: {
        content: "Thanks for the update",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "Johurul Haque",
      profile: "/images/user/user-04.png",
      isActive: false,
      lastMessage: {
        content: "What's up?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "M. Chowdhury",
      profile: "/images/user/user-05.png",
      isActive: false,
      lastMessage: {
        content: "Where are you now?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 2,
    },
    {
      name: "Akagami",
      profile: "/images/user/user-07.png",
      isActive: false,
      lastMessage: {
        content: "Hey, how are you?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
  ];
}
