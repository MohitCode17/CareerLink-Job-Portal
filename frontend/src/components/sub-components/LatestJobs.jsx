import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  return (
    <div className="max-w-7xl mx-auto my-36 px-4">
      <h1 className="text-4xl font-bold text-gray-300">
        Explore the Latest <span className="text-indigo-500">Openings</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
