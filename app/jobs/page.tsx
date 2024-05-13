import { NoJobIcon } from "@/components/Icons";
import { Navbar } from "@/components";
const Jobs = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="container text-center px-4 mx-auto">
          <div className="noJobIcon max-w-[250px] mx-auto mb-2 flex justify-center">
            <NoJobIcon />
          </div>
          <h1 className="text-whitish font-semibold text-2xl">
            It seems like you haven’t added a job yet
          </h1>
          <p className="text-white/40 font-medium">
            Click on the plus icon to add a job
          </p>
        </div>
      </main>
    </>
  );
};

export default Jobs;
