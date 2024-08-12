import { Pen } from "lucide-react";
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

const EditProfileDialog = ({ user }) => {
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">
              Fullname
            </Label>
            <Input
              id="fullname"
              defaultValue={user?.fullname}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={user?.email}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              defaultValue={user?.phone}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input
              id="bio"
              defaultValue={user?.profile?.bio}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Skills" className="text-right">
              Skills
            </Label>
            <Input
              id="skills"
              defaultValue={user?.profile?.skills}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile" className="text-right">
              Profile
            </Label>
            <Input id="profile" className="col-span-3" type="file" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Resume
            </Label>
            <Input id="resume" className="col-span-3" type="file" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
