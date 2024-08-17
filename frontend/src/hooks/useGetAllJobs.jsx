import { BACKEND_JOB_URL } from "@/constants/constants";
import { setAllAdminJobs } from "@/store/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${BACKEND_JOB_URL}/getAdminJobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res?.data?.jobs));
        }
      } catch (error) {
        console.log("Error fetching admin jobs.");
      }
    };

    fetchAllAdminJobs();
  }, []);
};

export default useGetAllJobs;
