import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Construction, Droplets, MapPin } from "lucide-react"

type Report = {
  id: number
  type: string
  location: string
  status: "Pending" | "In Review" | "Resolved"
  severity: "Low" | "Medium" | "High"
  date: string
  description: string
}

const reports: Report[] = [
  {
    id: 1,
    type: "Pothole",
    location: "Main St & 5th Ave",
    status: "Pending",
    severity: "Medium",
    date: "2 hours ago",
    description: "Large pothole in the middle of the lane causing traffic to swerve.",
  },
  {
    id: 2,
    type: "Traffic Light",
    location: "Broadway & 7th",
    status: "In Review",
    severity: "High",
    date: "5 hours ago",
    description: "Traffic light not cycling properly, causing congestion.",
  },
  {
    id: 3,
    type: "Flooding",
    location: "Park Ave",
    status: "Resolved",
    severity: "High",
    date: "1 day ago",
    description: "Street flooding after heavy rain, approximately 6 inches deep.",
  },
  {
    id: 4,
    type: "Road Debris",
    location: "Highway 101, Mile 25",
    status: "Pending",
    severity: "Medium",
    date: "3 hours ago",
    description: "Large debris on the highway causing drivers to change lanes suddenly.",
  },
  {
    id: 5,
    type: "Construction",
    location: "Oak Street",
    status: "In Review",
    severity: "Low",
    date: "2 days ago",
    description: "Unmarked construction zone causing confusion for drivers.",
  },
]

export function RecentReports({ showAll = false }: { showAll?: boolean }) {
  const displayReports = showAll ? reports : reports.slice(0, 3)

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
              <span className="text-xs text-muted-foreground mt-1">{report.date}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{report.description}</p>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              View Details
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}

      {!showAll && (
        <Button variant="outline" className="w-full">
          View All Reports
        </Button>
      )}
    </div>
  )
}

