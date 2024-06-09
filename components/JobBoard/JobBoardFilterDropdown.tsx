import { FC } from "react";
import { ChevronBottomIcon } from "../Icons";
const JobBoardFilterDropdown: FC<{ title: string }> = ({ title }) => {
  return (
    <button className="filter-option hover:bg-whitish/80 focus:ring-2 ring-offset-2 ring-offset-primary flex items-center gap-2 p-2 rounded-lg bg-whitish text-primary text-sm font-medium">
      {title}
      <span className="filter-option__icon size-4">
        <ChevronBottomIcon className="w-full h-full" />
      </span>
    </button>
  );
};

export default JobBoardFilterDropdown;
