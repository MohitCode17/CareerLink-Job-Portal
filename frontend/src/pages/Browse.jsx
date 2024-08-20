import JobCard from "@/components/sub-components/JobCard";
import { useSelector } from "react-redux";

const Browse = () => {
  const { allJobs } = useSelector((state) => state.job);
  return (
    <div className="max-w-7xl mx-auto my-36 px-4">
      <h1 className="font-bold text-xl my-10 text-gray-300">
        Search Results ({allJobs.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
