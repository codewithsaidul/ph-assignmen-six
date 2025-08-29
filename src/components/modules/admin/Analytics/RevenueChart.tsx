import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { IDailyRevenueData } from "@/types";
import { useEffect, useMemo, useState } from "react";

const chartConfig = {
  totalGrossFare: {
    label: "Total Gross Fare",
    color: "var(--primary)",
  },
  totalPlatformRevenue: {
    label: "Platform Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface IRevenueChartProps {
  dailyRevenueData: IDailyRevenueData[];
}

export default function RevenueChart ({
  dailyRevenueData,
}: IRevenueChartProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const chartDataShow = useMemo(() => {
    if (!dailyRevenueData) return [];
    if (timeRange === "7d") return dailyRevenueData.slice(-7);
    if (timeRange === "30d") return dailyRevenueData.slice(-30);
    return dailyRevenueData;
  }, [dailyRevenueData, timeRange]);

  return (
    <div className="lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>
            Showing daily revenue for the selected period
          </CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
              <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-40 @[767px]/card:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartDataShow}>
              <defs>
                <linearGradient id="fillGrossFare" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-totalGrossFare)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-totalGrossFare)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillPlatformRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-totalPlatformRevenue)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-totalPlatformRevenue)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="totalGrossFare"
                type="natural"
                fill="url(#fillGrossFare)"
                stroke="var(--color-totalGrossFare)"
                stackId="a"
                name={chartConfig.totalGrossFare.label}
              />
              <Area
                dataKey="totalPlatformRevenue"
                type="natural"
                fill="url(#fillPlatformRevenue)"
                stroke="var(--color-totalPlatformRevenue)"
                stackId="a"
                name={chartConfig.totalPlatformRevenue.label}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}