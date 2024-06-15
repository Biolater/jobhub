import { FC } from "react";

const LinkIconCompany: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 10 11"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8.88889 9.38889H1.11111V1.61111H5V0.5H1.11111C0.494444 0.5 0 1 0 1.61111V9.38889C0 10 0.494444 10.5 1.11111 10.5H8.88889C9.5 10.5 10 10 10 9.38889V5.5H8.88889V9.38889ZM6.11111 0.5V1.61111H8.10556L2.64444 7.07222L3.42778 7.85556L8.88889 2.39444V4.38889H10V0.5H6.11111Z" />
    </svg>
  );
};

export default LinkIconCompany;
