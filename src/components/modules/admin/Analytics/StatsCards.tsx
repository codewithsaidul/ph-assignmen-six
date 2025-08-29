import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IStatsCardProps } from "@/types";

export default function StatsCards({
  totalRevenue,
  activeUser,
  completedRides,
  onlineDrivers,
}: IStatsCardProps) {
  const statsData = [
    {
      title: "Platform Revenue",
      value: totalRevenue,
      change: 12.5, // 📈 আপাতত হার্ডকোডেড, পরে API থেকে আসবে
      footerTitle: "Trending up this month",
      footerDescription: "All-time platform earnings",
    },
    {
      title: "Completed Rides",
      value: completedRides,
      change: -5.2, // 📉 আপাতত হার্ডকোডেড
      footerTitle: "Slightly down this week",
      footerDescription: "Total successful trips",
    },
    {
      title: "Active Users",
      value: activeUser,
      change: 8.0, // 📈 আপাতত হার্ডকোডেড
      footerTitle: "Strong user retention",
      footerDescription: "Total riders & drivers",
    },
    {
      title: "Drivers Online",
      value: onlineDrivers,
      change: 0, // লাইভ ডেটার জন্য change '0' বা 'N/A' হতে পারে
      footerTitle: "Live count of available drivers",
      footerDescription: "Ready to accept rides",
    },
  ];

  // সংখ্যা ফরম্যাট করার ফাংশন
  const formatValue = (title: string, value: number) => {
    if (title === "Platform Revenue") {
      // ৳ চিহ্ন যোগ করুন
      return `৳${new Intl.NumberFormat("en-IN").format(value)}`;
    }
    // সাধারণ সংখ্যা ফরম্যাট করুন
    return new Intl.NumberFormat("en-IN").format(value);
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
