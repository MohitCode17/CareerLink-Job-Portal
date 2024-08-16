import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";

const Companies = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-6xl mx-auto my-36 px-4">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full sm:w-2/4 bg-transparent outline-none text-white focus:outline-none focus:border-none"
            placeholder="Filter by name"
          />
          <Button
            onClick={() => navigate("/admin/company/create")}
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 self-start"
          >
            Create New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
