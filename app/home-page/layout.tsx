"use client";
import { FC, useState, useEffect } from "react";
import {
  Navbar,
  Sidebar,
  SidebarWideScreen,
  SidebarSearchBar,
} from "@/components/index";
import { AnimatePresence } from "framer-motion";
const HomePageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWideScreen, setSidebarWideScreen] = useState(false);
  const [searchbarActive, setSearchbarActive] = useState(false);
  const handleSidebarOutsideClick = () => {
    setSidebarOpen(false);
  };
  const handleSidebar = () => {
    setSidebarOpen((prev: boolean) => !prev);
  };

  const onSidebarWideScreen = () => {
    setSidebarOpen(false);
    setSidebarWideScreen(true);
  };

  const onSidebarWideScreenSearch = () => {
    setSidebarOpen(false);
    setSidebarWideScreen(false);
    setTimeout(() => {
      setSearchbarActive(true);
    }, 150);
  };

  const onSidebarSearchBar = () => {
    setSearchbarActive(true);
    setSidebarOpen(false);
  };

  const searchBarOutsideWideScreen = () => {
    setSearchbarActive(false);
    setTimeout(() => {
      setSidebarWideScreen(true);
    }, 150);
  };

  const searchbarOutsideClick = () => {
    setSearchbarActive(false);
  };

  useEffect(() => {
    setSidebarWideScreen(window.innerWidth > 640);
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setSidebarWideScreen(true);
      } else {
        setSidebarWideScreen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {searchbarActive && (
          <SidebarSearchBar
            onOutsideClick={searchbarOutsideClick}
            onOutsideClickWide={searchBarOutsideWideScreen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            onSearchBar={onSidebarSearchBar}
            onHide={onSidebarWideScreen}
            onOutsideClick={handleSidebarOutsideClick}
          />
        )}
      </AnimatePresence>
      <div className="flex">
        <AnimatePresence>
          {sidebarWideScreen && (
            <SidebarWideScreen
              onSearchButtonClick={onSidebarWideScreenSearch}
            />
          )}
        </AnimatePresence>
        <div className="flex flex-grow flex-col">
          <Navbar onMenuOpen={handleSidebar} />
          <main>
            <div
              className={`main__overlay sm:hidden transition-all duration-300 ${
                sidebarOpen ? "bg-black/30 z-10" : "-z-10"
              } fixed top-0 w-full h-screen`}
            />
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
