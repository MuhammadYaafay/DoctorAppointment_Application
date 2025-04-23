"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"

// Sample appointments data
const appointmentsData = [
  {
    id: "1",
    patientName: "John Smith",
    patientEmail: "john.smith@example.com",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiology",
    date: "2023-10-15",
    time: "09:00 AM",
    status: "confirmed",
    paymentStatus: "paid",
    fee: 150,
  },
  {
    id: "2",
    patientName: "Emily Davis",
    patientEmail: "emily.davis@example.com",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurology",
    date: "2023-10-15",
    time: "10:30 AM",
    status: "confirmed",
    paymentStatus: "paid",
    fee: 180,
  },
  {
    id: "3",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@example.com",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Pediatrics",
    date: "2023-10-15",
    time: "11:45 AM",
    status: "pending",
    paymentStatus: "pending",
    fee: 120,
  },
  {
    id: "4",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.johnson@example.com",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Orthopedics",
    date: "2023-10-16",
    time: "09:15 AM",
    status: "confirmed",
    paymentStatus: "paid",
    fee: 200,
  },
  {
    id: "5",
    patientName: "Michael Brown",
    patientEmail: "michael.brown@example.com",
    doctorName: "Dr. Lisa Thompson",
    doctorSpecialty: "Dermatology",
    date: "2023-10-16",
    time: "02:00 PM",
    status: "cancelled",
    paymentStatus: "refunded",
    fee: 160,
  },
  {
    id: "6",
    patientName: "Jennifer Lee",
    patientEmail: "jennifer.lee@example.com",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiology",
    date: "2023-10-17",
    time: "11:00 AM",
    status: "confirmed",
    paymentStatus: "paid",
    fee: 150,
  },
  {
    id: "7",
    patientName: "David Miller",
    patientEmail: "david.miller@example.com",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurology",
    date: "2023-10-17",
    time: "03:30 PM",
    status: "confirmed",
    paymentStatus: "pending",
    fee: 180,
  },
]

export function AdminAppointments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const filteredAppointments = appointmentsData.filter((appointment) => {
    // Search filter
    const searchMatch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patientEmail.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const statusMatch = statusFilter === "all" || appointment.status === statusFilter

    // Payment filter
    const paymentMatch = paymentFilter === "all" || appointment.paymentStatus === paymentFilter

    return searchMatch && statusMatch && paymentMatch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      case "completed":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "refunded":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Appointments</h1>
        <p className="text-muted-foreground">View and manage all appointments in the system</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient, doctor, or email..."
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payment</Label>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
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
          <CardTitle>All Appointments</CardTitle>
          <CardDescription>A list of all appointments in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Patient</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Doctor</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Payment</th>
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
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <p>{appointment.doctorName}</p>
                            <p className="text-xs text-muted-foreground">{appointment.doctorSpecialty}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <p>{formatDate(appointment.date)}</p>
                            <p className="text-xs text-muted-foreground">{appointment.time}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{getStatusBadge(appointment.status)}</td>
                        <td className="p-4 align-middle">
                          <div>
                            {getPaymentStatusBadge(appointment.paymentStatus)}
                            <p className="text-xs text-muted-foreground mt-1">${appointment.fee}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {appointment.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-green-500 hover:text-green-500 hover:bg-green-500/10"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            )}
                            {(appointment.status === "pending" || appointment.status === "confirmed") && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-red-500 hover:text-red-500 hover:bg-red-500/10"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                            {appointment.status === "confirmed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-blue-500 hover:text-blue-500 hover:bg-blue-500/10"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
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
        </CardContent>
      </Card>
    </div>
  )
}

// Helper component for the Label
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium mb-1.5">{children}</p>
}
