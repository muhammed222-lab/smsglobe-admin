"use client";

import "@/css/satoshi.css";
import "@/css/style.css";
import { AuthProvider, useAuth } from "@/context/authContext";
import { Providers } from "./providers";
import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function ProtectedLayout({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/signin" || pathname === "/auth/sign-up";

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push("/signin");
    }
  }, [loading, user, isAuthPage, router]);

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!user && isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Providers>
            <NextTopLoader showSpinner={false} />
            <ProtectedLayout>{children}</ProtectedLayout>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
