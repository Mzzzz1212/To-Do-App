"use client"

import {useSelector, useDispatch} from "react-redux"
import {toggleTask, removeTask} from "@/lib/features/tasks/tasksSlice"
import type {RootState} from "@/lib/store"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {CalendarIcon, MapPinIcon, Trash2Icon} from "lucide-react"
import {motion, AnimatePresence} from "framer-motion"

export default function TaskList() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()

    if (tasks.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Your Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                        <p className="text-sm text-muted-foreground">You don&apos;t have any tasks yet. Add one
                            above!</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Tasks ({tasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <AnimatePresence>
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <motion.li
                                key={task.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, height: 0}}
                                transition={{duration: 0.2}}
                                className="group rounded-lg border p-4 transition-colors hover:bg-accent/50"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            checked={task.completed}
                                            onCheckedChange={() => dispatch(toggleTask(task.id))}
                                            className="mt-1"
                                        />
                                        <div>
                                            <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                                {task.title}
                                            </p>
                                            <div
                                                className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                {task.location && task.location !== "No location" && (
                                                    <span className="flex items-center">
                            <MapPinIcon className="mr-1 h-3 w-3"/>
                                                        {task.location}
                          </span>
                                                )}
                                                {task.date && task.date !== "No date" && (
                                                    <span className="flex items-center">
                            <CalendarIcon className="mr-1 h-3 w-3"/>
                                                        {task.date}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => dispatch(removeTask(task.id))}
                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Trash2Icon className="h-4 w-4 text-muted-foreground"/>
                                    </Button>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}

