import { Edit2, MoreHorizontal } from "lucide-react";
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

const CompaniesTable = () => {
  return (
    <div className="my-20">
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <div className="w-10 h-10 rounded-full">
              <img
                src="https://github.com/shadcn.png"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </TableCell>
          <TableCell className="text-white">Microsoft</TableCell>
          <TableCell className="text-white">28-06-2024</TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal className="text-white" />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <div className="flex items-center gap-2 w-fit cursor-pointer">
                  <Edit2 className="w-4" />
                  <span>Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
