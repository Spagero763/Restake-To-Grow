"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Treasury", split: 70, fill: "var(--color-treasury)" },
  { name: "GrowthPool", split: 30, fill: "var(--color-growthpool)" },
];

const chartConfig = {
  split: {
    label: "Split",
  },
  treasury: {
    label: "Treasury",
    color: "hsl(var(--chart-1))",
  },
  growthpool: {
    label: "GrowthPool",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function YieldSplit() {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Yield Split</CardTitle>
        <CardDescription>
          Yield is split 70/30 between the Treasury and the GrowthPool.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="split"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
