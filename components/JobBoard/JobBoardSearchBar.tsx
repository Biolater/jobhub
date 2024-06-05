import { FC } from "react";
import { SearchIcon } from "../Icons";

const JobBoardSearchBar: FC<{
  onSearchbarChange: (value: string) => void;
  searchBarValue: string;
  onSearch: () => void;
}> = ({ onSearchbarChange, searchBarValue, onSearch }) => {
  return (
    <div className="jobBoardSearchBar mb-4 bg-whitish px-3 rounded-lg gap-2 flex items-center">
      <div className="left flex flex-grow items-center gap-2">
        <div className="searchIcon size-6">
          <SearchIcon className="fill-primary" />
        </div>
        <input
          value={searchBarValue}
          onChange={(e) => onSearchbarChange(e.target.value)}
          type="text"
          className="bg-whitish outline-none w-full py-3"
          placeholder="Search for jobs"
        />
      </div>
      <button
        onClick={onSearch}
        className="searchButton border-2 active:scale-95 border-secondary transition-all duration-300 hover:bg-transparent hover:text-primary bg-secondary font-semibold text-whitish px-4 py-1 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default JobBoardSearchBar;
