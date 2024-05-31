"use client";
import { FC, MouseEventHandler, useRef, useEffect } from "react";
import { CloseIcon } from "../Icons";
import ModalItem from "./ModalItem";
import { motion } from "framer-motion";
const EditProfileModal: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const EDIT_PROFILE_ITEMS = [
    {
      text: "Name",
      value: "Murad",
    },
    {
      text: "Bio",
      value: "No bio yet",
    },
    {
      text: "Portfolio url",
      value: "https://muradyusubov.netlify.app",
    },
    {
      text: "Location",
      value: "Azerbaijan, Baku",
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
              <CloseIcon className="close__icon transition-colors duration-200 fill-whitish hover:fill-white" />
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
            <ModalItem text={item.text} value={item.value} key={index} />
          ))}
        </div>
        <footer className="profileEdit__modal-footer w-full flex justify-end">
          <button className="btn btn-primary font-medium transition-colors hover:bg-whitish/80 py-2 px-4 rounded-md bg-whitish text-sm text-primary">
            Save changes
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;
