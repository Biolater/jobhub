import { FC } from "react";
import { motion } from "framer-motion";
type Props = {
  icon: JSX.Element;
  text: string;
  onClick?: (text: string) => void;
};

const profileActionButtonVariants = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  whileTap: {
    scale: 0.99,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const ProfileActionButton: FC<Props> = ({ icon, text, onClick }) => {
  return (
    <motion.button
      onClick={() => onClick && onClick(text)}
      variants={profileActionButtonVariants}
      whileHover="whileHover"
      whileTap="whileTap"
      className="profileActionButton w-full item-start px-4 py-3 bg-primary rounded-xl text-whitish items-center flex font-medium gap-2"
    >
      <div className="size-5">{icon}</div>
      <p>{text}</p>
    </motion.button>
  );
};

export default ProfileActionButton;
