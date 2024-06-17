"use client";
import {
  JobBoardItem,
  JobBoardItemSkeleton,
  JobBoardSearchBar,
  JobBoardFilterDropdown,
} from "@/components/index";
import { useState, useEffect } from "react";
import { JobBoardItemTypes } from "@/types/jobBoardItem.types";
import toast from "react-hot-toast";
type SelectedFilterOption = {
  filterName: string;
  filterValue: string;
};
const JobBoard = () => {
  const [jobResults, setJobResults] = useState<JobBoardItemTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchbarValue, setSearchbarValue] = useState("");
  const [searchbarValueCopy, setSearchbarValueCopy] = useState("");
  const [activeJobFilterTitle, setActiveJobFilterTitle] = useState("");
  const [datePosted, setDatePosted] = useState("all");
  const [numPage, setNumPage] = useState(1);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [initialJobSearch, setInitialJobSearch] = useState(false);
  const [noJobsFound, setNoJobsFound] = useState(false);
  const [onlyRemote, setOnlyRemote] = useState("false");
  const [activelyHiring, setActivelyHiring] = useState("false");
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    SelectedFilterOption[]
  >([]);
  const baseUrl = "https://jsearch.p.rapidapi.com/search?query=";

  const filterOptions = [
    {
      title: "Date posted",
      values: ["Today", "Last 3 days", "Last 7 days", "Last 30 days"],
      realValues: ["today", "3days", "week", "month"],
    },
    {
      title: "Remote",
      values: ["Yes", "No"],
      realValues: ["true", "false"],
    },
    {
      title: "Actively hiring",
      values: ["Yes", "No"],
      realValues: ["true", "false"],
    },
  ];

  const showFilters =
    searchbarValueCopy &&
    initialJobSearch &&
    !loading
  const handleFilterOptionClick = (
    title: string,
    value: string,
    idx: number
  ) => {
    setFiltersChanged(true);
    const clickedOption = filterOptions[idx];
    const clickedValueIndex = clickedOption.values.indexOf(value);
    const realValue = clickedOption.realValues[clickedValueIndex];
    if (idx === 0) {
      setDatePosted(realValue);
    } else if (idx === 1) {
      setOnlyRemote(realValue);
    } else {
      setActivelyHiring(realValue);
    }
    setSelectedFilterOptions((prev) => {
      const prevArray = [...prev];
      prevArray[idx] = {
        filterName: title,
        filterValue: value,
      };
      return prevArray;
    });
  };

  const handleFilterRemove = (idx: number) => {
    const filterTitle = selectedFilterOptions[idx].filterName;
    switch (filterTitle) {
      case "Date posted":
        setDatePosted("all");
        break;
      case "Remote":
        setOnlyRemote("false");
        break;
      case "Actively hiring":
        setActivelyHiring("false");
        break;
    }
    setSelectedFilterOptions((prev) => prev.filter((_, i) => i !== idx));
    setActiveJobFilterTitle("");
  };

  const handleFilterButtonClick = (title: string) => {
    setActiveJobFilterTitle((prev) => (prev === title ? "" : title));
  };
  const handleFilterButtonClose = () => {
    setActiveJobFilterTitle("");
  };

  const handleLoadMore = () => {
    setNumPage((prevNumPage) => prevNumPage + 1);
  };
  const fetchJobs = async (searchText: string) => {
    const encodedSearchText = encodeURIComponent(searchText);
    if (!initialJobSearch) setInitialJobSearch(true);
    const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const rapidApiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;
    const url = `${baseUrl}${encodedSearchText}&num_pages=${numPage}&date_posted=${datePosted}&remote_jobs_only=${onlyRemote}&actively_hiring=${activelyHiring}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey || "",
        "x-rapidapi-host": rapidApiHost || "",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.status === "ERROR") {
        setNoJobsFound(false);
        throw new Error(result.error.message);
      }
      if (result?.data?.length === 0) {
        setNoJobsFound(true);
      } else {
        setNoJobsFound(false);
      }
      setJobResults(result?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    if (numPage !== 1) fetchJobs(searchbarValueCopy);
  }, [numPage]);
  useEffect(() => {
    if (filtersChanged) fetchJobs(searchbarValueCopy);
  }, [datePosted, onlyRemote, activelyHiring]);
  return (
    <main className="jobBoard p-4 sm:px-10 md:px-20 lg:px-40 max-w-[1200px] mx-auto">
      <h1 className="text-center mb-4 text-2xl font-semibold text-whitish">
        Welcome to the Job Board
      </h1>
      <JobBoardSearchBar
        loading={loading}
        onSearch={() => {
          setSearchbarValueCopy(searchbarValue);
          setNumPage(1);
          setJobResults([]);
          fetchJobs(searchbarValue);
        }}
        searchBarValue={searchbarValue}
        onSearchbarChange={(value: string) => setSearchbarValue(value)}
      />
      {showFilters && (
        <div className="filter-options flex flex-wrap items-center gap-2 mb-4">
          {filterOptions.map((filterOption, idx) => (
            <JobBoardFilterDropdown
              onFilterRemove={() => handleFilterRemove(idx)}
              selectedValue={selectedFilterOptions?.[idx]?.filterValue}
              isSelected={
                selectedFilterOptions?.[idx]?.filterName === filterOption?.title
              }
              onFilterValueClick={(title, value) =>
                handleFilterOptionClick(title, value, idx)
              }
              onSelect={() => handleFilterButtonClick(filterOption.title)}
              onClose={handleFilterButtonClose}
              valuesActive={activeJobFilterTitle === filterOption.title}
              title={filterOption.title}
              key={idx}
              values={filterOption.values}
            />
          ))}
        </div>
      )}
      <div className="jobBoard__items flex flex-col gap-4">
        {loading &&
          Array.from({ length: 5 }).map((_, index: number) => (
            <JobBoardItemSkeleton key={index} />
          ))}
        {!loading &&
          jobResults?.length > 0 &&
          jobResults.map((job: JobBoardItemTypes, index: number) => (
            // @ts-ignore
            <JobBoardItem
              key={index}
              logo={
                job?.employer_logo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVFUS0E_FUcfm8FcqIjCEPHAUu2_rqm7Qtg&s"
              }
              job_id={job.job_id}
              employer_name={job.employer_name}
              job_city={job.job_city}
              job_state={job.job_state}
              job_title={job.job_title}
            />
          ))}
        {jobResults?.length === 0 && !loading && !noJobsFound && (
          <div className="text-center text-2xl my-2 text-whitish">
            Search for jobs
          </div>
        )}
        {noJobsFound && (
          <h2 className="text-center text-2xl my-2 text-whitish">
            No Jobs Found
          </h2>
        )}
      </div>
      {!loading && jobResults?.length >= 10 && (
        <div className="loadMoreButton flex items-center justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-secondary transition-all duration-200 hover:scale-105 active:scale-90 p-2 rounded-lg font-medium text-whitish"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
};

export default JobBoard;
