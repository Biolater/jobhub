import { FC } from "react";

const ProfileBanner: FC<{ bannerUrl: string }> = ({ bannerUrl }) => {
  const bannerStyle = {
    backgroundImage: `url(${bannerUrl})`,
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  };
  return (
    <div className="w-full bannerWrapper h-[150px]">
      <div className="bannerInner" style={bannerStyle} />
    </div>
  );
};

export default ProfileBanner;
