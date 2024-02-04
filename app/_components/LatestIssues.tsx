import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "../components";

const LatestIssues = async () => {
  const take = 5;
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="!shadow-none">
              <Heading size="5">Latest Issues</Heading>
            </Table.Cell>
          </Table.Row>
          {issues.map((issue, i) => (
            <Table.Row key={issue.id}>
              <Table.Cell className={i === take - 1 ? "!shadow-none" : ""}>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
