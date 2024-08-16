import { BACKEND_COMPANY_URL } from "@/constants/constants";
import { setSingleCompany } from "@/store/slices/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${BACKEND_COMPANY_URL}/get/${companyId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res?.data?.company));
        }
      } catch (error) {
        console.log("Error fetching company by id");
      }
    };

    fetchCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
