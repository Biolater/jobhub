export type JobItemModalProps = {
  jobId: string;
  isActive: boolean;
  handleCancel: () => void;
  jobTitle: string;
  companyName: string;
  status: "Saved" | "Applied" | "Interviewing" | "Hired" | "Rejected";
  jobUrl: string;
  jobDescription: string;
  date: string;
  notes: string;
};
