import { Star, Clock, Award, Languages } from "lucide-react"
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
  languages?: string[]  // Made optional
  education?: Array<{ degree: string; institution: string; year: string }>
  certifications?: string[]  // Made optional
  about: string
  services?: string[]
  location: {
    address: string
    city: string
    state: string
    zipCode: string
  }
  availableSlots?: Array<{ date: string; slots: string[] }>
}

interface DoctorProfileProps {
  doctor: Doctor
}

export function DoctorProfile({ doctor }: DoctorProfileProps) {
  // Safe defaults for arrays
  const certifications = doctor.certifications || []
  const languages = doctor.languages || []
  const services = doctor.services || []
  const education = doctor.education || []
  const availableSlots = doctor.availableSlots || []

  return (
    <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>

          <div className="flex-grow space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{doctor.name}</h1>
                <Badge className="bg-teal-600 hover:bg-teal-700">
                  {doctor.availability || "Not Available"}
                </Badge>
              </div>
              <p className="text-muted-foreground">{doctor.specialty}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 mr-1" />
                <div>
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">
                    ({doctor.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-teal-500 mr-1" />
                <div>
                  <span className="font-medium">{doctor.experience} years</span>
                  <span className="text-muted-foreground text-sm ml-1">experience</span>
                </div>
              </div>

              <div className="flex items-center">
                <Award className="h-5 w-5 text-teal-500 mr-1" />
                <div>
                  <span className="font-medium">{certifications.length}</span>
                  <span className="text-muted-foreground text-sm ml-1">certifications</span>
                </div>
              </div>

              {languages.length > 0 && (
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-teal-500 mr-1" />
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Speaks: {languages.join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Consultation Fee</span>
                  <p className="text-xl font-semibold">${doctor.fee}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Next Available</span>
                  <p className="font-medium text-teal-500">
                    {availableSlots[0]?.slots[0] || "No availability"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}