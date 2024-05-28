"use client"
import { motion } from "framer-motion";
import { SearchIcon } from "../Icons";
import { FC, useEffect, useRef } from "react";
import { handleSearch } from "@/app/store/searchbarSlice";
import { useDispatch } from "react-redux";

const SEARCHBAR_VARIANTS = {
  inital: {
    opacity: 0,
    border: "1px solid transparent",
    top: "-30px",
    width: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  animate: {
    opacity: 1,
    top: "30px",
    width: 300,
  },
  exit: {
    opacity: 0,
    y: -30,
    border: "1px solid transparent",
  },
};

const SidebarSearchBar: FC<{
  onOutsideClickWide: () => void;
  onOutsideClick: () => void;
}> = ({ onOutsideClickWide, onOutsideClick }) => {
  const dispatch = useDispatch();
  const handleSearchbar = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleSearch(e.target.value));
  };
  const searchbarRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      searchbarRef.current &&
      !searchbarRef.current.contains(e.target as Node)
    ) {
      if (window.innerWidth > 640) {
        onOutsideClickWide();
      } else {
        onOutsideClick();
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      dispatch(handleSearch(""));
    };
  }, []);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (window.innerWidth > 640) {
          onOutsideClickWide();
        } else {
          onOutsideClick();
        }
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [])
  return (
    <motion.div
      ref={searchbarRef}
      data-testid="sidebarSearchbar"
      variants={SEARCHBAR_VARIANTS}
      initial="inital"
      animate="animate"
      exit="exit"
      className="searchBar gap-2 h-[50px] shadow-lg text-whitish pe-4 fixed z-[9999] items-center flex  bg-zephyr rounded-xl size-10"
    >
      <input
        onChange={handleSearchbar}
        autoFocus
        className="bg-transparent ps-4 outline-none w-full"
        type="text"
        placeholder="Search..."
      />
      <div className="searchBar__icon size-[29px]">
        <SearchIcon />
      </div>
    </motion.div>
  );
};

export default SidebarSearchBar;
