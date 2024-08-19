import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const LatestJobCard = ({ job }) => {
  return (
    <Link to={`/job/description/${job._id}`}>
      <div className="p-5 rounded-md shadow-xl hover:shadow-2xl bg-black/10 border border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">
        <div>
          <h1 className="font-medium text-lg text-gray-300">
            {capitalizeFirstLetter(job?.company?.name)}
          </h1>
          <p className="text-sm text-gray-400">{job?.location}</p>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2 text-gray-300">{job?.title}</h1>
          <p className="text-sm text-gray-400 line-clamp-2">
            {job?.description}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-indigo-400 font-bold"} variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className={"text-yellow-400 font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-fuchsia-400 font-bold"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCard;
