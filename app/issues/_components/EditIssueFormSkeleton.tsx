import { Skeleton } from "@/app/components";
import { Flex } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Flex className="max-w-xl" gap="2" direction="column">
      <Skeleton width="6rem" height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Flex>
  );
};

export default IssueFormSkeleton;
