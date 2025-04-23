import { Users, Calendar, UserRound, DollarSign, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for the dashboard
const dashboardData = {
  totalDoctors: 48,
  totalPatients: 1250,
  totalAppointments: 3567,
  revenue: 125000,
  doctorsGrowth: 12,
  patientsGrowth: 18,
  appointmentsGrowth: 24,
  revenueGrowth: 15,
  recentAppointments: [
    {
      id: "1",
      patientName: "John Smith",
      doctorName: "Dr. Sarah Johnson",
      date: "2023-10-15",
      time: "09:00 AM",
      status: "confirmed",
    },
    {
      id: "2",
      patientName: "Emily Davis",
      doctorName: "Dr. Michael Chen",
      date: "2023-10-15",
      time: "10:30 AM",
      status: "confirmed",
    },
    {
      id: "3",
      patientName: "Robert Wilson",
      doctorName: "Dr. Emily Rodriguez",
      date: "2023-10-15",
      time: "11:45 AM",
      status: "pending",
    },
    {
      id: "4",
      patientName: "Sarah Johnson",
      doctorName: "Dr. James Wilson",
      date: "2023-10-16",
      time: "09:15 AM",
      status: "confirmed",
    },
    {
      id: "5",
      patientName: "Michael Brown",
      doctorName: "Dr. Lisa Thompson",
      date: "2023-10-16",
      time: "02:00 PM",
      status: "cancelled",
    },
  ],
  topDoctors: [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      appointments: 145,
      rating: 4.9,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      appointments: 132,
      rating: 4.8,
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      appointments: 128,
      rating: 4.7,
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      appointments: 120,
      rating: 4.9,
    },
    {
      id: "5",
      name: "Dr. Lisa Thompson",
      specialty: "Dermatology",
      appointments: 115,
      rating: 4.6,
    },
  ],
}

export function AdminDashboard() {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard. Here's an overview of your clinic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalDoctors}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.doctorsGrowth}%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalPatients}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.patientsGrowth}%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalAppointments}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.appointmentsGrowth}%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">{dashboardData.revenueGrowth}%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Latest appointments across all doctors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.doctorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(appointment.date)} at {appointment.time}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-green-500/10 text-green-500"
                          : appointment.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Doctors</CardTitle>
            <CardDescription>Doctors with the highest number of appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-teal-500 mr-1" />
                      <span className="font-medium">{doctor.appointments}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500 fill-yellow-500 mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
