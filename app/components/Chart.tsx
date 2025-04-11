"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type WeatherData = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
};

interface ChartProps {
  weather: WeatherData | null;
}

export function Chart({ weather }: ChartProps) {
  // Normalization helper
  const normalize = (value: number, min: number, max: number) =>
    (value - min) / (max - min);

  // Define min and max values for normalization
  const tempMin = -10, tempMax = 50;
  const humidityMin = 0, humidityMax = 100;
  const pressureMin = 950, pressureMax = 1050;

  // Prepare chart data based on the weather object
  const chartData = weather
    ? [
        {
          month: "Temperature",
          value: normalize(weather.main.temp, tempMin, tempMax),
        },
        {
          month: "Feels Like",
          value: normalize(weather.main.feels_like, tempMin, tempMax),
        },
        {
          month: "Min Temp",
          value: normalize(weather.main.temp_min, tempMin, tempMax),
        },
        {
          month: "Max Temp",
          value: normalize(weather.main.temp_max, tempMin, tempMax),
        },
        {
          month: "Humidity",
          value: normalize(weather.main.humidity, humidityMin, humidityMax),
        },
        {
          month: "Pressure",
          value: normalize(weather.main.pressure, pressureMin, pressureMax),
        },
      ]
    : [];

  // Chart configuration
  const chartConfig: ChartConfig = {
    temperature: {
      label: "Temperature",
      color: "hsl(var(--chart-1))",
    },
    humidity: {
      label: "Humidity",
      color: "hsl(var(--chart-2))",
    },
    pressure: {
      label: "Pressure",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Weather Radar - Parameters</CardTitle>
        <CardDescription>
          Showing normalized weather values: Temperature, Feels Like, Min/Max
          Temperature, Humidity, and Pressure
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] max-w-[400px]"
        >
          <RadarChart data={chartData} outerRadius={100}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" fontSize={16} />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-temperature)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center font-medium leading-none">
          All parameters are normalized (0–1) for visual comparison.
        </div>
      </CardFooter>
    </Card>
  );
}
