/**
 * @fileoverview The Navbar component
 * @author Yusif Bekirov
 */
import { FC, useState } from "react";
import { AddIcon } from "../Icons";
import { Tooltip } from "@nextui-org/tooltip";
import { AddJobModalPortal } from "@/components/index";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "aws-amplify/auth";

/**
 * The Navbar component
 * @param {Object} props - Component props
 * @return {ReactElement} - Component
 */
const Navbar: FC = () => {
  const [jobModalActive, setJobModalActive] = useState<boolean>(false);
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
   * Signs out the user
   */
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <Tooltip
            className="bg-[#3C4043] text-sm px-2 py-1 rounded-sm text-whitish"
            placement="bottom"
            content="Menu"
            delay={0}
            closeDelay={0}
          >
            <button className="navbar__hamburgerBtn transition-all duration-200 active:bg-white/20 size-12 items-center justify-center rounded-full hover:bg-white/10 flex flex-col gap-1">
              <span className="bg-whitish h-[3px] w-5"></span>
              <span className="bg-whitish h-[3px] w-5"></span>
              <span className="bg-whitish h-[3px] w-5"></span>
            </button>
          </Tooltip>
          <div className="navbar__actions flex items-center justify-center">
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
              <button onClick={handleSignOut} className="navbar__logoutBtn">
                Logout
              </button>
            )}
          </div>
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
