"use client";
import { FC, MouseEventHandler, useRef, useEffect, useState } from "react";
import { CloseIcon, LoadingButtonIcon } from "../Icons";
import ModalItem from "./ModalItem";
import { motion } from "framer-motion";
import { UserDetailsType } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { UserDetailsKeys } from "@/app/home-page/my-profile/page";
const EditProfileModal: FC<{
  handleClose: () => void;
  userDetails: UserDetailsType;
  inputChanged: boolean;
  onInputChange: (key: string, value: string) => void;
  changes: Partial<Record<UserDetailsKeys, string>>;
  userId: string;
}> = ({
  handleClose,
  userDetails,
  inputChanged,
  onInputChange,
  changes,
  userId,
}) => {
  const client = generateClient<Schema>();
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const EDIT_PROFILE_ITEMS = [
    {
      text: "Name",
      value: userDetails.username,
      title: "username",
      placeholder: "Your name",
    },
    {
      text: "Bio",
      value: userDetails.bio,
      title: "bio",
      placeholder: "Your bio",
    },
    {
      text: "Portfolio url",
      value: userDetails.portfolioUrl || "",
      title: "portfolioUrl",
      placeholder: "Your portfolio url",
    },
    {
      text: "Location",
      value: userDetails.location || "",
      title: "location",
      placeholder: "Your location",
    },
  ];
  const EDIT_PROFILE_MODAL_LAYER_VARIANTS = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const EDIT_PROFILE_MODAL_VARIANTS = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };
  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };
  const updateUser = async (id: string) => {
    try {
      setLoading(true);
      const { data, errors } = await client.models.User.update(
        {
          id,
          ...changes,
        },
        {
          authMode: "userPool",
        }
      );
      if (errors) {
        setLoading(false);
        throw new Error(errors[0].message);
      } else if (data) {
        window.location.reload();
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("portfolioUrl")) {
          toast.error("Please enter a valid portfolio url");
        } else {
          toast.error("Error updating profile");
        }
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  const handleSaveChanges = () => {
    if (!inputChanged) {
      toast.error("No changes were made");
      return;
    } else if (inputChanged && loading) {
      toast.error("Please wait while we update your profile");
      return;
    } else {
      updateUser(userId);
    }
  };
  const handleInputChange = (key: string, value: string) => {
    onInputChange(key, value);
  };
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);
  return (
    <motion.div
      data-testid="editProfileModal"
      onClick={handleOutsideClick}
      variants={EDIT_PROFILE_MODAL_LAYER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="profileEdit__modal-layer fixed left-0 z-[9999] top-0 h-screen w-full flex items-center justify-center bg-black/50"
    >
      <motion.div
        ref={modalRef}
        variants={EDIT_PROFILE_MODAL_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className="profileEdit__modal-content p-5 flex flex-col gap-4 text-whitish max-w-[425px] w-full shadow-lg sm:rounded-lg bg-primary"
      >
        <header className="profileEdit__modal-header">
          <div className="header__top flex items-center justify-between">
            <h2 className="header__title font-semibold text-lg">
              Edit Profile
            </h2>
            <button
              onClick={handleClose}
              className="close__btn focus:ring-2 p-1 focus:ring-offset-2 rounded-sm  "
            >
              <CloseIcon className="close__icon transition-colors duration-200 hover:fill-white fill-whitish size-[14px]" />
            </button>
          </div>
          <div className="header__bottom mt-1">
            <p className="text-sm text-muted">
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
        </header>
        <div className="profileEdit__modal-body flex flex-col gap-2">
          {EDIT_PROFILE_ITEMS.map((item, index) => (
            <ModalItem
              placeholder={item.placeholder}
              onInputChange={(key, value) => handleInputChange(key, value)}
              title={item.title}
              text={item.text}
              value={item.value}
              key={index}
            />
          ))}
        </div>
        <footer className="profileEdit__modal-footer w-full flex justify-end">
          <button
            disabled={loading}
            onClick={handleSaveChanges}
            className="btn btn-primary flex items-center font-medium transition-colors hover:bg-whitish/80 py-2 px-4 rounded-md bg-whitish text-sm text-primary"
          >
            {loading && <LoadingButtonIcon />}
            Save changes
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;
