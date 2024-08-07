import Pagination from "@/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";
import { Metadata } from "next";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
};

async function IssuesPage({ searchParams }: Readonly<Props>) {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columnNames.map((name) => name).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where,
  });

  return (
    <div className="flex flex-col gap-6">
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="center">
        <Pagination
          currentPage={currentPage}
          itemsCount={issuesCount}
          pageSize={pageSize}
        />
      </Flex>
    </div>
  );
}

export const dynamic = "force-dynamic";
// export const revalidate = 60

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
