import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
const ProfileInformation = () => {
  return (
    <div className="profileInformation">
      <div className="profilePhoto">
        <Image
          width={100}
          height={100}
          alt="profile photo"
          src="https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
        />
      </div>
      <p className="username">Murad Yusubov</p>
      <p className="bio">Im a fullstack dev</p>
      <ProfileDetails />
    </div>
  );
};

export default ProfileInformation;
