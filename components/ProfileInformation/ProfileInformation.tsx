import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
import { FC } from "react";
const ProfileInformation: FC<{
  profileImage: string;
  username: string;
  bio: string;
  email: string;
  joinDate: string;
}> = ({ profileImage, username, bio, email, joinDate }) => {
  return (
    <div className="profileInformation bg-zephyr py-4 px-2 rounded-lg flex flex-col justify-center items-center">
      <div className="profilePhoto mb-2">
        <Image
          alt="profile photo"
          src={
            profileImage
          }
          width={100}
          height={100}
          className="rounded-full h-full"
          priority
        />
      </div>
      <p className="username text-whitish text-2xl font-semibold">{username}</p>
      <p className="bio mb-2 text-whitish">{bio}</p>
      <ProfileDetails joinDate={joinDate} email={email} />
    </div>
  );
};

export default ProfileInformation;
