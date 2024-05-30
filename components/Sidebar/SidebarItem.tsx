import { FC } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@nextui-org/tooltip";
const SidebarItem: FC<{
  isActive?: boolean;
  text: string;
  icon: JSX.Element;
  testId?: string;
  onClick?: () => void;
}> = ({ isActive, text, icon, onClick, testId }) => {
  return (
    <Tooltip
      className="bg-[#3C4043] hidden sm:block text-sm px-2 py-1 rounded-sm text-whitish"
      placement="right"
      content={text}
      delay={0}
      closeDelay={0}
    >
      <button
        data-testid={testId || "sidebarItem"}
        onClick={onClick}
        className={`sidebarItem sm:py-[13.5px] sm:justify-center active:scale-90 w-full hover:bg-disabledColor/20 p-2 rounded-lg ${
          isActive && "bg-disabledColor/20"
        } transition-all duration-300 ease-out text-whitish flex items-center gap-2`}
      >
        <div className="sidebarItem__icon size-[29px]">{icon}</div>
        <motion.p className={`sidebarItem__text sm:hidden`}>{text}</motion.p>
      </button>
    </Tooltip>
  );
};

export default SidebarItem;
