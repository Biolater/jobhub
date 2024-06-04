const JobBoardItemSkeleton = () => {
  return (
    <div className="jobBoardItem rounded-lg p-2 bg-whitish flex gap-2">
      <div className="jobBoardItem__image relative skeleton-image size-[56px] bg-[#777]/50"></div>
      <div className="jobBoardItem__content skeleton-content flex flex-col gap-1">
        <p className="job__title w-[155px] h-[15px] rounded-lg bg-[#777]/50"></p>
        <p className="company__name w-[76px] h-[15px] rounded-lg bg-[#777]/50 "></p>
        <p className="job__location  w-[112px] h-[15px] rounded-lg bg-[#777]/50"></p>
      </div>
    </div>
  );
};

export default JobBoardItemSkeleton;
