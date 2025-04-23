import { Calendar, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Appointment {
  id: string
  doctorName: string
  doctorSpecialty: string
  doctorImage: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  fee: number
}

interface AppointmentCardProps {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500 hover:bg-blue-600"
      case "completed":
        return "bg-green-500 hover:bg-green-600"
      case "cancelled":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500 hover:bg-green-600"
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "refunded":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="rounded-xl border border-border/40 bg-card overflow-hidden hover:border-teal-500/50 hover:shadow-md transition-all">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
            <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-grow space-y-1">
            <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
            <p className="text-muted-foreground">{appointment.doctorSpecialty}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-teal-500" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-teal-500" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 mr-1 text-teal-500" />
                <span>${appointment.fee}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <div className="flex gap-2">
              <Badge className={getStatusColor(appointment.status)}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
              <Badge className={getPaymentStatusColor(appointment.paymentStatus)}>
                {appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}
              </Badge>
            </div>

            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline">
                View Details
              </Button>

              {appointment.status === "upcoming" && (
                <>
                  {appointment.paymentStatus === "pending" && (
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      Pay Now
                    </Button>
                  )}
                  <Button size="sm" variant="destructive">
                    Cancel
                  </Button>
                </>
              )}

              {appointment.status === "completed" && (
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  Book Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
