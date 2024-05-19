type Nullable<T> = T | null;

export type JobTypes = {
  company: string;
  status: "Saved" | "Applied" | "Interviewing" | "Hired" | "Rejected";
  createdAt: string;
  date: string;
  description: string;
  id: string;
  joburl: string;
  notes?: Nullable<string>;
  title: string;
  updatedAt: string;
  user: () => void;
  userId?: Nullable<string>;
};
