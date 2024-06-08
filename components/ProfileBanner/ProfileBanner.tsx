"use client";
import { FC, useRef, useState } from "react";
import {
  FileUploaderRegular,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import toast from "react-hot-toast";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import { useAuth } from "@/contexts/AuthContext";
const ProfileBanner: FC<{ bannerUrl: string | null }> = ({ bannerUrl }) => {
  const client = generateClient<Schema>();
  const { userId } = useAuth();
  const handleProfileBannerUpdate = async () => {
    try {
      const { data, errors } = await client.models.User.update(
        {
          id: userId,
          profileBanner: uploadedBannerUrl,
        },
        {
          authMode: "userPool",
        }
      );
      if (errors) {
        throw new Error(errors[0].message);
      } else if (data) {
        toast.success("Profile banner uploaded successfully");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (err) {
      toast.error("Error updating profile banner");
    }
  };
  const [uploadedBannerUrl, setUploadedBannerUrl] = useState("");
  const bannerStyle = {
    backgroundImage: `url(${
      bannerUrl
        ? bannerUrl
        : "https://robertmarshall.dev/static/d71528d312b579dd0449078f8a8f56ab/b5380/reactjs-1.png"
    })`,
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  };
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);
  const handleDoneClick = () => {
    handleProfileBannerUpdate();
    uploaderRef.current?.uploadCollection.clearAll();
  };
  const handleModalClose = () => {
    uploaderRef.current?.uploadCollection.clearAll();
  };
  return (
    <div className="w-full group/banner relative bannerWrapper h-[150px] md:h-[170px]">
      <div className="bannerInner" style={bannerStyle} />
      <FileUploaderRegular
        apiRef={uploaderRef}
        className="fileUploaderWrapper transition-none duration-300 group-hover/banner:opacity-100 group-hover/banner:pointer-events-auto opacity-0 pointer-events-none absolute top-[48%] left-1/2 translate-x-[-50%] translate-y-[-50%]"
        cropPreset="16:9"
        onDoneClick={handleDoneClick}
        onModalClose={handleModalClose}
        onFileUploadSuccess={(e) => setUploadedBannerUrl(e.cdnUrl)}
        pubkey="4c3aa865a371a495bdbd"
        maxLocalFileSizeBytes={5000000}
        multiple={false}
        imgOnly={true}
        sourceList="local, url, camera, dropbox"
      />
    </div>
  );
};

export default ProfileBanner;
