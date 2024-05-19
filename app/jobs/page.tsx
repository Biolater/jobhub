"use client";
import { useState, useEffect } from "react";
import { NoJobIcon } from "@/components/Icons";
import { Navbar } from "@/components/index";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useAuth } from "@/contexts/AuthContext";
import { JobTypes } from "@/types/job.types";
import { AnimatePresence } from "framer-motion";
import {
  JobItem,
  JobItemModalPortal,
  DeleteJobModalPortal,
} from "@/components/index";
import { useJobDetail } from "@/contexts/ActiveJobDetailsContext";

const Jobs = () => {
  // State variables
  const [loading, setLoading] = useState<boolean>(true);
  const [userJobs, setUserJobs] = useState<JobTypes[]>([]);
  const [clickedJobIndex, setClickedJobIndex] = useState<number | null>(null);
  const {
    setPreviousJobDetails,
    setNewJobDetails,
    newJobDetails,
    deleteJobModalActive,
  } = useJobDetail();
  // Amplify client setup
  const client = generateClient<Schema>();
  const { userId } = useAuth();
  // Fetch user data effect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData, errors } = await client.models.User.get({
          id: userId,
        });

        // Error handling
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          const userJobs = (await userData?.jobs())?.data;
          if (userJobs) {
            const sanitizedJobs = userJobs.map((job) => ({
              ...job,
              notes: job.notes || "",
            }));
            setUserJobs(sanitizedJobs);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  useEffect(() => {
    const sub = client.models.Job.observeQuery().subscribe({
      next: ({ items }) => {
        if (userId) {
          const latestUserJobs = items.filter((job) => job.userId === userId);
          setUserJobs(latestUserJobs);
        }
      },
    });
    return () => sub.unsubscribe();
  }, [userId]);

  return (
    <>
      <Navbar />
      <main>
        <div className="container text-center p-4 mx-auto">
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
                {userJobs.map((job, index) => (
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
                        description: userJobs[index].description,
                        date: userJobs[index].date,
                        notes: userJobs[index]?.notes || "",
                      };
                      setPreviousJobDetails(prevJobDetails);
                      setNewJobDetails(prevJobDetails);
                    }}
                    key={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <JobItemModalPortal
        jobId={userJobs[clickedJobIndex || 0]?.id}
        isActive={clickedJobIndex !== null}
        handleCancel={() => setClickedJobIndex(null)}
        companyName={newJobDetails?.company}
        date={newJobDetails?.date}
        jobDescription={newJobDetails?.description}
        jobTitle={newJobDetails?.title}
        jobUrl={newJobDetails?.jobUrl}
        notes={newJobDetails.notes || ""}
      />
      <AnimatePresence>
        {deleteJobModalActive && (
          <DeleteJobModalPortal jobId={userJobs[clickedJobIndex || 0]?.id} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Jobs;
