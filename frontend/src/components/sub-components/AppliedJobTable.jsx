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

const allAppliedJobs = [1, 2, 3, 4, 5];

const AppliedJobTable = () => {
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
          {allAppliedJobs.length <= 0 ? (
            <span className="text-gray-600">
              You haven't applied any job yet.
            </span>
          ) : (
            allAppliedJobs.map((appliedJob, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-300">17 May 2024</TableCell>
                <TableCell className="text-gray-300">
                  Sr. Backend Developer
                </TableCell>
                <TableCell className="text-gray-300">Google Inc.</TableCell>
                <TableCell className="text-right text-gray-300">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400 hover:bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400 hover:bg-gray-400"
                        : "bg-green-400 hover:bg-green-400"
                    }`}
                  >
                    Accepted
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
