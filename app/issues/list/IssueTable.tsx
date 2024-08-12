import { IssueStatusBadge, Link } from "@/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon, HeightIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
  issues: Issue[];
};

async function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value}>
              <Flex align="center" gap="1">
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy ? (
                  <ArrowUpIcon />
                ) : (
                  <HeightIcon />
                )}
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="ml-auto block sm:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Flex>
            </Table.Cell>

            <Table.Cell className="hidden sm:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default IssueTable;

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden sm:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden sm:table-cell",
  },
];

export const columnNames = columns.map((col) => col.value);
