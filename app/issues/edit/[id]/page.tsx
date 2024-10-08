import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSekeleton from "../../_components/IssueFormSekeleton";
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSekeleton />,
});

type Props = {
  params: {
    id: string;
  };
};

async function EditIssuePage({ params }: Readonly<Props>) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
