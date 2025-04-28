"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Search, Filter, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { apiRequest } from "@/utils/apiUtils"

interface appointmentsData {
  id: string
  patient_name: string
  patient_email: string
  doctor_name: string
  specialization: string
  appointment_date: string
  appointment_time: string
  status: string
  payment_status: string
  amount: number
}


export function AdminAppointments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [appointments, setAppointments] = useState<appointmentsData[]>([])

  useEffect(()=>{
    const fetchAppointments = async () => {
      try {
        const response = await apiRequest<appointmentsData[]>("/api/admin/appointments", {
          method: "GET",
          authenticated: true,
        });
        setAppointments(response);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleConfirmAppointment: (appointmentId: string) => Promise<void> = async (appointmentId: string) => {
    try {
      await apiRequest(`/api/admin/appointments/${appointmentId}/confirm`, {
        method: "PATCH",
        authenticated: true,
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "confirmed" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  const handleCancelAppointment: (appointmentId: string) => Promise<void> = async (appointmentId: string) => {
    try {
      await apiRequest(`/api/admin/appointments/${appointmentId}/cancel`, {
        method: "PATCH",
        authenticated: true,
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const handleCompleteAppointment: (appointmentId: string) => Promise<void> = async (appointmentId: string) => {
    try {
      await apiRequest(`/api/admin/appointments/${appointmentId}/complete`, {
        method: "PATCH",
        authenticated: true,
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "completed" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const filteredAppointments = appointments.filter((appointment) => {
    // Search filter
    const searchMatch =
      appointment.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patient_email.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const statusMatch = statusFilter === "all" || appointment.status === statusFilter

    // Payment filter
    const paymentMatch = paymentFilter === "all" || appointment.payment_status === paymentFilter

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

  const getPaymentStatusBadge = (payment_status: string) => {
    switch (payment_status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "refunded":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Refunded</Badge>
      default:
        return <Badge variant="outline">{payment_status}</Badge>
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
                            <p className="font-medium">{appointment.patient_name}</p>
                            <p className="text-xs text-muted-foreground">{appointment.patient_email}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <p>{appointment.doctor_name}</p>
                            <p className="text-xs text-muted-foreground">{appointment.specialization}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <p>{formatDate(appointment.appointment_date)}</p>
                            <p className="text-xs text-muted-foreground">{appointment.appointment_time}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{getStatusBadge(appointment.status)}</td>
                        <td className="p-4 align-middle">
                          <div>
                            {getPaymentStatusBadge(appointment.payment_status)}
                            <p className="text-xs text-muted-foreground mt-1">${appointment.amount}</p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {appointment.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                className="h-8 text-green-500 hover:text-green-500 hover:bg-green-500/10"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            )}
                            {(appointment.status === "pending" || appointment.status === "confirmed") && (
                              <Button
                                variant="outline"
                                onClick={() => handleCancelAppointment(appointment.id)}
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
                                onClick={() => handleCompleteAppointment(appointment.id)}
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
