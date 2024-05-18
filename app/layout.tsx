import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "../contexts/AuthContext";
import JobDetailsProvider from "@/contexts/ActiveJobDetailsContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Hub",
  description: "Store your applied jobs easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <JobDetailsProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </JobDetailsProvider>
    </AuthContextProvider>
  );
}
