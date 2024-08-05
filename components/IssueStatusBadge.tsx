import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap = new Map<
  Status,
  { label: string; color: "red" | "green" | "violet" }
>([
  ["OPEN", { label: "Open", color: "red" }],
  ["IN_PROGRESS", { label: "In Progress", color: "violet" }],
  ["CLOSED", { label: "Closed", color: "green" }],
]);

type Props = {
  status: Status;
  size?: "1" | "2" | "3";
};

const IssueStatusBadge = ({ status, size = "1" }: Props) => {
  const { color, label } = statusMap.get(status)!;

  return (
    <Badge size={size} color={color}>
      {label}
    </Badge>
  );
};

export default IssueStatusBadge;
