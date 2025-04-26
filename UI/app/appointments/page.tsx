"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/authContext"
import { apiRequest } from "@/utils/apiUtils"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentCard } from "@/components/appointment-card"
import { AppointmentFilters } from "@/components/appointment-filters"

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiRequest<any[]>("/api/appointments/user", { authenticated: true })
        setAppointments(data)
      } catch (error) {
        toast.error((error as Error).message || "Failed to load appointments")
      } finally {
        setIsLoading(false)
      }
    }
    if (user) fetchAppointments()
  }, [user])

  const filteredAppointments = appointments.filter((appointment: any) => {
    if (activeTab === "all") return true
    return appointment.status === activeTab
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-accent/20 py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
            <p className="text-muted-foreground">View and manage all your scheduled appointments</p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AppointmentFilters />
            </div>
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>View and manage your appointments with doctors</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeTab} className="mt-6">
                      <div className="space-y-4">
                        {isLoading ? (
                          <div>Loading appointments...</div>
                        ) : filteredAppointments.length > 0 ? (
                          filteredAppointments.map((appointment: any) => (
                            <AppointmentCard key={appointment.id} appointment={appointment} />
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No appointments found</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
