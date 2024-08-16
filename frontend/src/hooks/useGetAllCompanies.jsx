import { BACKEND_COMPANY_URL } from "@/constants/constants";
import { setCompanies } from "@/store/slices/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${BACKEND_COMPANY_URL}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res?.data?.companies));
        }
      } catch (error) {
        console.log("Error fetching companies.");
      }
    };

    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
