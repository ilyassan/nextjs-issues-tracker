import dynamic from "next/dynamic";
import { Flex, Grid } from "@radix-ui/themes";
import IssuesSummary from "./_components/IssuesSummary";
import LatestIssues from "./_components/LatestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import LoadingIssuesChart from "./_components/LoadingIssuesChart";

const IssuesChart = dynamic(() => import("./_components/IssuesChart"), {
  ssr: false,
  loading: () => <LoadingIssuesChart />,
});

const Home = async () => {
  const issues = await prisma.issue.findMany({
    select: { status: true },
  });

  const statusesCount = {
    open: issues.filter((issue) => issue.status === "OPEN").length,
    inProgress: issues.filter((issue) => issue.status === "IN_PROGRESS").length,
    closed: issues.filter((issue) => issue.status === "CLOSED").length,
  };
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesSummary {...statusesCount} />
        <IssuesChart {...statusesCount} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "A summary of project issues",
};

export default Home;
