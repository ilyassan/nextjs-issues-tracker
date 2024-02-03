import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? searchParams.orderBy
    : "status";

  const sorting =
    searchParams.sorting === "desc" ? searchParams.sorting : "asc";

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 6;
  const issuesCount = await prisma.issue.count({ where });

  const issues = await prisma.issue.findMany({
    where,
    orderBy: { [orderBy]: sorting },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issuesCount}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "All project issues",
};

export default IssuesPage;
