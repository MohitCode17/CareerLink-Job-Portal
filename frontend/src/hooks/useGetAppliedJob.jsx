import { BACKEND_APPLICATION_URL } from "@/constants/constants";
import { setAppliedJobs } from "@/store/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${BACKEND_APPLICATION_URL}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAppliedJobs(res?.data?.applications));
        }
      } catch (error) {
        console.log("Error fetching applied job applications.");
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJob;
