import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

function IssueFormSekeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2.5rem" className="mb-4" />
      <Skeleton height="22rem" />
    </Box>
  );
}

export default IssueFormSekeleton;
