import { FC } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { useAuth } from "@/contexts/AuthContext";
Amplify.configure(outputs);
const AddJobForm: FC<{ handleCancel: () => void }> = ({ handleCancel }) => {
  const client = generateClient<Schema>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jobTitle = formData.get("jobTitle") as string;
    const jobUrl = formData.get("jobUrl") as string;
    const companyName = formData.get("companyName") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const note = formData.get("note") as string;
    const { userId } = useAuth();
    try {
      client.models.Job.create({
        userId,
        title: jobTitle,
        joburl: jobUrl,
        company: companyName,
        description,
        date,
        notes: note,
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleCancel();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="formItems grid sm:grid-cols-2 gap-x-4 gap-y-2">
        <div className="formItem flex flex-col">
          <label className="text-medium font-semibold mb-1" htmlFor="jobTitle">
            Job title
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="text"
            name="jobTitle"
            id="jobTitle"
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label className="text-medium font-semibold mb-1" htmlFor="jobUrl">
            Job url
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="text"
            id="jobUrl"
            name="jobUrl"
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label
            className="text-medium font-semibold mb-1"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="text"
            id="companyName"
            name="companyName"
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label
            className="text-medium font-semibold mb-1"
            htmlFor="jobDescription"
          >
            Job description
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="text"
            id="jobDescription"
            name="description"
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label
            className="text-medium font-semibold mb-1"
            htmlFor="publishDate"
          >
            Publish Datw
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="date"
            id="publishDate"
            name="date"
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label className="text-medium font-semibold mb-1" htmlFor="note">
            Enter a note
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="text"
            id="note"
            name="note"
            required
          />
        </div>
      </div>
      <footer className="form__footer">
        <div className="form__buttons flex items-center justify-end mt-4">
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 transition-all duration-200 hover:scale-105 active:scale-90 py-2 rounded-md text-whitish font-medium bg-transparent"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 transition-all duration-200 hover:scale-105 active:scale-90 py-2 rounded-md text-whitish font-medium bg-secondary"
          >
            Save
          </button>
        </div>
      </footer>
    </form>
  );
};

export default AddJobForm;
