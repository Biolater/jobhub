import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "../contexts/AuthContext";
import JobDetailsProvider from "@/contexts/ActiveJobDetailsContext";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "./store/StoreProvider";
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
    <StoreProvider>
      <AuthContextProvider>
        <JobDetailsProvider>
          <html lang="en">
            <body className={inter.className}>
              {children}
              <Toaster position="top-center" />
            </body>
          </html>
        </JobDetailsProvider>
      </AuthContextProvider>
    </StoreProvider>
  );
}
