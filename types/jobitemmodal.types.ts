export type JobItemModalProps = {
  jobId: string;
  isActive: boolean;
  handleCancel: () => void;
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  jobDescription: string;
  date: string;
  notes: string;
};
