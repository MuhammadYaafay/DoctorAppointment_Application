import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  reviews: number
  fee: number
  image: string
  availability: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card overflow-hidden hover:border-teal-500/50 hover:shadow-md transition-all group">
      <div className="relative">
        <img
          src={doctor.image || "/placeholder.svg?height=300&width=300"}
          alt={doctor.name}
          className="w-full h-48 object-cover object-center"
        />
        <Badge className="absolute bottom-2 right-2 bg-teal-600 hover:bg-teal-700" variant="secondary">
          {doctor.availability}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-teal-500 transition-colors">{doctor.name}</h3>
        <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
        <div className="flex items-center mt-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
            <span className="font-medium">{doctor.rating}</span>
          </div>
          <span className="text-muted-foreground text-xs mx-2">•</span>
          <span className="text-muted-foreground text-sm">{doctor.reviews} reviews</span>
          <span className="text-muted-foreground text-xs mx-2">•</span>
          <span className="text-muted-foreground text-sm">{doctor.experience} yrs exp</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-sm text-muted-foreground">Consultation Fee</span>
            <p className="font-semibold">${doctor.fee}</p>
          </div>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700" asChild>
            <Link href={`/doctors/${doctor.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
