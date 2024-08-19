import { Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const JobCard = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl hover:shadow-2xl bg-black/10 border border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">2 days ago</p>
        <Button
          variant="outline"
          className="rounded-full bg-gray-900 border-none text-white"
          size="icon"
        >
          <Bookmark size={19} />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-2">
        <div className="w-14 h-14 rounded-full">
          <img
            src={job?.company?.logo?.url || "https://github.com/shadcn.png"}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-medium text-lg text-gray-300">
            {capitalizeFirstLetter(job?.company?.name)}
          </h1>
          <p className="text-sm text-gray-400">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-gray-300">{job?.title}</h1>
        <p className="text-sm text-gray-400 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 my-6">
        <Badge className={"text-indigo-400 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-yellow-500 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-fuchsia-500 font-bold"} variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" className="bg-white">
          Details
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-500">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
