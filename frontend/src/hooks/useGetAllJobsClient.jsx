import { BACKEND_JOB_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../store/slices/jobSlice";

const useGetAllJobsClient = () => {
  const dispatch = useDispatch();
  const { searchQueryText } = useSelector((state) => state.job);

  useEffect(() => {
    const fetchAllJobsForClientSide = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_JOB_URL}/get?keyword=${searchQueryText}`,
          {
            withCredentials: true,
          }
        );

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
