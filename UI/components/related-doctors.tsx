import { DoctorCard } from "@/components/doctor-card"

// Sample related doctors data
const relatedDoctorsData = [
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    experience: 15,
    rating: 4.8,
    reviews: 98,
    fee: 180,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Tomorrow",
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Cardiology",
    experience: 8,
    rating: 4.6,
    reviews: 87,
    fee: 160,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Today",
  },
  {
    id: "9",
    name: "Dr. Richard Brown",
    specialty: "Cardiology",
    experience: 20,
    rating: 4.9,
    reviews: 145,
    fee: 200,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available in 2 Days",
  },
  {
    id: "12",
    name: "Dr. Jennifer Lee",
    specialty: "Cardiology",
    experience: 10,
    rating: 4.7,
    reviews: 112,
    fee: 170,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Today",
  },
]

interface RelatedDoctorsProps {
  currentDoctorId: string
  specialty: string
}

export function RelatedDoctors({ currentDoctorId, specialty }: RelatedDoctorsProps) {
  // Filter out the current doctor
  const filteredDoctors = relatedDoctorsData.filter((doctor) => doctor.id !== currentDoctorId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Other {specialty} Specialists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  )
}
