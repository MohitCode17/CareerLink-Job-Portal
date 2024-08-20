import {
  BACKEND_APPLICATION_URL,
  BACKEND_JOB_URL,
} from "@/constants/constants";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/store/slices/jobSlice";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

const JobDescription = () => {
  const { id } = useParams(); // job id
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { singleJob } = useSelector((state) => state.job);

  // JOB APPLY FUNCTIONALITY
  const [isApplied, setIsApplied] = useState(false);

  // Update isApplied when singleJob changes
  useEffect(() => {
    if (singleJob) {
      const appliedStatus = singleJob?.applications?.some(
        (application) => application.applicant === user._id
      );
      setIsApplied(appliedStatus || false);
    }
  }, [singleJob, user._id]);

  const handleApplyJob = async () => {
    try {
      const res = await axios.get(`${BACKEND_APPLICATION_URL}/apply/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        // UPDATE SINGLE JOB
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error applied for job, Please try again!"
      );
    }
  };

  // GET JOB BY ID
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${BACKEND_JOB_URL}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [id, dispatch, user._id]);

  return (
    <div className="max-w-7xl mx-auto my-36 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-gray-300">
            {capitalizeFirstLetter(singleJob?.company?.name)}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className={"text-indigo-400 font-bold"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-yellow-400 font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-fuchsia-400 font-bold"} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          onClick={isApplied ? null : handleApplyJob}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-700 font-medium pt-10 pb-4 text-gray-300">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 text-gray-300">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-300">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-300">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-300">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.experienceLevel <= 0
              ? "Fresher"
              : `${singleJob?.experienceLevel} years`}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-300">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-300">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-300">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
