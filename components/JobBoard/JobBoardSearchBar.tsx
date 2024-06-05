import { SearchIcon } from "../Icons";

const JobBoardSearchBar = () => {
  return (
    <div className="jobBoardSearchBar mb-4 bg-whitish px-3 rounded-lg flex items-center justify-between">
      <div className="left flex items-center gap-2">
        <div className="searchIcon size-6">
          <SearchIcon className="fill-primary" />
        </div>
        <input type="text" className="bg-whitish outline-none py-3" placeholder="Search for jobs" />
      </div>
      <button className="searchButton">Search</button>
    </div>
  );
};

export default JobBoardSearchBar;
