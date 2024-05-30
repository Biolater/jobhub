"use client";
import { FC, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
Amplify.configure(outputs);

const AddJobForm: FC<{ handleCancel: () => void }> = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobUrl: "",
    companyName: "",
    status: "Saved" as
      | "Saved"
      | "Applied"
      | "Interviewing"
      | "Hired"
      | "Rejected",
    description: "",
    date: "",
    note: "",
  });

  const { userId } = useAuth();
  const client = generateClient<Schema>();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation check
    for (const [field, value] of Object.entries(formData)) {
      if (field !== "note" && !value) {
        toast.error(`Please fill all fields.`);
        return;
      }
    }

    try {
      const { data, errors } = await client.models.Job.create(
        {
          userId,
          title: formData.jobTitle,
          joburl: formData.jobUrl,
          company: formData.companyName,
          description: formData.description,
          status: formData.status,
          date: formData.date,
          notes: formData.note,
        },
        {
          authMode: "userPool",
        }
      );
      if (errors) {
        toast.error("Error creating job");
        handleCancel();
        throw new Error(errors[0].message);
      }
      if (data) {
        toast.success("Job created successfully");
        handleCancel();
      }
      // Reset form fields after successful submission
      setFormData({
        jobTitle: "",
        jobUrl: "",
        companyName: "",
        status: "Saved",
        description: "",
        date: "",
        note: "",
      });
    } catch (error) {
      console.log(error);
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
            value={formData.jobTitle}
            onChange={handleChange}
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
            value={formData.jobUrl}
            onChange={handleChange}
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
            value={formData.companyName}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label
            className="text-medium font-semibold mb-1"
            htmlFor="publishDate"
          >
            Publish Date
          </label>
          <input
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            type="date"
            id="publishDate"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formItem flex flex-col">
          <label className="text-medium font-semibold mb-1" htmlFor="status">
            Job Status
          </label>
          <select
            className="p-2 text-primary bg-whitish rounded-md outline-none"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
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
            value={formData?.note}
            onChange={handleChange}
          />
        </div>
      </div>
      <footer className="form__footer">
        <div className="form__buttons flex items-center justify-end mt-4">
          <button
            onClick={() => {
              handleCancel(),
                setFormData({
                  jobTitle: "",
                  jobUrl: "",
                  companyName: "",
                  description: "",
                  status: "Saved",
                  date: "",
                  note: "",
                });
            }}
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
