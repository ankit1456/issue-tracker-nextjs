import { Button } from "@radix-ui/themes";
import Link from "next/link";

function IssueActions() {
  return (
    <div>
      <Button>
        <Link href="/issues/new" className="font-normal">
          New Issue
        </Link>
      </Button>
    </div>
  );
}

export default IssueActions;
