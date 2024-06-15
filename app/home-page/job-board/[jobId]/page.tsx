"use client";
import { FC, useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/index";
import Image from "next/image";
import { LinkIconCompany } from "@/components/Icons/index";
import { JobBoardItemTypes } from "@/types/jobBoardItem.types";
type JobResponse = {
  data: [JobBoardItemTypes?];
  parameters: {
    job_id: string;
  };
  request_id: string;
  status: string;
};
const JobDetails: FC<{ params: { jobId: string } }> = ({ params }) => {
  const [jobLoading, setJobLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<JobBoardItemTypes>();
  const companyLocation =
    jobDetails?.job_country && jobDetails?.job_state && jobDetails?.job_city
      ? `${jobDetails?.job_country}, ${jobDetails?.job_state}, ${jobDetails?.job_city}`
      : jobDetails?.job_country &&
        jobDetails?.job_state &&
        !jobDetails?.job_city
      ? `${jobDetails?.job_country}, ${jobDetails?.job_state}`
      : jobDetails?.job_country &&
        !jobDetails?.job_state &&
        !jobDetails?.job_city
      ? `${jobDetails?.job_country}`
      : null;
  const companySalary =
    jobDetails?.job_min_salary && jobDetails?.job_max_salary
      ? `${jobDetails?.job_min_salary} - ${jobDetails?.job_max_salary}`
      : null;
  const [error, setError] = useState("");
  const fetchJobDetails = async () => {
    const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${params.jobId}&`;
    const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const rapidApiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey || "",
        "x-rapidapi-host": rapidApiHost || "",
      },
    };
    try {
      const response = await fetch(url, options);
      const data: JobResponse = await response.json();
      if (data.data.length > 0) {
        setJobDetails(data.data[0]);
      } else {
        throw new Error("Job not found");
      }
      console.log(data);
    } catch (err) {
      setError("Job not found");
    } finally {
      setJobLoading(false);
    }
  };
  const companyLogo =
    jobDetails?.employer_logo ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVFUS0E_FUcfm8FcqIjCEPHAUu2_rqm7Qtg&s";
  useEffect(() => {
    fetchJobDetails();
  }, []);

  return jobLoading ? (
    <div className="fixed top-0 h-svh w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : error ? (
    <h1 className="text-center text-whitish font-semibold text-xl">{error}</h1>
  ) : (
    <div className="job-details px-4 flex flex-col justify-center items-center text-whitish">
      <div className="job-details__logo mb-3">
        <Image
          className=""
          alt="company logo"
          width={80}
          objectFit="contain"
          height={80}
          src={companyLogo}
        />
      </div>
      <div className="job-details__body">
        <h3 className="job-details__title mb-1 text-center text-xl font-semibold">
          {jobDetails?.job_title || "Job title"}
        </h3>
        <div className="job-sub-details flex flex-col items-center gap-1 justify-center">
          <a
            target="_blank"
            href={jobDetails?.employer_website || ""}
            className="job-details__company flex items-center gap-1"
          >
            {jobDetails?.employer_name || "Company name"}{" "}
            <LinkIconCompany className="size-3 fill-whitish" />
          </a>
          {companyLocation && (
            <div className="job-details__location text-center">
              {companyLocation}
            </div>
          )}
          {companySalary && (
            <div className="job-details__salary text-center">
              {companySalary}
            </div>
          )}
          {jobDetails?.job_employment_type && (
            <p className="text-center text-sm text-whitish font-semibold">
              {jobDetails?.job_employment_type}
            </p>
          )}
        </div>
      </div>
      <div className="job-more-details w-full mt-4">
        <p className="text-whitish font-semibold text-[20px]">About the job</p>
        {jobDetails?.job_description && (
          <p className="text-whitish mt-2 text-sm">
            {jobDetails?.job_description}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
