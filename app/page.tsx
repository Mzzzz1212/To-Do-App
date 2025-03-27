"use client"
import {Provider} from "react-redux"
import {store} from "@/lib/store"
import TaskInput from "@/components/task-input"
import TaskList from "@/components/task-list"
import WeatherWidget from "@/components/weather-widget"
import {ThemeProvider} from "@/components/theme-provider"

export default function Home() {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="light" storageKey="todo-theme">
                <main className="min-h-screen bg-background p-4 md:p-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground">Advanced Task Manager</h1>
                            <p className="mt-2 text-muted-foreground">Manage your tasks with weather insights</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                            <div className="space-y-6">
                                <TaskInput/>
                                <TaskList/>
                            </div>
                            <div>
                                <WeatherWidget/>
                            </div>
                        </div>
                    </div>
                </main>
            </ThemeProvider>
        </Provider>
    )
}

