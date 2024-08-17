import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch } from "react-redux";
import { searchJobByText } from "@/store/slices/jobSlice";

const AdminJobs = () => {
  // GET ALL ADMIN JOBS
  useGetAllJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // SEARCH JOB FUNCTIONALITY
  useEffect(() => {
    dispatch(searchJobByText(input));
  }, [input]);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-36 px-4">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full sm:w-2/4 bg-transparent outline-none text-white focus:outline-none focus:border-none"
            placeholder="Search job by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/job/create")}
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 self-start"
          >
            Create Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
