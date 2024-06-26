"use client";
/**
 * The Jobs component renders the main page of the application.
 * It fetches the user's jobs from the Amplify Data Store and displays them.
 * It also allows users to select a job, view its details, and delete it.
 *
 * @returns The main page of the application.
 */
import { useState, useEffect, useCallback } from "react";
import { NoJobIcon } from "@/components/Icons";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { useAuth } from "@/contexts/AuthContext";
import { JobTypes } from "@/types/job.types";
import { AnimatePresence } from "framer-motion";
import {
  JobItem,
  JobItemModalPortal,
  DeleteJobModalPortal,
} from "@/components/index";
import { useJobDetail } from "@/contexts/ActiveJobDetailsContext";
import { useSelector } from "react-redux";
import { selectSearchbarValue } from "../store/searchbarSlice";
import toast from "react-hot-toast";
export default function Home() {
  // State variables
  const [loading, setLoading] = useState<boolean>(true);
  const [userJobs, setUserJobs] = useState<JobTypes[]>([]);
  const [filteredUserJobs, setFilteredUserJobs] = useState<JobTypes[] | null>(
    []
  );
  const [clickedJobIndex, setClickedJobIndex] = useState<number | null>(null);
  const {
    setPreviousJobDetails,
    setNewJobDetails,
    newJobDetails,
    deleteJobModalActive,
    setDeleteJobId,
    deleteJobId,
  } = useJobDetail();

  const client = generateClient<Schema>();
  const { userId, setUserJobStatuses } = useAuth();
  const searchbarValue = useSelector(selectSearchbarValue);
  useEffect(() => {
    const searchbarValueLowerCase = searchbarValue.toLowerCase();
    if (searchbarValue) {
      const filteredJobs = userJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchbarValueLowerCase) ||
          job.company.toLowerCase().includes(searchbarValueLowerCase) ||
          job.description.toLowerCase().includes(searchbarValueLowerCase)
      );
      setFilteredUserJobs(filteredJobs);
    } else {
      setFilteredUserJobs(null);
    }
  }, [searchbarValue]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the Amplify Data Store
        const { data: userData, errors } = await client.models.User.get(
          {
            id: userId,
          },
          {
            authMode: "userPool",
          }
        );
        // Error handling
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          // Get the user's jobs from the Data Store
          const userJobs = (await userData?.jobs())?.data;
          const jobStatuses = userJobs?.map((job) => job.status);
          if (jobStatuses && jobStatuses.length > 0) {
            setUserJobStatuses(jobStatuses);
          }
          const sanitizedJobs = userJobs?.map((job) => ({
            ...job,
            notes: job.notes || "",
            status: (job.status || "Saved") as
              | "Saved"
              | "Applied"
              | "Interviewing"
              | "Hired"
              | "Rejected",
          }));
          // Update the state with the user's jobs
          setUserJobs(sanitizedJobs || []);
        }
      } catch (err) {
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserData();
  }, [userId]);
  useEffect(() => {
    const subscription = client.models.Job.observeQuery({
      authMode: "userPool",
    }).subscribe({
      next: ({ items }) => {
        if (userId) {
          const latestUserJobs = items.filter((job) => job.userId === userId);
          const jobStatuses = latestUserJobs?.map((job) => job.status);
          setUserJobStatuses(jobStatuses);
          const sanitizedJobs = latestUserJobs.map((job) => ({
            ...job,
            notes: job.notes || "",
            status: (job.status || "Saved") as
              | "Saved"
              | "Applied"
              | "Interviewing"
              | "Hired"
              | "Rejected",
          }));
          setUserJobs(sanitizedJobs);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, [userId]);

  return (
    <>
      <div className="relative text-center p-4 max-w-[1200px] mx-auto">
        {loading && (
          <h1 className="font-semibold text-whitish text-2xl">Loading...</h1>
        )}
        {!loading && userJobs.length === 0 && (
          <>
            <div className="noJobIcon max-w-[250px] mx-auto mb-2 flex justify-center">
              <NoJobIcon />
            </div>
            <h1 className="text-whitish font-semibold text-2xl">
              It seems like you haven’t added a job yet
            </h1>
            <p className="text-white/40 font-medium">
              Click on the plus icon to add a job
            </p>
          </>
        )}
        {!loading && userJobs.length > 0 && (
          <>
            <h3 className="text-2xl md:text-4xl mb-4 md:mb-6 font-semibold text-whitish">
              Here is your added jobs
            </h3>
            <div className="jobs sm:px-[25px] md:px-[50px] lg:px-[75px] place-items-center grid gap-4">
              {!filteredUserJobs &&
                userJobs.map((job, index) => (
                  <JobItem
                    index={index}
                    jobId={job.id}
                    jobTitle={job.title}
                    companyName={job.company}
                    jobUrl={job.joburl}
                    onSelect={() => {
                      setClickedJobIndex(index);
                      const prevJobDetails = {
                        title: userJobs[index].title,
                        jobUrl: userJobs[index].joburl,
                        company: userJobs[index].company,
                        status: userJobs[index].status,
                        description: userJobs[index].description,
                        date: userJobs[index].date,
                        notes: userJobs[index]?.notes || "",
                      };
                      setPreviousJobDetails(prevJobDetails);
                      setNewJobDetails(prevJobDetails);
                    }}
                    onDeleteButtonSelect={() => {
                      setDeleteJobId(userJobs[index]?.id);
                    }}
                    key={index}
                  />
                ))}
              {filteredUserJobs &&
                filteredUserJobs.map((job, index) => (
                  <JobItem
                    index={index}
                    jobId={job.id}
                    jobTitle={job.title}
                    companyName={job.company}
                    jobUrl={job.joburl}
                    onSelect={() => {
                      setClickedJobIndex(index);
                      const prevJobDetails = {
                        title: userJobs[index].title,
                        jobUrl: userJobs[index].joburl,
                        company: userJobs[index].company,
                        status: userJobs[index].status,
                        description: userJobs[index].description,
                        date: userJobs[index].date,
                        notes: userJobs[index]?.notes || "",
                      };
                      setPreviousJobDetails(prevJobDetails);
                      setNewJobDetails(prevJobDetails);
                    }}
                    onDeleteButtonSelect={() => {
                      setDeleteJobId(userJobs[index]?.id);
                    }}
                    key={index}
                  />
                ))}
            </div>
          </>
        )}
      </div>
      <JobItemModalPortal
        jobId={userJobs[clickedJobIndex || 0]?.id}
        isActive={clickedJobIndex !== null}
        handleCancel={() => setClickedJobIndex(null)}
        companyName={newJobDetails?.company}
        date={newJobDetails?.date}
        status={newJobDetails?.status}
        jobDescription={newJobDetails?.description}
        jobTitle={newJobDetails?.title}
        jobUrl={newJobDetails?.jobUrl}
        notes={newJobDetails.notes || ""}
      />
      <AnimatePresence>
        {deleteJobModalActive && <DeleteJobModalPortal jobId={deleteJobId} />}
      </AnimatePresence>
    </>
  );
}
