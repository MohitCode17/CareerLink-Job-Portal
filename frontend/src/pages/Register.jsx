import { BACKEND_USER_URL } from "@/constants/constants";
import axios from "axios";
import { Loader2, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "job-seeker",
    profilePhoto: "",
    profilePhotoPreview: "",
  });

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // HANDLE PROFILE
  const handleProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInput((prevInput) => ({
        ...prevInput,
        profilePhotoPreview: reader.result, // Preview the image
        profilePhoto: file, // Save the actual file for upload
      }));
    };
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("role", input.role);
    formData.append("password", input.password);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_USER_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        navigate("/login");
        setLoading(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response.data.message || "Registration failed. Please try again."
      );
    }
  };

  // REDIRECT TO HOME IF USER EXISTS
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Let's get you started!
        </h2>
        <p className="text-gray-400/70">
          Welcome to CareerLink, Feel free to create an account!
        </p>
      </div>

      <div className=" mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium leading-6 text-gray-400"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                autoComplete="fullname"
                placeholder="John Doe"
                value={input.fullname}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-400"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="abc@gmail.com"
                value={input.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                value={input.password}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Phone
              </label>
            </div>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                required
                autoComplete="phone-number"
                placeholder="011-1234567890"
                value={input.phone}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Register As
              </label>
            </div>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                autoComplete="role"
                value={input.role}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-indigo-800 sm:text-sm sm:leading-6 pl-1"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-400">
              Profile Photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-2 flex items-center justify-center gap-x-3">
                  {input.profilePhotoPreview ? (
                    <img
                      src={input.profilePhotoPreview}
                      alt="profile-photo"
                      className="w-16 h-16 rounded-full object-cover object-top"
                    />
                  ) : (
                    <UserCircleIcon
                      aria-hidden="true"
                      className="h-16 w-16 text-gray-300"
                    />
                  )}
                </div>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="profile-photo"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="profile-photo"
                      name="profile-photo"
                      type="file"
                      className="sr-only"
                      onChange={handleProfile}
                    />
                  </label>
                  <p className="pl-2">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400"
          >
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
