import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button className="w-full">
        <Pencil2Icon />
        Edit Issues
      </Button>
    </Link>
  );
};

export default EditIssueButton;
