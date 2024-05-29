import { FC } from "react";

const ProfileBanner: FC<{ bannerUrl: string | null }> = ({ bannerUrl }) => {
  const bannerStyle = {
    backgroundImage: `url(https://robertmarshall.dev/static/d71528d312b579dd0449078f8a8f56ab/b5380/reactjs-1.png)`,
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
