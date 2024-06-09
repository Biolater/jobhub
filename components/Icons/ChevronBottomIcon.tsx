import React, { FC } from "react";

const ChevronBottomIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 10 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.4425 0.442505L5 3.8775L1.5575 0.442505L0.5 1.5L5 6L9.5 1.5L8.4425 0.442505Z" />
    </svg>
  );
};

export default ChevronBottomIcon;
