import { useSelector } from "react-redux";
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
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_APPLICATION_URL } from "@/constants/constants";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);

  // HANDLE UPDATE STATUS
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${BACKEND_APPLICATION_URL}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error updating status, Try again!");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phone}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume?.url ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume Link
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => handleUpdateStatus(item._id, status)}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
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

export default ApplicantsTable;
