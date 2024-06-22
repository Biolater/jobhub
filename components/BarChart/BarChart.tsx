import { Bar } from "react-chartjs-2";
import { useAuth } from "@/contexts/AuthContext";
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const client = generateClient<Schema>();
  const { userId, setUserJobStatuses } = useAuth();
  const [jobStatusData, setJobStatusData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData, errors } = await client.models.User.get(
          {
            id: userId,
          },
          {
            authMode: "userPool",
          }
        );
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          const userJobs = (await userData?.jobs())?.data;
          const jobStatuses = userJobs?.map((job) => job.status);
          if (jobStatuses && jobStatuses.length > 0) {
            const savedJobs = jobStatuses.filter(
              (jobStatus) => jobStatus === "Saved"
            ).length;
            const appliedJobs = jobStatuses.filter(
              (jobStatus) => jobStatus === "Applied"
            ).length;
            const interviewedJobs = jobStatuses.filter(
              (jobStatus) => jobStatus === "Interviewing"
            ).length;
            const hiredJobs = jobStatuses.filter(
              (jobStatus) => jobStatus === "Hired"
            ).length;
            const rejectedJobs = jobStatuses.filter(
              (jobStatus) => jobStatus === "Rejected"
            ).length;
            setUserJobStatuses(jobStatuses);
            setJobStatusData([
              savedJobs,
              appliedJobs,
              interviewedJobs,
              hiredJobs,
              rejectedJobs,
            ]);
          }
        }
      } catch (err) {
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserData();
  }, [userId]);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Your Job Application Status",
      },
    },
  };

  const data = {
    labels: ["Saved", "Applied", "Interviewing", "Hired", "Rejected"],
    datasets: [
      {
        label: "Job Applications", // Label for the dataset
        data: jobStatusData, // Example data for each job status
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Light orange for Saved
          "rgba(54, 162, 235, 0.2)", // Light blue for Applied
          "rgba(255, 206, 86, 0.2)", // Light yellow for Interviewing
          "rgba(75, 192, 192, 0.2)", // Light green for Hired
          "rgba(255, 159, 64, 0.2)", // Light red for Rejected
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Orange for Saved
          "rgba(54, 162, 235, 1)", // Blue for Applied
          "rgba(255, 206, 86, 1)", // Yellow for Interviewing
          "rgba(75, 192, 192, 1)", // Green for Hired
          "rgba(255, 159, 64, 1)", // Red for Rejected
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Bar className="max-w-full w-full" options={options} data={data} />;
};

export default BarChart;
