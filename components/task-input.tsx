"use client"

import type React from "react"

import {useState} from "react"
import {useDispatch} from "react-redux"
import {addTask} from "@/lib/features/tasks/tasksSlice"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {CalendarIcon, MapPinIcon} from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {format} from "date-fns"
import {cn} from "@/lib/utils"

export default function TaskInput() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            setError("Task title is required")
            return
        }

        dispatch(
            addTask({
                id: Date.now().toString(),
                title,
                location: location || "No location",
                date: date ? format(date, "PPP") : "No date",
                completed: false,
            }),
        )

        setTitle("")
        setLocation("")
        setDate(undefined)
        setError("")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                if (error) setError("")
                            }}
                            className={cn(error && "border-red-500")}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <div className="relative flex-1">
                            <Input
                                placeholder="Location (optional)"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="pl-9"
                            />
                            <MapPinIcon
                                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn("justify-start text-left font-normal sm:w-[180px]", !date && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {date ? format(date, "PPP") : "Set date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus/>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button type="submit" className="w-full">
                        Add Task
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

