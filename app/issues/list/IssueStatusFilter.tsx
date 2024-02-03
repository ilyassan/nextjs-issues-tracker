"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const addNewParamsQuery = (status: string) => {
    const currentQuery = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentQuery.set("status", status);
    currentQuery.set("page", "1");

    const query = currentQuery.size ? `?${currentQuery.toString()}` : "";
    router.push("/issues/list" + query);
  };

  const defaultStatus = statuses
    .map((status) => status.value)
    .includes(searchParams.get("status") as Status)
    ? searchParams.get("status")
    : undefined;

  return (
    <Select.Root
      defaultValue={defaultStatus!}
      onValueChange={addNewParamsQuery}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value || "ALL"}
            value={status.value || "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
