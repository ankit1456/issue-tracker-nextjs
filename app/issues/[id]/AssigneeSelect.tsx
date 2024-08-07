"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, isPending: isLoadingUsers, error } = useUsers();
  const router = useRouter();

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== "null" ? userId : null,
      })
      .then(() => {
        toast.success(
          userId === "null" ? "Issue Unassigned" : "Issue assigned",
        );

        router.refresh();
      })
      .catch(() => toast.error("Changes could not be saved"));
  };

  if (error) return null;
  if (isLoadingUsers) return <Skeleton height="2rem" />;

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedToUserId ?? "null"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="assign user" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 60s
    retry: 3,
  });

export default AssigneeSelect;
