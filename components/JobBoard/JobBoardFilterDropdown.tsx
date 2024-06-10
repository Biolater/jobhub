"use client";
import { FC, useEffect, useRef } from "react";
import { ChevronBottomIcon } from "../Icons";
import { motion, AnimatePresence } from "framer-motion";

const OPTION_VALUES_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const JobBoardFilterDropdown: FC<{
  title: string;
  values: string[];
  valuesActive: boolean;
  onSelect: () => void;
  onClose: () => void;
}> = ({ title, values, valuesActive, onSelect, onClose }) => {
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  return (
    <button
      ref={filterButtonRef}
      onClick={onSelect}
      className="filter-option relative hover:bg-whitish/80 focus:ring-2 ring-offset-2 ring-offset-primary flex items-center gap-2 p-2 rounded-lg bg-whitish text-primary text-sm font-medium"
    >
      {title}
      <span className="filter-option__icon size-4">
        <ChevronBottomIcon className="w-full h-full" />
      </span>
      <AnimatePresence>
        {valuesActive && (
          <motion.div
            variants={OPTION_VALUES_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="filter-option__values absolute shadow-2xl min-w-[200px] text-start rounded-lg top-10 bg-whitish text-primary text-sm font-medium left-0"
          >
            {values?.map((value, index) => (
              <div
                key={index}
                className={`filter-option__value hover:bg-white/60 ${index ===
                  0 && "rounded-t-lg"} ${index === values.length - 1 &&
                  "rounded-b-lg"}   p-2`}
              >
                {value}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default JobBoardFilterDropdown;
