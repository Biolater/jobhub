"use client";
import { FC, useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/index";
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

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return jobLoading ? (
    <div className="fixed top-0 h-svh w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div>{params.jobId}</div>
  );
};

export default JobDetails;
