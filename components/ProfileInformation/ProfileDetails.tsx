import { MailIcon, BirthdayCakeIcon } from "@/components/Icons/index";
import { FC } from "react";
const ProfileDetails: FC<{ email: string; joinDate: string }> = ({
  email,
  joinDate,
}) => {
  const profileDetails = [
    {
      icon: <MailIcon />,
      title: "Email",
      value: email,
    },
    {
      icon: <BirthdayCakeIcon />,
      title: "Join date",
      value: joinDate,
    },
  ];
  return (
    <div className="profile__details flex flex-wrap justify-center items-center gap-2">
      {profileDetails.map((item, index) => (
        <div
          className="profile__detail text-sm font-semibold flex items-center gap-2 text-whitish/60"
          key={index}
        >
          <div className="profileDetail__icon size-[25px]">{item.icon}</div>
          <p className="profile__detail__value">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetails;
