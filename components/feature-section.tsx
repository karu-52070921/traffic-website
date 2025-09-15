import { MapPin, AlertTriangle, Camera, Bell, BarChart4, Route, School, ShieldAlert } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Real-time Traffic Visualization",
      description:
        "View traffic density with color-coded routes. Green for smooth traffic, yellow for moderate, and red for congestion.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: "Accident Zone Alerts",
      description:
        "Receive alerts about accident-prone zones on your selected routes with risk percentage based on historical data.",
    },
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "Citizen Reporting",
      description: "Upload photos or videos of damaged roads or hazards to help officials take prompt action.",
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Dynamic Notifications",
      description: "Get alerts for potential traffic congestion near schools or colleges based on the time of day.",
    },
    {
      icon: <Route className="h-10 w-10 text-primary" />,
      title: "Alternative Routes",
      description:
        "Discover alternative routes with detailed information about high-accident zones and predicted traffic levels.",
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-primary" />,
      title: "Comprehensive Data Access",
      description: "Officials can monitor traffic patterns, accident zones, and reported issues in real-time.",
    },
    {
      icon: <School className="h-10 w-10 text-primary" />,
      title: "School Zone Awareness",
      description: "Special alerts when approaching educational institutions during peak hours.",
    },
    {
      icon: <ShieldAlert className="h-10 w-10 text-primary" />,
      title: "Action Dashboard",
      description: "Tools for officials to prioritize repairs and enforce traffic laws based on citizen reports.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Citizens & Officials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers a comprehensive set of tools to help both citizens and officials create safer roads and
            more efficient traffic management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

