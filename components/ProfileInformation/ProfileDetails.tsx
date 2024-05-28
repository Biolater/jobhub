import { MailIcon, BirthdayCakeIcon } from "@/components/Icons/index";
const ProfileDetails = () => {
  const profileDetails = [
    {
      icon: <MailIcon />,
      title: "Email",
      value: "yusifovmurad1@gmail.com",
    },
    {
      icon: <BirthdayCakeIcon />,
      title: "Join date",
      value: "Joined at 2024, December 10",
    },
  ];
  return (
    <div className="profile__details">
      {profileDetails.map((item, index) => (
        <div
          className="profile__detail flex items-center gap-1 text-whitish/60"
          key={index}
        >
          {item.icon}
          <p className="profile__detail__value">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetails;
