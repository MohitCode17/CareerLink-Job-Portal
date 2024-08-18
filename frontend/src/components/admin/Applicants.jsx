import { useDispatch, useSelector } from "react-redux";
import ApplicantsTable from "./ApplicantsTable";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_URL } from "@/constants/constants";
import { useParams } from "react-router-dom";
import { setAllApplicants } from "@/store/slices/applicationSlice";

const Applicants = () => {
  const jobId = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_APPLICATION_URL}/${jobId}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error.message || "Error while fetching applications");
      }
    };
    fetchAllApplicants();
  }, []);
  const { applicants } = useSelector((state) => state.application);
  return (
    <div>
      <div className="max-w-7xl mx-auto my-36 text-white px-4">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
