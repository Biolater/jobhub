"use client";
import { useState, useEffect } from "react";
import { NoJobIcon } from "@/components/Icons";
import { Navbar } from "@/components/index";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useAuth } from "@/contexts/AuthContext";
import { JobTypes } from "@/types/job.types";
import { JobItem, JobItemModalPortal } from "@/components/index";

const Jobs = () => {
  // State variables
  const [loading, setLoading] = useState<boolean>(true);
  const [userJobs, setUserJobs] = useState<JobTypes[]>([]);
  const [clickedJobIndex, setClickedJobIndex] = useState<number | null>(null);
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
                    jobTitle={job.title}
                    companyName={job.company}
                    jobUrl={job.joburl}
                    onSelect={() => setClickedJobIndex(index)}
                    key={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <JobItemModalPortal
        isActive={clickedJobIndex !== null}
        handleCancel={() => setClickedJobIndex(null)}
        companyName={userJobs[clickedJobIndex || 0]?.company}
        date={userJobs[clickedJobIndex || 0]?.date}
        jobDescription={userJobs[clickedJobIndex || 0]?.description}
        jobTitle={userJobs[clickedJobIndex || 0]?.title}
        jobUrl={userJobs[clickedJobIndex || 0]?.joburl}
        notes={userJobs[clickedJobIndex || 0]?.notes || ""}
      />
    </>
  );
};

export default Jobs;
