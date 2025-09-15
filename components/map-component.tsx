"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Navigation, MapPin, Search, Layers, School, Car, Construction } from "lucide-react"

export function MapComponent({ isOfficialView = false }: { isOfficialView?: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [activeTab, setActiveTab] = useState("traffic")

  // Mock data for accident zones
  const accidentZones = [
    { id: 1, lat: 49.42, lng: 8.69, severity: "High", description: "Serious accident reported." },
    { id: 2, lat: 49.415, lng: 8.68, severity: "Medium", description: "Minor collision, traffic jam possible." },
    { id: 3, lat: 49.412, lng: 8.675, severity: "Low", description: "Low risk of delay." },
  ]

  // Mock data for hazard reports
  const hazardReports = [
    { id: 1, type: "Pothole", location: "Main St & 5th Ave", status: "Reported", timestamp: "2h ago" },
    { id: 2, type: "Traffic Light", location: "Broadway & 7th", status: "In Progress", timestamp: "5h ago" },
    { id: 3, type: "Road Closure", location: "Park Ave", status: "Resolved", timestamp: "1d ago" },
  ]

  const handleSearch = () => {
    // This would normally call a mapping API
    console.log("Searching route from", startLocation, "to", endLocation)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start">Start Location</Label>
              <div className="flex mt-1">
                <Input
                  id="start"
                  placeholder="Enter start location"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
                <Button variant="ghost" size="icon" className="ml-1">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="end">Destination</Label>
              <div className="flex mt-1">
                <Input
                  id="end"
                  placeholder="Enter destination"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                />
                <Button variant="ghost" size="icon" className="ml-1">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button onClick={handleSearch} className="gap-2">
              <Search className="h-4 w-4" />
              Find Route
            </Button>
          </div>
        </div>

        <div className="flex-none md:w-64">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="accidents">Accidents</TabsTrigger>
              <TabsTrigger value="hazards">Hazards</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="relative flex-1 bg-muted rounded-lg overflow-hidden">
        <div ref={mapRef} className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')]">
          {/* Map would be rendered here */}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="secondary">
            <Layers className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 bg-background/90 p-3 rounded-lg shadow-md">
          <div className="text-sm font-medium mb-2">Map Legend</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs">Low Traffic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-xs">Moderate Traffic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs">Heavy Traffic</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="h-3 w-3 text-red-500 mr-2" />
              <span className="text-xs">Accident Zone</span>
            </div>
            <div className="flex items-center">
              <School className="h-3 w-3 text-blue-500 mr-2" />
              <span className="text-xs">School Zone</span>
            </div>
            <div className="flex items-center">
              <Construction className="h-3 w-3 text-orange-500 mr-2" />
              <span className="text-xs">Road Work</span>
            </div>
          </div>
        </div>

        {activeTab === "accidents" && (
          <div className="absolute top-4 left-4 bg-background/90 p-3 rounded-lg shadow-md w-64">
            <h3 className="text-sm font-medium mb-2">Accident Zones</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {accidentZones.map((zone) => (
                <div key={zone.id} className="text-xs p-2 bg-muted rounded">
                  <div className="font-medium flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        zone.severity === "High"
                          ? "bg-red-500"
                          : zone.severity === "Medium"
                            ? "bg-yellow-500"
                            : "bg-orange-300"
                      }`}
                    ></div>
                    {zone.severity} Risk Zone
                  </div>
                  <div className="mt-1 text-muted-foreground">{zone.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "hazards" && (
          <div className="absolute top-4 left-4 bg-background/90 p-3 rounded-lg shadow-md w-64">
            <h3 className="text-sm font-medium mb-2">Recent Hazard Reports</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {hazardReports.map((report) => (
                <div key={report.id} className="text-xs p-2 bg-muted rounded">
                  <div className="font-medium">{report.type}</div>
                  <div className="text-muted-foreground">{report.location}</div>
                  <div className="flex justify-between mt-1">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        report.status === "Reported"
                          ? "bg-yellow-100 text-yellow-800"
                          : report.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {report.status}
                    </span>
                    <span className="text-muted-foreground">{report.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isOfficialView && (
          <div className="absolute bottom-4 right-4 bg-background/90 p-3 rounded-lg shadow-md">
            <h3 className="text-sm font-medium mb-2">Official Controls</h3>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Car className="h-3 w-3 mr-2" />
                <span className="text-xs">Traffic Control</span>
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-3 w-3 mr-2" />
                <span className="text-xs">Emergency Response</span>
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Construction className="h-3 w-3 mr-2" />
                <span className="text-xs">Maintenance</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

