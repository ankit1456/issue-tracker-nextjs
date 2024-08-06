import { Skeleton } from "@/components";
import { Table } from "@radix-ui/themes";
import IssueActions from "../_components/IssueActions";
function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-6">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block sm:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default LoadingIssuesPage;
