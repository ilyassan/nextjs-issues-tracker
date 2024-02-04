import { Skeleton } from "@/app/components";
import { Flex } from "@radix-ui/themes";

const NewIssueFormSkeleton = () => {
  return (
    <Flex className="max-w-xl" gap="2" direction="column">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Flex>
  );
};

export default NewIssueFormSkeleton;
