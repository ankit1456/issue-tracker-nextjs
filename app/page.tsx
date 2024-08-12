import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Grid, Flex } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: Status.OPEN } }),
    prisma.issue.count({
      where: { status: Status.IN_PROGRESS },
    }),
    prisma.issue.count({ where: { status: Status.CLOSED } }),
  ]);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          issues={{
            open,
            inProgress,
            closed,
          }}
        />
        <IssueChart
          issues={{
            open,
            inProgress,
            closed,
          }}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
