"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Construction,
  Droplets,
  Eye,
  MapPin,
  MoreHorizontal,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Report = {
  id: number
  type: string
  location: string
  status: "Pending" | "In Review" | "Resolved" | "Rejected"
  severity: "Low" | "Medium" | "High"
  date: string
  reporter: string
  description: string
  images?: string[]
}

const reports: Report[] = [
  {
    id: 1,
    type: "Pothole",
    location: "Main St & 5th Ave",
    status: "Pending",
    severity: "Medium",
    date: "2 hours ago",
    reporter: "John D.",
    description: "Large pothole in the middle of the lane causing traffic to swerve.",
    images: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: 2,
    type: "Traffic Light",
    location: "Broadway & 7th",
    status: "In Review",
    severity: "High",
    date: "5 hours ago",
    reporter: "Sarah M.",
    description: "Traffic light not cycling properly, causing congestion.",
  },
  {
    id: 3,
    type: "Flooding",
    location: "Park Ave",
    status: "Resolved",
    severity: "High",
    date: "1 day ago",
    reporter: "Michael K.",
    description: "Street flooding after heavy rain, approximately 6 inches deep.",
    images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
  },
  {
    id: 4,
    type: "Road Debris",
    location: "Highway 101, Mile 25",
    status: "Pending",
    severity: "Medium",
    date: "3 hours ago",
    reporter: "Emily R.",
    description: "Large debris on the highway causing drivers to change lanes suddenly.",
  },
  {
    id: 5,
    type: "Construction",
    location: "Oak Street",
    status: "In Review",
    severity: "Low",
    date: "2 days ago",
    reporter: "David L.",
    description: "Unmarked construction zone causing confusion for drivers.",
  },
  {
    id: 6,
    type: "Signage",
    location: "Elm Street & 3rd",
    status: "Rejected",
    severity: "Low",
    date: "3 days ago",
    reporter: "Lisa T.",
    description: "Missing stop sign at intersection.",
  },
  {
    id: 7,
    type: "Pothole",
    location: "Pine Avenue",
    status: "Pending",
    severity: "Medium",
    date: "4 hours ago",
    reporter: "Robert J.",
    description: "Multiple potholes along the street damaging vehicles.",
  },
  {
    id: 8,
    type: "Traffic Light",
    location: "Market St & 9th",
    status: "Resolved",
    severity: "High",
    date: "5 days ago",
    reporter: "Jennifer P.",
    description: "Traffic light completely non-functional.",
  },
]

export function HazardReportsList({ limit }: { limit?: number }) {
  const [displayReports, setDisplayReports] = useState<Report[]>(limit ? reports.slice(0, limit) : reports)

  const getIcon = (type: string) => {
    switch (type) {
      case "Pothole":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "Traffic Light":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Flooding":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "Construction":
        return <Construction className="h-4 w-4 text-orange-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Review":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateStatus = (id: number, newStatus: "Pending" | "In Review" | "Resolved" | "Rejected") => {
    setDisplayReports(displayReports.map((report) => (report.id === id ? { ...report, status: newStatus } : report)))
  }

  return (
    <div className="space-y-4">
      {displayReports.map((report) => (
        <div key={report.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">{getIcon(report.type)}</div>
              <div>
                <h4 className="text-sm font-medium">{report.type}</h4>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {report.location}
                </div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  {report.reporter}
                </div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {report.date}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex space-x-2">
                <Badge variant="outline" className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
                <Badge variant="outline" className={getSeverityColor(report.severity)}>
                  {report.severity}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 mt-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateStatus(report.id, "In Review")}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Mark as In Review
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateStatus(report.id, "Resolved")}>
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{report.description}</p>

          {report.images && report.images.length > 0 && (
            <div className="mt-3">
              <div className="flex space-x-2">
                {report.images.map((image, index) => (
                  <div key={index} className="w-16 h-16 rounded overflow-hidden border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Report ${report.id} image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 flex justify-end">
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
              View Details
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

