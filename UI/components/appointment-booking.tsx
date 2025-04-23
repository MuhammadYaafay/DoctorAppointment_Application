"use client"

import { useState } from "react"
import { Calendar, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Doctor {
  id: string
  name: string
  specialty: string
  fee: number
  availableSlots: Array<{ date: string; slots: string[] }>
}

interface AppointmentBookingProps {
  doctor: Doctor
}

export function AppointmentBooking({ doctor }: AppointmentBookingProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Get available slots for the selected date
  const getAvailableSlots = () => {
    if (!date) return []

    const formattedDate = formatDateToString(date)
    const daySlots = doctor.availableSlots.find((day) => day.date === formattedDate)

    return daySlots ? daySlots.slots : []
  }

  // Safely format a date to YYYY-MM-DD string
  const formatDateToString = (date: Date | undefined): string => {
    if (!date) return ""
    try {
      return date.toISOString().split("T")[0]
    } catch (error) {
      console.error("Invalid date:", date)
      return ""
    }
  }

  const availableSlots = getAvailableSlots()

  const handleBooking = async () => {
    if (!date || !selectedSlot) return

    setIsBooking(true)

    try {
      // In a real app, this would be an API call to save the booking
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success toast
      toast({
        title: "Appointment Booked!",
        description: `Your appointment with ${doctor.name} on ${formatDateToString(date)} at ${selectedSlot} has been confirmed.`,
        variant: "default",
      })

      // Redirect to appointments page
      router.push("/appointments")
    } catch (error) {
      // Show error toast
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  // Format date for display
  const formatDateForDisplay = (date: Date | undefined): string => {
    if (!date) return ""
    try {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>Select a date and time slot to book your appointment with {doctor.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {doctor.name} is available for the next 3 days. Please select a date to see available time slots.
          </AlertDescription>
        </Alert>

        <div>
          <div className="flex items-center mb-3">
            <Calendar className="mr-2 h-4 w-4 text-teal-500" />
            <h3 className="font-medium">Select Date</h3>
          </div>
          <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>

        <div>
          <div className="flex items-center mb-3">
            <Clock className="mr-2 h-4 w-4 text-teal-500" />
            <h3 className="font-medium">Select Time Slot</h3>
          </div>

          {availableSlots.length > 0 ? (
            <RadioGroup value={selectedSlot || ""} onValueChange={setSelectedSlot}>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                  <div key={slot}>
                    <RadioGroupItem value={slot} id={`slot-${slot}`} className="peer sr-only" />
                    <Label
                      htmlFor={`slot-${slot}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      {slot}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <div className="text-center text-muted-foreground py-4 border border-dashed rounded-md">
              <p>No slots available for the selected date.</p>
              <p className="text-sm mt-1">Please select a different date.</p>
            </div>
          )}
        </div>

        {date && selectedSlot && (
          <div className="bg-teal-500/10 p-4 rounded-md">
            <h4 className="font-medium text-teal-700 dark:text-teal-300 mb-2">Appointment Summary</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Doctor:</span> {doctor.name}
              </p>
              <p>
                <span className="text-muted-foreground">Date:</span> {formatDateForDisplay(date)}
              </p>
              <p>
                <span className="text-muted-foreground">Time:</span> {selectedSlot}
              </p>
            </div>
          </div>
        )}

        <div className="rounded-lg bg-accent/20 p-4">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Consultation Fee</span>
            <span className="font-medium">${doctor.fee}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Booking Fee</span>
            <span className="font-medium">$5</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border/40">
            <span className="font-medium">Total</span>
            <span className="font-bold">${doctor.fee + 5}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {(!date || !selectedSlot) && (
          <p className="text-sm text-muted-foreground text-center">
            Please select both a date and time slot to enable booking
          </p>
        )}
        <Button
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={!date || !selectedSlot || isBooking}
          onClick={handleBooking}
        >
          {isBooking ? "Processing..." : "Confirm Booking"}
        </Button>
      </CardFooter>
    </Card>
  )
}
