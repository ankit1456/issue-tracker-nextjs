import dynamic from "next/dynamic";
import IssueFormSekeleton from "../_components/IssueFormSekeleton";
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSekeleton />,
});

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;
