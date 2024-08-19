import { BACKEND_JOB_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../store/slices/jobSlice";

const useGetAllJobsClient = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobsForClientSide = async () => {
      try {
        const res = await axios.get(`${BACKEND_JOB_URL}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error.message || "Error fetching jobs");
      }
    };
    fetchAllJobsForClientSide();
  }, []);
};

export default useGetAllJobsClient;
