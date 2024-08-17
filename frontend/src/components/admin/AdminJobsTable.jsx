import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((state) => state.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }

        return (
          job?.title?.toLowerCase().includes(searchJobByText?.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText?.toLowerCase())
        );
      });

    setFilterJob(filteredJob);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="my-20">
      <Table>
        <TableCaption>A list of your recent registered jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Company Name</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob?.map((job) => (
            <tr key={job._id}>
              <TableCell className="text-white">{job?.company?.name}</TableCell>
              <TableCell className="text-white">{job?.title}</TableCell>
              <TableCell className="text-white">
                {job?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-white" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() => navigate(`/admin/job/${job._id}`)}
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
