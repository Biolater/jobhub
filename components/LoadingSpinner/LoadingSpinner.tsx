import { FC } from "react";

const LoadingSpinner: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      data-testid="loadingIndicator"
      className={`w-full flex justify-center items-center bg-primary/60 ${className}`}
    >
      <div className="lds-ripple text-whitish">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
