"use client";

import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function UpdateStatus({ issue }: { issue: Issue }) {
  const router = useRouter();

  const handleStatusChange = (status: Status) => {
    return axios.patch(`/api/issues/${issue.id}`, {
      status,
    });
  };

  const { mutate } = useMutation({
    mutationFn: handleStatusChange,
    onSuccess: () => {
      toast.success("Status updated");
      router.refresh();
    },
    onError: () => toast.error("Changes could not be saved"),
  });
  return (
    <>
      <Toaster />
      <Select.Root defaultValue={issue.status} onValueChange={mutate}>
        <Select.Trigger placeholder="Change status" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Item value={Status.OPEN}>Open</Select.Item>
            <Select.Item
              disabled={!issue.assignedToUserId}
              value={Status.IN_PROGRESS}
            >
              In Progress
            </Select.Item>
            <Select.Item value={Status.CLOSED}>Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}

export default UpdateStatus;
