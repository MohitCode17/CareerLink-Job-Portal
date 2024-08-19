import JobCard from "./JobCard";

const LatestJobs = () => {
  const allJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="max-w-7xl mx-auto my-36 px-4">
      <h1 className="text-4xl font-bold text-gray-300">
        Explore the Latest <span className="text-indigo-500">Openings</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <JobCard />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
