import { Loader2, Pen } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import axios from "axios";
import { BACKEND_USER_URL } from "@/constants/constants";
import { toast } from "sonner";

const EditProfileDialog = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    resume: user?.profile?.resume?.url || "",
    profilePhoto: user?.profile || "",
  });

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // HANDLE PROFILE CHANGE
  const handleProfileChange = (e) => {
    setInput({ ...input, profilePhoto: e.target.files?.[0] });
  };

  // HANDLE RESUME CHANGE
  const handleResumeChange = (e) => {
    setInput({ ...input, resume: e.target.files?.[0] });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("skills", input.skills);
    formData.append("bio", input.bio);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    if (input.resume) {
      formData.append("resume", input.resume);
    }

    // CALLING UPDATE USER PROFILE API
    try {
      setLoading(true);

      const res = await axios.put(
        `${BACKEND_USER_URL}/profile/update`,
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
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response.data.message ||
          "Error while updating profile, Try again later."
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-lg hover:bg-gray-900 transition-all duration-300">
          <Pen size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Fullname
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={input.phone}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profile" className="text-right">
                Profile
              </Label>
              <Input
                id="profile"
                name="profilePhoto"
                className="col-span-3"
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                name="resume"
                className="col-span-3"
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button>
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
