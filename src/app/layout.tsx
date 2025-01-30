import type { Metadata } from "next";
import RootLayout from "./RootLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | Smsglobe - Admin-Page",
    default: "Smsglobe - Admin-Page",
  },
  description:
    "Smsglobe - Admin-Page is a modern admin dashboard for managing your business.",
};

export default RootLayout;
