import { ChangeEvent, FC } from "react";
import { useJobDetail } from "@/contexts/ActiveJobDetailsContext";

type JobDetailProps = {
  sectionName: string;
  content: string;
};

const JobDetail: FC<JobDetailProps> = ({ sectionName, content }) => {
  const isNotesOrDescription = () => {
    if (sectionName === "Notes") {
      return "notes";
    }
    return "description";
  };

  const correctName = (): "title" | "jobUrl" | "company" | undefined => {
    switch (sectionName) {
      case "Company Name":
        return "company";
      case "Title":
        return "title";
      case "Job URL":
        return "jobUrl";
      default:
        return undefined;
    }
  };

  const { setNewJobDetails } = useJobDetail();

  const handleInput = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    identifier:
      | "title"
      | "jobUrl"
      | "company"
      | "description"
      | "date"
      | "notes"
  ) => {
    setNewJobDetails((prevJobDetails) => {
      return {
        ...prevJobDetails,
        [identifier]: e.target.value,
      };
    });
  };

  return (
    <div className="flex text-center text-whitish flex-col gap-1">
      <p>{sectionName}</p>
      {sectionName === "Notes" || sectionName === "Job Description" ? (
        <textarea
          onChange={(e) =>
            handleInput(e, isNotesOrDescription() as "description" | "notes")
          }
          name={isNotesOrDescription()}
          value={content || ""}
          className="bg-whitish px-2 py-1 rounded-md outline-none text-primary font-medium"
        ></textarea>
      ) : sectionName === "Publish Date" ? (
        <input
          type="date"
          onChange={(e) => handleInput(e, "date")}
          name="date"
          value={content || ""}
          className="bg-whitish px-2 py-1 rounded-md outline-none text-primary font-medium"
        />
      ) : (
        <input
          type="text"
          onChange={(e) => {
            const name = correctName();
            if (name) {
              handleInput(e, name);
            }
          }}
          name={correctName() || ""}
          value={content || ""}
          className="bg-whitish px-2 py-1 rounded-md outline-none text-primary font-medium"
        />
      )}
    </div>
  );
};

export default JobDetail;
