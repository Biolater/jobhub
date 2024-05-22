import { FC } from "react";
import { motion } from "framer-motion";
type ProfileBadgeProps = {
  bgColor: string;
  textColor: string;
  content: string;
  contentValue: number;
};

const ProfileBadge: FC<ProfileBadgeProps> = ({
  bgColor,
  textColor,
  content,
  contentValue,
}) => {
  return (
    <motion.div
      layout
      className={`profileBadge p-1 rounded-sm flex items-center ${bgColor} ${textColor}`}
    >
      <span className="content">{content} :</span>
      <span className="contentValue ms-1 font-semibold">{contentValue}</span>
    </motion.div>
  );
};

export default ProfileBadge;
