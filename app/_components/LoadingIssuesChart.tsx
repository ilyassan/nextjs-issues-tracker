import { Card } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const LoadingIssuesChart = () => {
  return (
    <Card>
      <Skeleton height={300} />
    </Card>
  );
};

export default LoadingIssuesChart;
