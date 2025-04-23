import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DoctorCard } from "@/components/doctor-card"

// Sample data for featured doctors
const featuredDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 12,
    rating: 4.9,
    reviews: 124,
    fee: 150,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Today",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: 15,
    rating: 4.8,
    reviews: 98,
    fee: 180,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Tomorrow",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    experience: 10,
    rating: 4.7,
    reviews: 156,
    fee: 120,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Today",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    experience: 18,
    rating: 4.9,
    reviews: 210,
    fee: 200,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available in 2 Days",
  },
]

export function FeaturedDoctors() {
  return (
    <section className="py-16 bg-accent/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Doctors</h2>
            <p className="text-muted-foreground max-w-2xl">
              Our top-rated specialists with exceptional patient satisfaction and expertise.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700" asChild>
            <Link href="/doctors">View All Doctors</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  )
}
