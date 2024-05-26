import { motion } from "framer-motion";
import { SearchIcon } from "../Icons";

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
    whileFocus: {
      border: "1px solid white",
    },
    top: "30px",
    width: 300,
  },
  exit: {
    opacity: 0,
    y: -30,
    border: "1px solid transparent",
  },
};

const SidebarSearchBar = () => {
  return (
    <motion.div
      data-testid="sidebarSearchbar"
      variants={SEARCHBAR_VARIANTS}
      initial="inital"
      animate="animate"
      exit="exit"
      className="searchBar gap-2 h-[50px] shadow-lg text-whitish pe-4 fixed z-[9999] items-center flex  bg-zephyr rounded-xl size-10"
    >
      <input
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
