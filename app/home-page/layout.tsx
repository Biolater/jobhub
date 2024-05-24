"use client";
import { FC, useState } from "react";
import { Navbar, Sidebar } from "@/components/index";
import { AnimatePresence } from "framer-motion";
const HomePageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleSidebarOutsideClick = () => {
    setSidebarOpen(false);
  };
  const handleSidebar = () => {
    setSidebarOpen((prev: boolean) => !prev);
  };

  return (
    <>
      <Navbar onMenuOpen={handleSidebar} />
          <AnimatePresence>
            {sidebarOpen && (
              <Sidebar onOutsideClick={handleSidebarOutsideClick} />
            )}
          </AnimatePresence>
      <main>
        <div
          className={`main__overlay transition-all duration-300 ${
            sidebarOpen ? "bg-black/30 z-10" : "-z-10"
          } fixed top-0 w-full h-screen`}
        />
        {children}
      </main>
    </>
  );
};

export default HomePageLayout;
