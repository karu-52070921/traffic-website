"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TrafficAnalytics({ showDetailed = false }: { showDetailed?: boolean }) {
  const [timeRange, setTimeRange] = useState("week")
  const [dataType, setDataType] = useState("traffic")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue={dataType} onValueChange={setDataType} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="accidents">Accidents</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          {showDetailed && <Button variant="outline">Export Data</Button>}
        </div>
      </div>

      <div className="h-[300px] w-full bg-muted/40 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {dataType === "traffic"
              ? "Traffic density chart"
              : dataType === "accidents"
                ? "Accident frequency chart"
                : "Hazard reports chart"}{" "}
            will be displayed here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Showing data for the last{" "}
            {timeRange === "day"
              ? "24 hours"
              : timeRange === "week"
                ? "week"
                : timeRange === "month"
                  ? "month"
                  : "year"}
          </p>
        </div>
      </div>

      {showDetailed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-medium">Peak Traffic Hours</div>
            <div className="text-2xl font-bold mt-1">8-9 AM, 5-6 PM</div>
            <div className="text-xs text-muted-foreground mt-1">Based on average congestion</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-sm font-medium">Most Congested Area</div>
            <div className="text-2xl font-bold mt-1">Downtown</div>
            <div className="text-xs text-muted-foreground mt-1">75% higher than average</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-sm font-medium">Traffic Trend</div>
            <div className="text-2xl font-bold mt-1">↑ 12%</div>
            <div className="text-xs text-muted-foreground mt-1">Compared to previous period</div>
          </div>
        </div>
      )}
    </div>
  )
}

