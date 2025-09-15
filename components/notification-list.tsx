"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, Car, Check, Clock, MapPin, School, X } from "lucide-react"

type Notification = {
  id: number
  type: "traffic" | "accident" | "hazard" | "school" | "system"
  title: string
  message: string
  location?: string
  time: string
  read: boolean
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "traffic",
      title: "Heavy Traffic Alert",
      message: "Heavy traffic detected on your usual route. Consider alternative routes.",
      location: "Main Street",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "accident",
      title: "Accident Reported",
      message: "An accident has been reported near your destination.",
      location: "Highway 101, Exit 25",
      time: "25 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "hazard",
      title: "Hazard Report Update",
      message: "Your hazard report has been reviewed by officials.",
      location: "Oak Avenue",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "school",
      title: "School Zone Alert",
      message: "You are approaching a school zone. Please reduce speed.",
      location: "Washington Elementary",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "system",
      title: "System Update",
      message: "RoadSafe has been updated with new features.",
      time: "1 day ago",
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "traffic":
        return <Car className="h-5 w-5 text-yellow-500" />
      case "accident":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "hazard":
        return <MapPin className="h-5 w-5 text-orange-500" />
      case "school":
        return <School className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">
            {notifications.filter((n) => !n.read).length} unread notifications
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-muted/50 border-primary/20"}`}
            >
              <div className="flex">
                <div className="mr-3 mt-0.5">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${!notification.read ? "text-primary" : ""}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  {notification.location && (
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {notification.location}
                    </div>
                  )}
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

