import {
  MailIcon,
  BirthdayCakeIcon,
  LocationIcon,
  LinkIcon,
} from "@/components/Icons/index";
import { FC } from "react";
import { formatDate } from "@/lib/timestampToDate";
const ProfileDetails: FC<{
  email: string;
  joinDate: string;
  location: string | null;
  portfolioUrl: string | null;
}> = ({ email, joinDate, location, portfolioUrl }) => {
  const profileDetails = [
    {
      icon: <MailIcon />,
      title: "Email",
      value: email,
    },
    {
      icon: <BirthdayCakeIcon />,
      title: "Join date",
      value: `Joined on ${formatDate(joinDate)}`,
    },
    location && {
      icon: <LocationIcon className="fill-whitish/60" />,
      title: "Location",
      value: "Tehran, Iran",
    },
    portfolioUrl && {
      icon: <LinkIcon className="fill-whitish/60" />,
      title: "Portfolio",
      value: portfolioUrl,
    },
  ];
  return (
    <div className="profile__details flex flex-wrap justify-center items-center gap-2">
      {profileDetails.map(
        (item, index) =>
          item &&
          item.value &&
          item.icon &&
          (item.title === "Portfolio" ? (
            <a
              href={item.value}
              target="_blank"
              className="profile__detail text-sm font-semibold flex items-center gap-2 text-whitish/60"
              key={index}
            >
              <div className="profileDetail__icon size-[25px]">{item.icon}</div>
              <p className="profile__detail__value">{item.value}</p>
            </a>
          ) : (
            <div
              className="profile__detail text-sm font-semibold flex items-center gap-2 text-whitish/60"
              key={index}
            >
              <div className="profileDetail__icon size-[25px]">{item.icon}</div>
              <p className="profile__detail__value">{item.value}</p>
            </div>
          ))
      )}
    </div>
  );
};

export default ProfileDetails;
