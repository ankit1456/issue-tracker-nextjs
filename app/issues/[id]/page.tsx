import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Props = {
  params: {
    id: string;
  };
};

async function IssueDetailPage({ params }: Readonly<Props>) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) notFound();
  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" align="center" my="2">
        <IssueStatusBadge size="2" status={issue.status} />

        <Text size="2">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
}

export default IssueDetailPage;
