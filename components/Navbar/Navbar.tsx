import { FC } from "react";
import { AddIcon } from "../Icons";
const Navbar: FC = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <button className="navbar__hamburgerBtn flex flex-col gap-1">
            <span className="bg-whitish h-[3px] w-5"></span>
            <span className="bg-whitish h-[3px] w-5"></span>
            <span className="bg-whitish h-[3px] w-5"></span>
          </button>
          <div className="navbar__actions flex items-center justify-center">
            <button className="addJobBtn flex items-center justify-center bg-white/10 rounded-full size-9 hover:bg-white/20">
              <div className="size-7">
                <AddIcon />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
