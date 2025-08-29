import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IDriverStatsCardProps } from "@/types";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

export default function DriverStatsCard({
  totalEarnings,
  completedRides,
}: IDriverStatsCardProps) {
const statsData = [
  {
    title: "Total Earnings",
    value:totalEarnings,
    change: 0,
    footerTitle: "Your all-time earnings",
    footerDescription: "Total income after commission",
  },
  {
    title: "Total Completed Rides",
    value: completedRides,
    change: 5.2,
    footerTitle: "Total successful trips made",
    footerDescription: "Keep driving safely!",
  },
  {
    title: "Your Average Rating",
    value: 4.7,
    change: 0,
    footerTitle: "Your performance score",
    footerDescription: "Based on rider feedback",
  },
];

  const formatValue = (title: string, value: number) => {
    if (title === "Platform Revenue") {
      return `৳${new Intl.NumberFormat("en-IN").format(value)}`;
    }
    return new Intl.NumberFormat("en-IN").format(value);
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 gap-4">
      {statsData.map((stats, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{stats.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatValue(stats.title, stats.value)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {stats.change >= 0 ? (
                  <IconTrendingUp className="text-green-500" />
                ) : (
                  <IconTrendingDown className="text-red-500" />
                )}
                {stats.change}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {stats.footerTitle}
              {stats.change >= 0 ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">
              {stats.footerDescription}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
