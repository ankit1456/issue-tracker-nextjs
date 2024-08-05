import { Skeleton } from "@/components";
import { Box, Card, Flex } from "@radix-ui/themes";

function LoadingIssueDetailPage() {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      <Flex gap="5" align="center" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}

export default LoadingIssueDetailPage;
