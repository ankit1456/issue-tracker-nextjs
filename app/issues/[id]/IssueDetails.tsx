import { IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" align="center" my="2">
        <IssueStatusBadge size="2" status={issue.status} />

        <Text size="2">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}

export default IssueDetails;
