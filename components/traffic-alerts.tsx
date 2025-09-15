import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Car, Clock, MapPin, School } from "lucide-react"

type Alert = {
  id: number
  type: "traffic" | "accident" | "school" | "construction"
  title: string
  location: string
  time: string
  severity: "Low" | "Medium" | "High"
  description: string
}

const alerts: Alert[] = [
  {
    id: 1,
    type: "traffic",
    title: "Heavy Traffic",
    location: "Main Street",
    time: "Current",
    severity: "High",
    description: "Heavy congestion due to rush hour. Expect delays of 15-20 minutes.",
  },
  {
    id: 2,
    type: "accident",
    title: "Vehicle Collision",
    location: "Highway 101, Exit 25",
    time: "25 minutes ago",
    severity: "Medium",
    description: "Two-vehicle collision, right lane blocked. Emergency services on scene.",
  },
  {
    id: 3,
    type: "school",
    title: "School Zone Active",
    location: "Washington Elementary",
    time: "Active until 4:00 PM",
    severity: "Low",
    description: "School zone speed limits in effect. Increased pedestrian activity expected.",
  },
  {
    id: 4,
    type: "construction",
    title: "Road Construction",
    location: "Oak Avenue",
    time: "Ongoing",
    severity: "Medium",
    description: "Lane closures due to road repairs. Expect delays during peak hours.",
  },
]

export function TrafficAlerts() {
  const getIcon = (type: string) => {
    switch (type) {
      case "traffic":
        return <Car className="h-4 w-4 text-yellow-500" />
      case "accident":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "school":
        return <School className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
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
      {alerts.map((alert) => (
        <div key={alert.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">{getIcon(alert.type)}</div>
              <div>
                <h4 className="text-sm font-medium">{alert.title}</h4>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {alert.location}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                {alert.severity}
              </Badge>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {alert.time}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{alert.description}</p>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              View on Map
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

