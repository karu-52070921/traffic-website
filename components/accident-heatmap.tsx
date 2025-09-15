"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccidentHeatmap({ showDetailed = false }: { showDetailed?: boolean }) {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="text-sm font-medium">Accident Hotspots</div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full bg-muted/40 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Accident heatmap visualization will be displayed here</p>
          <p className="text-xs text-muted-foreground mt-1">
            Showing data for the last{" "}
            {timeRange === "week"
              ? "week"
              : timeRange === "month"
                ? "month"
                : timeRange === "year"
                  ? "year"
                  : "all time"}
          </p>
        </div>
      </div>

      {showDetailed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <div className="text-sm font-medium">Highest Risk Intersection</div>
            <div className="text-lg font-bold mt-1">Main St & 5th Ave</div>
            <div className="text-xs text-muted-foreground mt-1">12 accidents in last 6 months</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-sm font-medium">Most Common Accident Type</div>
            <div className="text-lg font-bold mt-1">Rear-end Collision</div>
            <div className="text-xs text-muted-foreground mt-1">42% of all accidents</div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="text-sm font-medium">Peak Accident Time</div>
            <div className="text-lg font-bold mt-1">5-7 PM Weekdays</div>
            <div className="text-xs text-muted-foreground mt-1">During evening rush hour</div>
          </div>
        </div>
      )}
    </div>
  )
}

