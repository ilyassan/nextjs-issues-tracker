import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" mt="3" mb="5">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
