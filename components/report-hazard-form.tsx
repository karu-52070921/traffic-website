"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, MapPin, Upload } from "lucide-react"

export function ReportHazardForm() {
  const [location, setLocation] = useState("")
  const [hazardType, setHazardType] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState("medium")
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages([...images, ...fileArray])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Hazard report submitted successfully!")
      // Reset form
      setLocation("")
      setHazardType("")
      setDescription("")
      setSeverity("medium")
      setImages([])
    }, 1500)
  }

  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true)
    // This would normally use the browser's geolocation API
    setLocation("Current Location (GPS coordinates)")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="flex">
          <Input
            id="location"
            placeholder="Enter location or address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="button" variant="outline" size="icon" className="ml-2" onClick={handleUseCurrentLocation}>
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
        {useCurrentLocation && <p className="text-xs text-muted-foreground">Using your current location</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hazardType">Hazard Type</Label>
        <Select value={hazardType} onValueChange={setHazardType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select hazard type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pothole">Pothole</SelectItem>
            <SelectItem value="trafficLight">Traffic Light Issue</SelectItem>
            <SelectItem value="roadDamage">Road Damage</SelectItem>
            <SelectItem value="flooding">Flooding</SelectItem>
            <SelectItem value="debris">Debris on Road</SelectItem>
            <SelectItem value="construction">Unmarked Construction</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="severity">Severity</Label>
        <RadioGroup value={severity} onValueChange={setSeverity} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="text-sm font-normal">
              Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="text-sm font-normal">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high" className="text-sm font-normal">
              High
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the hazard in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Select Files
          </Button>
          <Button type="button" variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            Take Photo
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {images.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">{images.length} file(s) selected</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative w-16 h-16 bg-muted rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </Button>
    </form>
  )
}

