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
      console.log(data);
      if (data.data.length > 0) {
        setJobDetails(data.data[0]);
      } else {
        throw new Error("Job not found");
      }
      console.log(data);
    } catch (err) {
      setError("Job not found");
      console.log(err);
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
  ) : (
    <div className="job-details flex flex-col justify-center items-center text-whitish">
      <div className="job-details__logo mb-2 size-[80px] rounded-full bg-whitish flex items-center justify-center">
        <Image
          alt="company logo"
          width={70}
          objectFit="contain"
          height={70}
          src={companyLogo}
        />
      </div>
      <div className="job-details__body">
        <h3 className="job-details__title text-2xl font-semibold">
          {jobDetails?.job_title}
        </h3>
        <div className="job-sub-details flex items-center gap-4 justify-center">
          <a
            target="_blank"
            href={jobDetails?.employer_website || ""}
            className="job-details__company flex items-center gap-1"
          >
            {jobDetails?.employer_name}{" "}
            <LinkIconCompany className="size-3 fill-whitish" />
          </a>
          <div className="job-details__location">
            {`${jobDetails?.job_country}, ${jobDetails?.job_state}, ${jobDetails?.job_city}`}
          </div>
        </div>
        <div className="job-details__salary text-center">
          {jobDetails?.job_min_salary} - {jobDetails?.job_max_salary}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
