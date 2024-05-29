import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
import { FC } from "react";
type Nullable<T> = T | null;
const ProfileInformation: FC<{
  profileImage: Nullable<string>;
  username: string;
  bio: string;
  email: string;
  joinDate: string;
}> = ({ profileImage, username, bio, email, joinDate }) => {
  return (
    <div className="profileInformation bg-zephyr py-4 px-1 rounded-lg flex flex-col justify-center items-center">
      <div className="profilePhoto mb-2">
      <img
          alt="profile photo"
          src={
            profileImage ||
            "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
          }
          width={100}
          height={100}
          className="rounded-full h-full"
        />
      </div>
      <p className="username text-whitish text-2xl font-semibold">{username}</p>
      <p className="bio mb-2 text-whitish">Im a fullstack dev</p>
      <ProfileDetails joinDate={joinDate} email={email} />
    </div>
  );
};

export default ProfileInformation;
