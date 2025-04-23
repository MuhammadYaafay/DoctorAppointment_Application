import { Calendar, Users, DollarSign, TrendingUp, Activity, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for the dashboard
const dashboardData = {
  totalPatients: 248,
  totalAppointments: 567,
  completedAppointments: 423,
  cancelledAppointments: 32,
  revenue: 42500,
  patientsGrowth: 12,
  appointmentsGrowth: 18,
  revenueGrowth: 15,
  upcomingAppointments: [
    {
      id: "1",
      patientName: "John Smith",
      date: "2023-10-15",
      time: "09:00 AM",
      status: "confirmed",
      type: "New Patient",
    },
    {
      id: "2",
      patientName: "Emily Davis",
      date: "2023-10-15",
      time: "10:30 AM",
      status: "confirmed",
      type: "Follow-up",
    },
    {
      id: "3",
      patientName: "Robert Wilson",
      date: "2023-10-15",
      time: "11:45 AM",
      status: "confirmed",
      type: "New Patient",
    },
    {
      id: "4",
      patientName: "Sarah Johnson",
      date: "2023-10-16",
      time: "09:15 AM",
      status: "confirmed",
      type: "Follow-up",
    },
    {
      id: "5",
      patientName: "Michael Brown",
      date: "2023-10-16",
      time: "02:00 PM",
      status: "confirmed",
      type: "New Patient",
    },
  ],
  recentEarnings: [
    {
      id: "1",
      patientName: "John Smith",
      date: "2023-10-10",
      amount: 150,
      appointmentType: "New Patient",
    },
    {
      id: "2",
      patientName: "Emily Davis",
      date: "2023-10-09",
      amount: 120,
      appointmentType: "Follow-up",
    },
    {
      id: "3",
      patientName: "Robert Wilson",
      date: "2023-10-08",
      amount: 150,
      appointmentType: "New Patient",
    },
    {
      id: "4",
      patientName: "Sarah Johnson",
      date: "2023-10-07",
      amount: 120,
      appointmentType: "Follow-up",
    },
    {
      id: "5",
      patientName: "Michael Brown",
      date: "2023-10-06",
      amount: 150,
      appointmentType: "New Patient",
    },
  ],
}

export function DoctorDashboard() {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your doctor dashboard. Here's an overview of your practice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((dashboardData.completedAppointments / dashboardData.totalAppointments) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span>{dashboardData.completedAppointments} completed</span>
              <span className="mx-1">•</span>
              <span>{dashboardData.cancelledAppointments} cancelled</span>
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
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(appointment.date)}</span>
                      <span className="mx-1">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500/10 text-green-500`}
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
            <CardTitle>Recent Earnings</CardTitle>
            <CardDescription>Your recent appointment payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentEarnings.map((earning) => (
                <div
                  key={earning.id}
                  className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{earning.patientName}</p>
                    <p className="text-xs text-muted-foreground">{earning.appointmentType}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(earning.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-teal-500">${earning.amount}</p>
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
