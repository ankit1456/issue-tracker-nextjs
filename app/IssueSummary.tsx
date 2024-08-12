import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issues: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueSummary = ({ issues: { open, inProgress, closed } }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", value: closed, status: Status.CLOSED },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label} className="shadow-sm">
          <Link href={`/issues/list?status=${container.status}`}>
            <Flex direction="column" gap="1">
              <Text className="text-sm font-medium">{container.label}</Text>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
