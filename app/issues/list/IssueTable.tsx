import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, Heading } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sorting: string;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      {issues.length > 0 ? (
        <>
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.value}
                  column={column}
                  searchParams={searchParams}
                />
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <TableRow key={issue.id} issue={issue} />
            ))}
          </Table.Body>
        </>
      ) : (
        <Heading size="5" m="5" align="center">
          There's no issues to show
        </Heading>
      )}
    </Table.Root>
  );
};

interface Columns {
  label: string;
  value: keyof Issue;
  classname?: string;
}
interface TableHeaderProps {
  column: Columns;
  searchParams: Props["searchParams"];
}

const columns: Columns[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", classname: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    classname: "hidden md:table-cell",
  },
];

const TableHeaderCell = ({ column, searchParams }: TableHeaderProps) => (
  <Table.ColumnHeaderCell className={column.classname}>
    <NextLink
      href={{
        query: {
          ...searchParams,
          orderBy: column.value,
          sorting:
            column.value === searchParams.orderBy &&
            searchParams.sorting === "asc"
              ? "desc"
              : "asc",
        },
      }}
    >
      {column.label}
    </NextLink>
    {column.value === searchParams.orderBy &&
      (searchParams.sorting === "desc" ? (
        <ArrowUpIcon className="inline" />
      ) : (
        <ArrowDownIcon className="inline" />
      ))}
  </Table.ColumnHeaderCell>
);

const TableRow = ({ issue }: { issue: Issue }) => (
  <Table.Row>
    <Table.Cell>
      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
      <div className="block md:hidden">
        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
      </div>
    </Table.Cell>

    <Table.Cell className="hidden md:table-cell">
      <IssueStatusBadge status={issue.status}></IssueStatusBadge>
    </Table.Cell>

    <Table.Cell className="hidden md:table-cell">
      {issue.createdAt.toDateString()}
    </Table.Cell>
  </Table.Row>
);

export const columnNames = columns.map((column) => column.value);
export default IssueTable;
