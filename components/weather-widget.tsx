"use client"

import type React from "react"

import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import type {RootState} from "@/lib/store"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"
import {AlertCircle, CloudRainIcon, SunIcon, CloudIcon, CloudSnowIcon, CloudLightningIcon} from "lucide-react"
import {Alert, AlertDescription} from "@/components/ui/alert"

type WeatherData = {
    location: string
    temperature: number
    condition: string
    icon: React.ReactNode
}

export default function WeatherWidget() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [location, setLocation] = useState<string | null>(null)

    useEffect(() => {
        // Find the first task with a location
        const taskWithLocation = tasks.find((task) => task.location && task.location !== "No location")

        if (taskWithLocation) {
            setLocation(taskWithLocation.location)
        } else if (tasks.length === 0) {
            setLocation(null)
        }
    }, [tasks])

    useEffect(() => {
        if (!location) {
            setWeather(null)
            setError(null)
            return
        }

        const fetchWeather = async () => {
            setLoading(true)
            setError(null)

            try {
                // Simulate API call with mock data
                // In a real app, you would use:
                // const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);

                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Mock weather data based on location
                const mockWeatherData = getMockWeather(location)
                setWeather(mockWeatherData)
            } catch (err) {
                console.error("Error fetching weather:", err)
                setError("Failed to fetch weather data. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [location])

    const getMockWeather = (location: string): WeatherData => {
        // Generate consistent mock data based on location string
        const locationHash = location.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

        const conditions = [
            {condition: "Sunny", icon: <SunIcon className="h-8 w-8 text-yellow-500"/>},
            {condition: "Cloudy", icon: <CloudIcon className="h-8 w-8 text-gray-500"/>},
            {condition: "Rainy", icon: <CloudRainIcon className="h-8 w-8 text-blue-500"/>},
            {condition: "Snowy", icon: <CloudSnowIcon className="h-8 w-8 text-blue-200"/>},
            {condition: "Thunderstorm", icon: <CloudLightningIcon className="h-8 w-8 text-purple-500"/>},
        ]

        const conditionIndex = locationHash % conditions.length
        const temperature = 10 + (locationHash % 25) // Temperature between 10-35°C

        return {
            location,
            temperature,
            condition: conditions[conditionIndex].condition,
            icon: conditions[conditionIndex].icon,
        }
    }

    if (!location) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Weather</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-32 flex-col items-center justify-center text-center">
                        <p className="text-sm text-muted-foreground">Add a task with a location to see weather
                            information</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Weather</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-3/4"/>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-10 w-10 rounded-full"/>
                            <Skeleton className="h-6 w-16"/>
                        </div>
                        <Skeleton className="h-4 w-1/2"/>
                    </div>
                ) : weather ? (
                    <div>
                        <h3 className="font-medium">{weather.location}</h3>
                        <div className="mt-2 flex items-center">
                            {weather.icon}
                            <span className="ml-2 text-2xl font-bold">{weather.temperature}°C</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{weather.condition}</p>
                        <p className="mt-4 text-xs text-muted-foreground">Weather information for your task location</p>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    )
}

