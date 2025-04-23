"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Check, X, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"

// Sample appointments data
const appointmentsData = [
  {
    id: "1",
    patientName: "John Smith",
    patientEmail: "john.smith@example.com",
    patientPhone: "+1 (555) 123-4567",
    date: "2023-10-15",
    time: "09:00 AM",
    status: "upcoming",
    type: "New Patient",
    notes: "First visit for heart palpitations",
    fee: 150,
  },
  {
    id: "2",
    patientName: "Emily Davis",
    patientEmail: "emily.davis@example.com",
    patientPhone: "+1 (555) 234-5678",
    date: "2023-10-15",
    time: "10:30 AM",
    status: "upcoming",
    type: "Follow-up",
    notes: "Follow-up after medication change",
    fee: 120,
  },
  {
    id: "3",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@example.com",
    patientPhone: "+1 (555) 345-6789",
    date: "2023-10-10",
    time: "11:45 AM",
    status: "completed",
    type: "New Patient",
    notes: "Diagnosed with hypertension, prescribed medication",
    fee: 150,
  },
  {
    id: "4",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.johnson@example.com",
    patientPhone: "+1 (555) 456-7890",
    date: "2023-10-09",
    time: "09:15 AM",
    status: "completed",
    type: "Follow-up",
    notes: "Blood pressure improved, continuing current medication",
    fee: 120,
  },
  {
    id: "5",
    patientName: "Michael Brown",
    patientEmail: "michael.brown@example.com",
    patientPhone: "+1 (555) 567-8901",
    date: "2023-10-08",
    time: "02:00 PM",
    status: "cancelled",
    type: "New Patient",
    notes: "Patient cancelled due to emergency",
    fee: 150,
  },
  {
    id: "6",
    patientName: "Jennifer Lee",
    patientEmail: "jennifer.lee@example.com",
    patientPhone: "+1 (555) 678-9012",
    date: "2023-10-16",
    time: "11:00 AM",
    status: "upcoming",
    type: "Follow-up",
    notes: "Routine check-up after heart surgery",
    fee: 120,
  },
  {
    id: "7",
    patientName: "David Miller",
    patientEmail: "david.miller@example.com",
    patientPhone: "+1 (555) 789-0123",
    date: "2023-10-16",
    time: "03:30 PM",
    status: "upcoming",
    type: "New Patient",
    notes: "Referred by Dr. Thompson for heart arrhythmia",
    fee: 150,
  },
]

export function DoctorAppointments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const filteredAppointments = appointmentsData.filter((appointment) => {
    // Search filter
    const searchMatch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientPhone.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    const tabMatch = activeTab === "all" || appointment.status === activeTab

    return searchMatch && tabMatch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Appointments</h1>
        <p className="text-muted-foreground">Manage your patient appointments</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name, email, or phone..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {showFilters && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="new">New Patient</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <DatePicker label="From Date" />
              </div>
              <div className="space-y-2">
                <DatePicker label="To Date" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
          <CardDescription>View and manage your scheduled appointments</CardDescription>
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
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Patient</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fee</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                          <tr
                            key={appointment.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div>
                                <p className="font-medium">{appointment.patientName}</p>
                                <p className="text-xs text-muted-foreground">{appointment.patientEmail}</p>
                                <p className="text-xs text-muted-foreground">{appointment.patientPhone}</p>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span>{formatDate(appointment.date)}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{appointment.type}</td>
                            <td className="p-4 align-middle">{getStatusBadge(appointment.status)}</td>
                            <td className="p-4 align-middle">${appointment.fee}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <User className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                {appointment.status === "upcoming" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-green-500 hover:text-green-500 hover:bg-green-500/10"
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Complete
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Cancel
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="h-24 text-center">
                            No appointments found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper component for the Label
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium mb-1.5">{children}</p>
}
