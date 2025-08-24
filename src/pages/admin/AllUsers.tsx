import Loading from "@/components/loading/Loading";
import PaginationPage from "@/components/pagination/PaginationPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userStatusColorMap } from "@/constants";
import { cn } from "@/lib/utils";
import { useGetAllUsersQuery } from "@/redux/feature/user/user.api";
import { dateFormater } from "@/utils/dateFormater";
import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 20;

  // --- Debounce Logic ---
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(inputValue); // Updating searchTerm after 500ms
    }, 500); // 500ms delay

    // Cleanup function to clear the timeout if inputValue changes before 500ms
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  // fetch all rides
  const { data, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
    searchTerm,
    fields: "name email role isActive status phoneNumber address createdAt",
  });

  if (isLoading && !data) return <Loading />;

  const allUsers = data?.data;
  const pagination = data?.meta;

  const serialNumber = (page - 1) * limit;

  // handle search when enter key was clicked
  const handleSearchOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchTerm(inputValue);
    }
  };

  console.log(searchTerm);

  return (
    <div className="lg:px-6">
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">All Users</h1>
      </div>

      <div className="mb-10">
        <Input
          placeholder="Search name, phone, address..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearchOnKeyDown}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              SL
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Name
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Phone
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Address
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Role
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Status
            </TableHead>
            <TableHead className="cursor-pointer">Date</TableHead>
            <TableHead className="text-right text-xl text-forground font-ride-title font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(allUsers) &&
            allUsers.map((user, idx) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  {serialNumber + idx + 1}
                </TableCell>
                <TableCell className="font-medium">{user?.name}</TableCell>
                <TableCell className="font-medium">
                  {user?.phoneNumber || "Not Provided"}
                </TableCell>
                <TableCell className="font-medium">{user?.address || "Not Provided"}</TableCell>
                <TableCell className="font-medium capitalize">{user?.role}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize max-w-fit",
                      userStatusColorMap[user?.status]
                    )}
                  >
                    {user?.status}
                  </Badge>
                </TableCell>
                <TableCell>{dateFormater(new Date(user?.createdAt))}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        className="cursor-pointer bg-blue-700 dark:text-foreground dark:bg-blue-500"
                      >
                        <Pencil />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <Eye />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {Array.isArray(allUsers) &&
        allUsers.length > 0 &&
        pagination &&
        pagination.total > 20 && (
          <div className="mt-10">
            <PaginationPage
              page={page}
              setPage={setPage}
              totalPages={pagination?.totalPages}
            />
          </div>
        )}

      {/* =============== open status update modal */}
    </div>
  );
}
