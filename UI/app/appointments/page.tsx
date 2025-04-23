"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentCard } from "@/components/appointment-card"
import { AppointmentFilters } from "@/components/appointment-filters"

// Sample appointments data
const appointmentsData = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiology",
    doctorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-10-15",
    time: "09:00 AM",
    status: "upcoming",
    paymentStatus: "paid",
    fee: 150,
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurology",
    doctorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-10-20",
    time: "11:30 AM",
    status: "upcoming",
    paymentStatus: "pending",
    fee: 180,
  },
  {
    id: "3",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Pediatrics",
    doctorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-09-30",
    time: "10:00 AM",
    status: "completed",
    paymentStatus: "paid",
    fee: 120,
  },
  {
    id: "4",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Orthopedics",
    doctorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-09-25",
    time: "02:30 PM",
    status: "cancelled",
    paymentStatus: "refunded",
    fee: 200,
  },
  {
    id: "5",
    doctorName: "Dr. Lisa Thompson",
    doctorSpecialty: "Dermatology",
    doctorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-10-18",
    time: "03:00 PM",
    status: "upcoming",
    paymentStatus: "paid",
    fee: 160,
  },
]

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredAppointments = appointmentsData.filter((appointment) => {
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
                        {filteredAppointments.length > 0 ? (
                          filteredAppointments.map((appointment) => (
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
