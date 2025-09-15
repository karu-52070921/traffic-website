"use client"

import { useState } from "react"
import Link from "next/link"
import { CitizenLayout } from "@/components/layouts/citizen-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapComponent } from "@/components/map-component"
import { ReportHazardForm } from "@/components/report-hazard-form"
import { NotificationList } from "@/components/notification-list"
import { RecentReports } from "@/components/recent-reports"
import { TrafficAlerts } from "@/components/traffic-alerts"

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showReportForm, setShowReportForm] = useState(false)

  return (
    <CitizenLayout>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Citizen Dashboard
            </h1>
            <p className="text-gray-600">Welcome back! Monitor traffic, report hazards, and stay safe on the road.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 hover:border-blue-400 transition-colors duration-300"
              asChild
            >
              <Link href="/citizen/my-reports">View My Reports</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              onClick={() => setShowReportForm(!showReportForm)}
            >
              Report Hazard
            </Button>
          </div>
        </div>

        {showReportForm ? (
          <Card className="mb-6 backdrop-blur-sm bg-white/80 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Report a Road Hazard</CardTitle>
                <CardDescription>Help make roads safer by reporting hazards you encounter</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReportForm(false)}
                className="hover:bg-blue-50 transition-colors duration-300"
              >
                Cancel
              </Button>
            </CardHeader>
            <CardContent>
              <ReportHazardForm onSuccess={() => setShowReportForm(false)} />
            </CardContent>
          </Card>
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Map
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              My Reports
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader className="pb-2">
                  <CardTitle>Traffic Status</CardTitle>
                  <CardDescription>Current traffic conditions in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium">Moderate Traffic</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-300"
                      asChild
                    >
                      <Link href="/explore-map">View Map</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader className="pb-2">
                  <CardTitle>Accident Risk</CardTitle>
                  <CardDescription>Based on current conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium">Low Risk (15%)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-300"
                      asChild
                    >
                      <Link href="/explore-map">Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader className="pb-2">
                  <CardTitle>My Reports</CardTitle>
                  <CardDescription>Your contribution to safer roads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">5</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-300"
                      asChild
                    >
                      <Link href="/citizen/my-reports">View All</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1 backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Latest hazards reported in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentReports />
                </CardContent>
              </Card>

              <Card className="col-span-1 backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Traffic Alerts</CardTitle>
                  <CardDescription>Important alerts for your commute</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrafficAlerts />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <Card className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Interactive Map</CardTitle>
                  <CardDescription>View traffic, hazards, and plan your route</CardDescription>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  asChild
                >
                  <Link href="/explore-map">Full Map View</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full rounded-lg overflow-hidden">
                  <MapComponent />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Reports</CardTitle>
                  <CardDescription>Hazards you've reported</CardDescription>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  onClick={() => setShowReportForm(true)}
                >
                  New Report
                </Button>
              </CardHeader>
              <CardContent>
                <RecentReports showAll />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="backdrop-blur-sm bg-white/80 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Stay updated with important alerts</CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-200 hover:border-blue-400 transition-colors duration-300"
                  asChild
                >
                  <Link href="/citizen/notifications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <NotificationList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CitizenLayout>
  )
}