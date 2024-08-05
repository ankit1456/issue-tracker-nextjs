import { Skeleton } from "@/components";
import { Box } from "@radix-ui/themes";

function LoadingNewIssuePage() {
  return (
    <Box>
      <p>loading...</p>
      <Skeleton />
      <Skeleton />
    </Box>
  );
}

export default LoadingNewIssuePage;
