"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Construction,
  Info,
  Layers,
  MapPin,
  Navigation,
  School,
  Search,
  X,
  Upload,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Script from "next/script";
const L = typeof window !== "undefined" ? require("leaflet") : null;

export default function ExploreMapPage() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [activeTab, setActiveTab] = useState("traffic");
  const [showLegend, setShowLegend] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    distance: "0 km",
    trafficDelay: "0 min",
  });
  const [tracking, setTracking] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [carTime, setCarTime] = useState(0);
  const [bikeTime, setBikeTime] = useState(0);
  const [busTime, setBusTime] = useState(0);
  const [trainTime, setTrainTime] = useState(0);
  const [walkTime, setWalkTime] = useState(0);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const routeLayersRef = useRef([]);
  const destinationRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (typeof window === "undefined" || !mapLoaded || !mapRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView([49.41461, 8.681495], 14);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add user marker
    const userMarker = L.marker([0, 0]).addTo(map);
    userMarkerRef.current = userMarker;
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        userMarker.setLatLng([lat, lng]);
        map.setView([lat, lng], 14);

        // Reverse geocode to get address
        geocodeLocation(`${lat}, ${lng}`, (lng, lat, address) => {
          setUserLocation(address);
        });
      });
    }

    // Clean up on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [mapLoaded]);

  // Function to geocode location using TomTom API
  const geocodeLocation = (location, callback) => {
    const apiKey = "IIcDiV8cVI6CZjUEoSAlhxKj6Iy2wjyF"; // Replace with your TomTom API Key
    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
      location
    )}.json?key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const coords = data.results[0].position;
          callback(
            coords.lon,
            coords.lat,
            data.results[0].address.freeformAddress
          );
        } else {
          alert("Location not found: " + location);
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
        alert("An error occurred while geocoding the location.");
      });
  };

  // Function to get routes
  const getRoutes = (
    startLng,
    startLat,
    endLng,
    endLat,
    startAddr,
    endAddr
  ) => {
    const apiKey = "IIcDiV8cVI6CZjUEoSAlhxKj6Iy2wjyF"; // Replace with your TomTom API Key
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${startLat},${startLng}:${endLat},${endLng}/json?key=${apiKey}&routeType=fastest&traffic=true&maxAlternatives=2`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.routes || data.routes.length === 0) {
          alert("No routes found. Try a different location.");
          return;
        }

        clearRoutes();

        data.routes.forEach((route, index) => {
          const points = route.legs[0].points;
          const distance = (route.summary.lengthInMeters / 1000).toFixed(2);
          const carTime = route.summary.travelTimeInSeconds / 60;
          const bikeTime = (route.summary.lengthInMeters / 5000) * 60; // Assuming 5km/hr speed
          const busTime = (route.summary.lengthInMeters / 4000) * 60; // Assuming 4km/hr speed
          const trainTime = (route.summary.lengthInMeters / 30000) * 60; // Assuming 30km/hr speed
          const walkTime = (route.summary.lengthInMeters / 5000) * 60; // Assuming 5km/hr speed

          const trafficDelay = route.summary.trafficDelayInSeconds / 60;
          const congestion = route.summary.trafficDelayInSeconds;

          const color = getTrafficColor(congestion);

          // Check if any accident zone exists along the route
          let routeColor = color; // Default to the traffic color
          const accidentZones = [
            { lat: 49.42, lng: 8.69, severity: "High" },
            { lat: 49.415, lng: 8.68, severity: "Medium" },
            { lat: 49.412, lng: 8.675, severity: "Low" },
          ];

          accidentZones.forEach((zone) => {
            if (isPointNearRoute(zone.lat, zone.lng, points)) {
              routeColor = "red"; // Change color to red if accident zone is nearby
            }
          });

          const polyline = L.polyline(
            points.map((p) => [p.latitude, p.longitude]),
            {
              color: routeColor,
              weight: 5,
            }
          ).addTo(mapInstanceRef.current);

          routeLayersRef.current.push(polyline);

          if (index === 0) {
            destinationRef.current = { lat: endLat, lng: endLng };

            setRouteInfo({
              distance: `${distance} km`,
              trafficDelay: `${trafficDelay.toFixed(0)} min`,
            });

            setCarTime(carTime);
            setBikeTime(bikeTime);
            setBusTime(busTime);
            setTrainTime(trainTime);
            setWalkTime(walkTime);
          }
        });

        if (routeLayersRef.current.length > 0) {
          mapInstanceRef.current.fitBounds(
            routeLayersRef.current[0].getBounds()
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
        alert("An error occurred while fetching the routes.");
      });
  };

  // Function to check if a point is near a route
  const isPointNearRoute = (lat, lng, points) => {
    return points.some((point) => {
      const distance = Math.sqrt(
        Math.pow(lat - point.latitude, 2) + Math.pow(lng - point.longitude, 2)
      );
      return distance < 0.01;
    });
  };

  // Function to get traffic color based on congestion
  const getTrafficColor = (congestion) => {
    return congestion > 900 ? "red" : congestion > 300 ? "yellow" : "green";
  };

  // Function to clear routes
  const clearRoutes = () => {
    routeLayersRef.current.forEach((layer) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    routeLayersRef.current = [];
  };

  // Function to convert minutes to hours and minutes format
  const convertToHours = (minutes) => {
    if (minutes < 60) {
      return `${minutes.toFixed(0)} min`;
    }
    const hours = minutes / 60;
    return `${hours.toFixed(1)} hr`;
  };

  // Function to start tracking
  const startTracking = () => {
    if (!destinationRef.current) {
      alert("Please get a route first.");
      return;
    }

    setTracking(true);
    alert("Tracking started!");

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          if (!tracking) return;

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([lat, lng]);
          }

          updateRemainingDistance(lat, lng);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to update remaining distance
  const updateRemainingDistance = (userLat, userLng) => {
    if (!destinationRef.current) return;

    const apiKey = "IIcDiV8cVI6CZjUEoSAlhxKj6Iy2wjyF"; // Replace with your TomTom API Key
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${userLat},${userLng}:${destinationRef.current.lat},${destinationRef.current.lng}/json?key=${apiKey}&traffic=true`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.routes || data.routes.length === 0) return;

        const distance = (data.routes[0].summary.lengthInMeters / 1000).toFixed(
          2
        );
        const carTime = data.routes[0].summary.travelTimeInSeconds / 60;
        const trafficDelay = data.routes[0].summary.trafficDelayInSeconds / 60;

        setRouteInfo({
          distance: `${distance} km`,
          trafficDelay: `${trafficDelay.toFixed(0)} min`,
        });
      })
      .catch((error) => console.error("Error fetching updated route:", error));
  };

  // Function to handle search
  const handleSearch = () => {
    if (!startLocation || !endLocation) {
      alert("Please enter both start and end locations.");
      return;
    }

    geocodeLocation(startLocation, (startLng, startLat, startAddr) => {
      geocodeLocation(endLocation, (endLng, endLat, endAddr) => {
        getRoutes(startLng, startLat, endLng, endLat, startAddr, endAddr);
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        onLoad={() => setMapLoaded(true)}
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <header className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            RoadSafe
          </Link>
          <div className="flex space-x-3">
            <Button
              asChild
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Multi-Route Traffic Tracker
              </h1>
              <p className="text-gray-600">
                Plan your route, avoid traffic, and stay safe on the road
              </p>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start" className="text-gray-700">
                    Start Location
                  </Label>
                  <div className="flex mt-1">
                    <Input
                      id="start"
                      placeholder="Enter start location"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="border-gray-300 focus:border-gray-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const lat = position.coords.latitude;
                              const lng = position.coords.longitude;
                              geocodeLocation(
                                `${lat}, ${lng}`,
                                (lng, lat, address) => {
                                  setStartLocation(address);
                                }
                              );
                            }
                          );
                        }
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="end" className="text-gray-700">
                    Destination
                  </Label>
                  <div className="flex mt-1">
                    <Input
                      id="end"
                      placeholder="Enter destination"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                      className="border-gray-300 focus:border-gray-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 text-gray-600 hover:text-gray-900"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handleSearch}
                    className="gap-2 bg-gray-900 hover:bg-gray-800"
                  >
                    <Search className="h-4 w-4" />
                    Get Routes
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!destinationRef.current}
                    onClick={startTracking}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    Start Tracking
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 border-gray-300 hover:bg-gray-100"
                    onClick={() => setShowReportForm(!showReportForm)}
                  >
                    <Camera className="h-4 w-4" />
                    Report Hazard
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div
                className={`${showReportForm ? "w-full md:w-2/3" : "w-full"}`}
              >
                <div className="p-4 border-b border-gray-200">
  <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList className="grid w-full grid-cols-2 bg-gray-100">
      <TabsTrigger
        value="traffic"
        className="w-full flex justify-center data-[state=active]:bg-gray-900 data-[state=active]:text-black"
      >
        Traffic
      </TabsTrigger>
    </TabsList>
  </Tabs>
