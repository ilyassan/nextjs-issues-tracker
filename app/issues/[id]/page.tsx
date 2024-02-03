import AuthOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);

  // check if ID is validate
  if (params.id.length != parseInt(params.id).toString().length) notFound();

  const issue = await fetchIssue(params.id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex className="w-1/2 md:w-full m-auto" direction="column" gap="4">
          {session && <AssigneeSelect issue={issue} />}
          <EditIssueButton issueId={issue.id} />
          {session && <DeleteIssueButton issueId={issue.id} />}
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);
  return {
    title: issue?.title,
    description: `Details of issue ${id}`,
  };
}

export default IssueDetailPage;
