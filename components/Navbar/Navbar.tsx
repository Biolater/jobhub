/**
 * @fileoverview The Navbar component
 * @author Yusif Bekirov
 */
import { FC, useState } from "react";
import { AddIcon } from "../Icons";
import { Tooltip } from "@nextui-org/tooltip";
import { AddJobModalPortal, ProfilePopUp } from "@/components/index";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
/**
 * The Navbar component
 * @param {Object} props - Component props
 * @return {ReactElement} - Component
 */
const Navbar: FC<{ onMenuOpen: () => void }> = ({ onMenuOpen }) => {
  const [jobModalActive, setJobModalActive] = useState<boolean>(false);
  const [profilePopUpActive, setProfilePopUpActive] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  

  /**
   * Toggles the job modal active state
   */
  const handleJobModal = () => {
    setJobModalActive(true);
  };

  /**
   * Closes the job modal
   */
  const handleJobModalCancel = () => {
    setJobModalActive(false);
  };

  /**
   * handles the profile pop up
   */
  const handleProfilePopUp = () => {
    setProfilePopUpActive((prev) => !prev);
  };

  /**
   * handles the outside click for the profile pop up
   */

  const handleOutsideClickProfilePopUp = () => {
    setProfilePopUpActive(false);
  };

  return (
    <header className="navbar__header" data-testid="navbar">
      <nav className="navbar">
        <div className="relative px-4 py-2 sm:py-3.5 mx-auto flex items-center justify-between">
          <Tooltip
            className="bg-[#3C4043] sm:hidden text-sm px-2 py-1 rounded-sm text-whitish"
            placement="bottom"
            content="Menu"
            delay={0}
            closeDelay={0}
          >
            <button
              data-testid="navbar__hamburgerBtn"
              onClick={onMenuOpen}
              className="navbar__hamburgerBtn sm:hidden  z-[51] transition-all duration-200 active:bg-white/20 size-12 items-center justify-center rounded-full hover:bg-white/10 flex flex-col gap-1"
            >
              <span className="bg-whitish h-[3px] w-5"></span>
              <span className="bg-whitish h-[3px] w-5"></span>
              <span className="bg-whitish h-[3px] w-5"></span>
            </button>
          </Tooltip>
          <Link href="/home-page" className="navbar__logo hidden sm:block">
            <p className="text-whitish font-semibold text-2xl">Jobhub</p>
          </Link>
          <div className="navbar__actions relative gap-4 flex items-center justify-center">
            <Tooltip
              className="bg-[#3C4043] text-sm px-2 py-1 rounded-sm text-whitish"
              content="Add Job"
              placement="bottom"
              delay={0}
              closeDelay={0}
            >
              <button
                onClick={handleJobModal}
                className="addJobBtn transition-all duration-200 active:bg-white/30 flex items-center justify-center bg-white/10 rounded-full size-9 hover:bg-white/20"
              >
                <div className="size-7">
                  <AddIcon />
                </div>
              </button>
            </Tooltip>
            {isLoggedIn && (
              <button
                onClick={handleProfilePopUp}
                className="profile__button z-10 relative"
              >
                <div className="profile__picture size-9 bg-black rounded-full"></div>
              </button>
            )}
          </div>
          <AnimatePresence>
            {profilePopUpActive && (
              <ProfilePopUp
                handleOutsideClickPopUp={handleOutsideClickProfilePopUp}
              />
            )}
          </AnimatePresence>
        </div>
      </nav>
      <AddJobModalPortal
        handleCancel={handleJobModalCancel}
        isActive={jobModalActive}
      />
    </header>
  );
};

export default Navbar;
