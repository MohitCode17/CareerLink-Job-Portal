import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { BACKEND_COMPANY_URL } from "@/constants/constants";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const navigate = useNavigate();
  const companyId = useParams().id;

  // HOOK TO FETCH COMPANY BY ID
  useGetCompanyById(companyId);

  const { singleCompany } = useSelector((state) => state.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogo = (e) => {
    setInput({ ...input, logo: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.logo) {
      formData.append("logo", input.logo);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${BACKEND_COMPANY_URL}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // FETCH PRE-FILLED DATA FOR COMPANY
  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.locatiion || "",
      logo: singleCompany?.logo || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <div className="max-w-xl mx-auto my-36 px-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-900 font-semibold text-xs"
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl text-gray-300">Company Setup</h1>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="Company Name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Company Description"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChange}
                placeholder="Company Website URL"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={handleLogo} />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-indigo-500 hover:bg-indigo-600"
            >
              Update Company
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
