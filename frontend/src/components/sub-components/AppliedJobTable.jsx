import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((state) => state.job);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-200">Date</TableHead>
            <TableHead className="text-gray-200">Job Role</TableHead>
            <TableHead className="text-gray-200">Company</TableHead>
            <TableHead className="text-right text-gray-200">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <span className="text-gray-600">
              You haven't applied any job yet.
            </span>
          ) : (
            appliedJobs.map((appliedJob, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-300">
                  {appliedJob?.updatedAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-gray-300">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-gray-300">{capitalizeFirstLetter(appliedJob?.job?.company?.name)}</TableCell>
                <TableCell className="text-right text-gray-300">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500 hover:bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-gray-500 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-500"
                    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
