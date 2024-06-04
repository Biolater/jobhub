import { FC } from "react";
import Link from "next/link";
const JobBoardItem: FC<{
  logo: string;
  employer_name: string;
  job_title: string;
  job_city: string;
  job_state: string;
  job_id: string;
}> = ({ logo, employer_name, job_title, job_city, job_state, job_id }) => {
  return (
    <Link
      className="transition-all group/jobBoardItem duration-200 hover:shadow-2xl origin-bottom"
      target="_blank"
      href={`/home-page/job-board/${job_id}`}
    >
      <div className="jobBoardItem cursor-pointer rounded-lg p-2 bg-whitish flex gap-2">
        <div className="jobBoardItem__image size-[56px]">
          <img
            className="max-w-none h-full"
            width={56}
            height={56}
            alt="company logo"
            src={logo}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVFUS0E_FUcfm8FcqIjCEPHAUu2_rqm7Qtg&s";
            }}
          />
        </div>
        <div className="jobBoardItem__content text-primary">
          <p className="job__title group-hover/jobBoardItem:underline underline-offset-1">
            <strong>{job_title}</strong>
          </p>
          <p className="company__name">{employer_name}</p>
          <p className="job__location">
            {job_city}, {job_state}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobBoardItem;
