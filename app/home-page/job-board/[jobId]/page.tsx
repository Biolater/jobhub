"use client";
import { FC, useState, useEffect } from "react";
import useTextTrimmer from "@/hooks/useTextTrimmer";
import { LoadingSpinner } from "@/components/index";
import Image from "next/image";
import { LinkIconCompany, LoadingButtonIcon } from "@/components/Icons/index";
import { JobBoardItemTypes } from "@/types/jobBoardItem.types";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import toast from "react-hot-toast";
type JobResponse = {
  data: [JobBoardItemTypes?];
  parameters: {
    job_id: string;
  };
  request_id: string;
  status: string;
};
const BUTTON_VARIANTS = {
  whileHover: {
    scale: 1.1,
  },
  whileTap: {
    scale: 0.95,
  },
};
const JobDetails: FC<{ params: { jobId: string } }> = ({ params }) => {
  const { userId } = useAuth();
  const client = generateClient<Schema>();
  const [jobLoading, setJobLoading] = useState(true);
  const [saveJobLoading, setSaveJobLoading] = useState(false);
  const [removeJobLoading, setRemoveJobLoading] = useState(false);
  const [jobIsSaved, setJobIsSaved] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobBoardItemTypes>();
  const rightContentButtons = [
    "APPLY NOW",
    "SAVE JOB",
    jobDetails?.employer_website && "VISIT WEBSITE",
  ];
  const {
    trimmedText,
    showTrimmedText,
    text,
    setShowTrimmedText,
    setText,
  } = useTextTrimmer();
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
      if (data?.data?.length > 0) {
        setText(data?.data?.[0]?.job_description || "");
        setJobDetails(data?.data?.[0]);
      }
      //@ts-ignore
      else if (data?.message) {
        //@ts-ignore
        throw new Error(data?.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setJobLoading(false);
    }
  };
  const fetchUserSavedJobs = async () => {
    const { data: userData } = await client.models.User.get(
      {
        id: userId,
      },
      {
        authMode: "userPool",
      }
    );
    const userSavedJobs = (await userData?.savedJobs())?.data || [];
    if (userSavedJobs?.length > 0) {
      const isJobSaved = userSavedJobs.some(
        (savedJob) => savedJob?.jobId === params.jobId
      );
      setJobIsSaved(isJobSaved);
    } else {
      setJobIsSaved(false);
    }
  };
  const handleSaveJob = async () => {
    if (!saveJobLoading) {
      try {
        setSaveJobLoading(true);
        const { data: savedJob, errors } = await client.models.SavedJob.create(
          {
            userId,
            jobId: params.jobId,
          },
          {
            authMode: "userPool",
          }
        );
        const {
          data: newJob,
          errors: newJobErrrors,
        } = await client.models.Job.create(
          {
            title: jobDetails?.job_title || "",
            description: jobDetails?.job_description || "",
            company: jobDetails?.employer_name || "",
            date: new Date().toISOString(),
            joburl: jobDetails?.job_apply_link || "",
            userId,
          },
          {
            authMode: "userPool",
          }
        );
        if (errors || newJobErrrors) {
          setJobIsSaved(false);
          setSaveJobLoading(false);
          toast.error(errors?.[0]?.message ?? "An unknown error occurred");
          throw new Error(errors?.[0].message || newJobErrrors?.[0].message);
        } else if (savedJob && newJob) {
          toast.success("Job saved successfully");
        }
        setSaveJobLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleRemoveSavedJob = async () => {
    if (!saveJobLoading) {
      try {
        setRemoveJobLoading(true);
        const {
          data: removedSavedJob,
          errors,
        } = await client.models.SavedJob.delete(
          {
            jobId: params.jobId,
          },
          {
            authMode: "userPool",
          }
        );

        if (errors) {
          setSaveJobLoading(false);
          toast.error(errors[0].message);
          throw new Error(errors[0].message);
        } else if (removedSavedJob) {
          toast.success("Job removed successfully");
        }
        setRemoveJobLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const companyLogo =
    jobDetails?.employer_logo ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVFUS0E_FUcfm8FcqIjCEPHAUu2_rqm7Qtg&s";
  useEffect(() => {
    if (!jobDetails) fetchJobDetails();
    fetchUserSavedJobs();
  }, [userId]);
  useEffect(() => {
    const sub = client.models.SavedJob.observeQuery({
      authMode: "userPool",
    }).subscribe({
      next: ({ items }) => {
        if (items) {
          const isJobSaved = items.find(
            (item) => item.userId === userId && item.jobId === params.jobId
          );
          if (isJobSaved) {
            setJobIsSaved(true);
          } else {
            setJobIsSaved(false);
          }
        }
      },
    });
    return () => sub.unsubscribe();
  }, [userId]);
  return jobLoading ? (
    <div className="fixed top-0 h-svh w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : error ? (
    <h1 className="text-center px-4 text-whitish font-semibold text-xl">
      {error}
    </h1>
  ) : (
    <>
      <div className="job-details p-4  sm:px-[25px] md:px-[50px] lg:hidden flex flex-col justify-center items-center text-whitish">
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
        <div className="job-details__body flex flex-col justify-center items-center gap-1">
          <h3 className="job-details__title text-center text-xl font-semibold">
            {jobDetails?.job_title || "Job title"}
          </h3>
          <div className="job-sub-details flex flex-col items-center justify-center">
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
          <button className="apply-button flex items-center justify-center">
            <a
              target="_blank"
              className="p-2 bg-secondary rounded-lg"
              href={jobDetails?.job_apply_link || ""}
            >
              Apply now
            </a>
          </button>
        </div>
        <div className="job-more-details w-full mt-4">
          <p className="text-whitish font-semibold text-[20px]">
            About the job
          </p>
          {jobDetails?.job_description && (
            <p className="text-whitish whitespace-pre-line mt-2 text-sm">
              {showTrimmedText ? trimmedText : text}
            </p>
          )}
        </div>
        {showTrimmedText && (
          <motion.button
            variants={BUTTON_VARIANTS}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-4 p-2 rounded-lg fixed bottom-5 text-sm sm:text-base font-semibold  bg-primary/20 backdrop-blur-lg border border-secondary/80"
            onClick={() => setShowTrimmedText(false)}
          >
            See more
          </motion.button>
        )}
        {!showTrimmedText && (
          <motion.button
            variants={BUTTON_VARIANTS}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-4 p-2 rounded-lg fixed bottom-5 text-sm sm:text-base font-semibold bg-primary/20 backdrop-blur-lg border border-secondary/80"
            onClick={() => setShowTrimmedText(true)}
          >
            See less
          </motion.button>
        )}
      </div>
      <div className="job-details-desktop place-content-start h-[calc(100vh-64px)] overflow-y-auto relative  px-[50px] max-w-[1200px] mx-auto hidden py-4  lg:grid grid-cols-12 text-whitish">
        <div className="job-details__left col-span-8 rounded-lg bg-whitish text-primary p-4">
          <div className="job-details__top">
            <h2 className="job-details__title font-semibold text-2xl">
              {jobDetails?.job_title || "Job title"}
            </h2>
            {companyLocation && (
              <p className="job-details__location">{companyLocation}</p>
            )}
            {companySalary && (
              <p className="job-details__salary">{companySalary}</p>
            )}
            {jobDetails?.job_employment_type && (
              <p className="job-details__employment-type text-sm">
                {jobDetails?.job_employment_type}
              </p>
            )}
          </div>
          <div className="job-details__body mt-4">
            <p className="job-details__about text-xl font-medium">About job</p>
            {jobDetails?.job_description && (
              <p className="text-sm mt-2 whitespace-pre-line">{text}</p>
            )}
          </div>
        </div>
        <div className="job-details__right sticky top-12 justify-center p-3 gap-3 bg-zephyr rounded-lg h-fit flex flex-col col-start-10 col-end-13">
          {rightContentButtons.map((text, idx) =>
            text === "APPLY NOW" ? (
              <a
                href={jobDetails?.job_apply_link || ""}
                className="text-whitish text-center bg-secondary transition-all duration-200 hover:bg-secondary/80 font-semibold p-3 rounded-lg"
                key={idx}
              >
                {text}
              </a>
            ) : text === "SAVE JOB" ? (
              jobIsSaved ? (
                <button
                  onClick={handleRemoveSavedJob}
                  className={`text-whitish flex items-center justify-center gap-1 ${
                    removeJobLoading
                      ? "bg-primary/60 text-opacity-60 pointer-events-none"
                      : "bg-primary pointer-events-auto hover:bg-primary/60"
                  } transition-all duration-200  font-semibold p-3 rounded-lg`}
                  key={idx}
                >
                  {removeJobLoading ? "REMOVING JOB" : "REMOVE SAVED JOB"}
                  {removeJobLoading && <LoadingButtonIcon />}
                </button>
              ) : (
                <button
                  onClick={handleSaveJob}
                  className={`text-whitish flex items-center justify-center gap-1 ${
                    saveJobLoading
                      ? "bg-primary/60 text-opacity-60 pointer-events-none"
                      : "bg-primary pointer-events-auto hover:bg-primary/60"
                  } transition-all duration-200  font-semibold p-3 rounded-lg`}
                  key={idx}
                >
                  {saveJobLoading ? "SAVING JOB" : text}
                  {saveJobLoading && <LoadingButtonIcon />}
                </button>
              )
            ) : (
              text && (
                <a
                  href={jobDetails?.employer_website || ""}
                  className="text-whitish text-center bg-primary transition-all duration-200 hover:bg-primary/60 font-semibold p-3 rounded-lg"
                  key={idx}
                >
                  {text}
                </a>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default JobDetails;
