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
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/feature/user/user.api";
import { dateFormater } from "@/utils/dateFormater";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteUser] = useDeleteUserMutation();
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
    fields:
      "name email role isActive isDeleted status phoneNumber address createdAt",
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

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    const toastId = toast.loading("Deleting...");
    try {
      if (result.isConfirmed) {
        const res = await deleteUser(userId).unwrap();
        if (res.success && res.statusCode === 200) {
          toast.success(res.message, { id: toastId });
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage, { id: toastId });
    }
  };

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
              Email
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
                <TableCell className="font-medium">{user?.email}</TableCell>
                <TableCell className="font-medium">
                  {user?.phoneNumber || "Not Provided"}
                </TableCell>
                <TableCell className="font-medium">
                  {user?.address || "Not Provided"}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {user?.role}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize max-w-fit",
                      userStatusColorMap[user?.status],
                      user.isDeleted
                        ? "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50"
                        : ""
                    )}
                  >
                    {user?.isDeleted ? "Deleted" : user?.status}
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
                    variant="default"
                    className="cursor-pointer bg-red-500"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <Trash2 />
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