</div>


                <div className="relative h-[600px]">
                  <div ref={mapRef} className="absolute inset-0"></div>

                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => setShowLegend(!showLegend)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900"
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        if (navigator.geolocation && mapInstanceRef.current) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const lat = position.coords.latitude;
                              const lng = position.coords.longitude;
                              mapInstanceRef.current.setView([lat, lng], 14);
                            }
                          );
                        }
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>

                  {showLegend && (
                    <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-md z-[1000] border border-gray-200">
                      <div className="text-sm font-medium mb-2 text-gray-900">
                        Map Legend
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                          <span className="text-xs text-gray-700">
                            Low Traffic
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                          <span className="text-xs text-gray-700">
                            Moderate Traffic
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-900 mr-2"></div>
                          <span className="text-xs text-gray-700">
                            Heavy Traffic
                          </span>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle className="h-3 w-3 text-gray-900 mr-2" />
                          <span className="text-xs text-gray-700">
                            Accident Zone
                          </span>
                        </div>
                        <div className="flex items-center">
                          <School className="h-3 w-3 text-gray-700 mr-2" />
                          <span className="text-xs text-gray-700">
                            School Zone
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Construction className="h-3 w-3 text-gray-600 mr-2" />
                          <span className="text-xs text-gray-700">
                            Road Work
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-2 text-gray-900">
                    Traffic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1 text-gray-700">
                        Traffic Colors
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-center text-sm">
                          <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                          <span className="text-gray-700">
                            Green: No traffic congestion
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                          <span className="text-gray-700">
                            Yellow: Moderate traffic
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-3 h-3 rounded-full bg-gray-900 mr-2"></div>
                          <span className="text-gray-700">
                            Red: Heavy traffic congestion
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1 text-gray-700">
                        Route Information
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Total Distance:
                          </span>{" "}
                          {routeInfo.distance}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Traffic Delay:
                          </span>{" "}
                          {routeInfo.trafficDelay}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Estimated Time by Car:
                          </span>{" "}
                          {convertToHours(carTime)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Estimated Time by Bike:
                          </span>{" "}
                          {convertToHours(bikeTime)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Estimated Time by Bus:
                          </span>{" "}
                          {convertToHours(busTime)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Estimated Time by Train:
                          </span>{" "}
                          {convertToHours(trainTime)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-900">
                            Estimated Time by Walking:
                          </span>{" "}
                          {convertToHours(walkTime)}
                        </p>
                        {tracking && userLocation && (
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-900">
                              Your Location:
                            </span>{" "}
                            {userLocation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showReportForm && (
                <div className="w-full md:w-1/3 border-l border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        Report a Hazard
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowReportForm(false)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="hazardLocation"
                          className="text-gray-700"
                        >
                          Location
                        </Label>
                        <div className="flex mt-1">
                          <Input
                            id="hazardLocation"
                            placeholder="Enter location or address"
                            className="border-gray-300 focus:border-gray-500"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 text-gray-600 hover:text-gray-900"
                            onClick={() => {
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const lat = position.coords.latitude;
                                    const lng = position.coords.longitude;
                                    if (mapInstanceRef.current) {
                                      mapInstanceRef.current.setView(
                                        [lat, lng],
                                        16
                                      );
                                      const tempMarker = L.marker([
                                        lat,
                                        lng,
                                      ]).addTo(mapInstanceRef.current);
                                      setTimeout(() => {
                                        mapInstanceRef.current.removeLayer(
                                          tempMarker
                                        );
                                      }, 3000);
                                    }
                                  }
                                );
                              }
                            }}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="hazardType" className="text-gray-700">
                          Hazard Type
                        </Label>
                        <Select>
                          <SelectTrigger className="border-gray-300 focus:border-gray-500">
                            <SelectValue placeholder="Select hazard type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pothole">Pothole</SelectItem>
                            <SelectItem value="trafficLight">
                              Traffic Light Issue
                            </SelectItem>
                            <SelectItem value="roadDamage">
                              Road Damage
                            </SelectItem>
                            <SelectItem value="flooding">Flooding</SelectItem>
                            <SelectItem value="debris">
                              Debris on Road
                            </SelectItem>
                            <SelectItem value="construction">
                              Unmarked Construction
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-gray-700">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the hazard in detail"
                          rows={4}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-700">Upload Images</Label>
                        <div className="flex mt-1">
                          <Input
                            id="start"
                            placeholder="Enter start location"
                            value={startLocation}
                            onChange={(e) => setStartLocation(e.target.value)}
                            className="border-gray-300 focus:border-gray-500"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 text-gray-600 hover:text-gray-900"
                            onClick={() => {
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const lat = position.coords.latitude;
                                    const lng = position.coords.longitude;
                                    geocodeLocation(
                                      `${lat}, ${lng}`,
                                      (lng, lat, address) => {
                                        setStartLocation(address);
                                      }
                                    );
                                  }
                                );
                              }
                            }}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                        Submit Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} RoadSafe. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/about" className="text-gray-400 hover:text-white">
              About
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
