"use client"

import { useState } from "react"
import { OfficialLayout } from "@/components/layouts/official-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapComponent } from "@/components/map-component"
import { HazardReportsList } from "@/components/hazard-reports-list"
import { TrafficAnalytics } from "@/components/traffic-analytics"
import { AccidentHeatmap } from "@/components/accident-heatmap"

export default function OfficialDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <OfficialLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Official Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor traffic patterns, manage hazard reports, and improve road safety.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline">Export Data</Button>
            <Button>Create Action Plan</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Hazard Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Active Reports</CardTitle>
                  <CardDescription>Pending action</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">24</span>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Traffic Incidents</CardTitle>
                  <CardDescription>Last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">8</span>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>High Risk Areas</CardTitle>
                  <CardDescription>Requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">3</span>
                    <Button variant="ghost" size="sm">
                      View Map
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Resolved Issues</CardTitle>
                  <CardDescription>This month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">42</span>
                    <Button variant="ghost" size="sm">
                      History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Traffic Analytics</CardTitle>
                  <CardDescription>Traffic patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrafficAnalytics />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Hazard Reports</CardTitle>
                  <CardDescription>Latest citizen reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <HazardReportsList limit={5} />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Accident Hotspots</CardTitle>
                  <CardDescription>Areas with high accident rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <AccidentHeatmap />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Hazard Reports</CardTitle>
                  <CardDescription>Manage and respond to citizen reports</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <HazardReportsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Traffic Patterns</CardTitle>
                  <CardDescription>Analysis of traffic flow over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrafficAnalytics showDetailed />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accident Heatmap</CardTitle>
                  <CardDescription>Geographic distribution of accidents</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <AccidentHeatmap showDetailed />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Categories</CardTitle>
                  <CardDescription>Types of hazards reported</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Report category chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>Comprehensive view of traffic, hazards, and accident zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full">
                  <MapComponent isOfficialView />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OfficialLayout>
  )
}

