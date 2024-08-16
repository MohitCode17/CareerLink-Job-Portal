import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_COMPANY_URL } from "@/constants/constants";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/store/slices/companySlice";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  // HANDLE CREATE NEW COMPANIES
  const handleNewCompany = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_COMPANY_URL}/create`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error creating a company.");
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 my-28 sm:my-40">
        <div className="">
          <h1 className="font-bold text-2xl text-gray-300">
            Your Company Name
          </h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={handleNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
