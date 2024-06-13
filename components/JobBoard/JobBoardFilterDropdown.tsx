"use client";
import { FC, useEffect, useRef } from "react";
import { ChevronBottomIcon, CloseIcon } from "../Icons";
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
  isSelected: boolean;
  selectedValue: string;
  onSelect: () => void;
  onClose: () => void;
  onFilterValueClick: (title: string, value: string) => void;
  onFilterRemove: () => void;
}> = ({
  title,
  values,
  valuesActive,
  isSelected,
  selectedValue,
  onSelect,
  onClose,
  onFilterValueClick,
  onFilterRemove,
}) => {
  const filterButtonRef = useRef<HTMLDivElement>(null);
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
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return isSelected ? (
    <button
      title={title}
      onClick={onFilterRemove}
      className="filter-option__selected flex items-center gap-2 text-primary bg-whitish/80 rounded-lg p-2 text-sm font-medium"
    >
      {selectedValue}
      <span>
        <CloseIcon className="fill-primary size-3" />
      </span>
    </button>
  ) : (
    <div ref={filterButtonRef} className="filter-option__container relative">
      <button
        onClick={onSelect}
        className="filter-option active:scale-90 transition-all duration-200 hover:bg-whitish/80 focus:ring-2 ring-offset-2 ring-offset-primary flex items-center gap-2 p-2 rounded-lg bg-whitish text-primary text-sm font-medium"
      >
        {title}
        <span className="filter-option__icon size-4">
          <ChevronBottomIcon className="w-full h-full" />
        </span>
      </button>
      <AnimatePresence>
        {valuesActive && (
          <motion.div
            variants={OPTION_VALUES_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="filter-option__values z-10 absolute w-full max-w-[200px] text-start rounded-lg top-11 bg-whitish text-primary text-sm font-medium left-0"
          >
            {values?.map((value, index) => (
              <div
                onClick={() => onFilterValueClick(title, value)}
                key={index}
                className={`filter-option__value active:ring-2  cursor-pointer hover:bg-white/60 ${index ===
                  0 && "rounded-t-lg"} ${index === values.length - 1 &&
                  "rounded-b-lg"}   p-2`}
              >
                {value}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobBoardFilterDropdown;
