import AppliedJobTable from "@/components/sub-components/AppliedJobTable";
import EditProfileDialog from "@/components/sub-components/EditProfileDialog";
import { Badge } from "@/components/ui/badge";
import { Contact, Mail } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mt-32 px-4">
      <div className="max-w-4xl mx-auto border border-gray-700 rounded-2xl my-5 p-8 text-white">
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="h-24 w-24 rounded-full">
              <img
                src={
                  user?.profile?.profilePhoto?.url
                    ? user?.profile?.profilePhoto?.url
                    : "https://github.com/shadcn.png"
                }
                className="object-cover object-top w-full h-full rounded-full"
                alt="profile"
              />
            </div>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-400">{user?.profile?.bio}</p>
            </div>
          </div>
          {/* Edit Profile Dialog */}
          <EditProfileDialog user={user} />
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="text-gray-400">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="text-gray-400">{user?.phone}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, i) => (
                <Badge className="bg-gray-600" key={i}>
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-600">No skills added!!</p>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-normal">Resume</label>
          {user?.profile?.resume?.url ? (
            <a
              target="blank"
              href={user?.profile?.resume?.url}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.fullname} Resume
            </a>
          ) : (
            <p className="text-gray-600">No Resume Added!</p>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-transparent rounded-2xl">
        <h1 className="font-semibold text-lg my-5 text-gray-300">
          Applied Jobs
        </h1>
        {/* Applied Job Table   */}
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
