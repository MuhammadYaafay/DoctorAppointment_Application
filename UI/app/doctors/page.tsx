import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DoctorCard } from "@/components/doctor-card"
import { DoctorFilters } from "@/components/doctor-filters"
import { Pagination } from "@/components/pagination"

// Sample data for doctors
const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 12,
    rating: 4.9,
    reviews: 124,
    fee: 150,
    image: "../../../public/doc2.png?height=300&width=300",
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
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Dermatology",
    experience: 8,
    rating: 4.6,
    reviews: 87,
    fee: 160,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Today",
  },
  {
    id: "6",
    name: "Dr. Robert Garcia",
    specialty: "General Medicine",
    experience: 20,
    rating: 4.8,
    reviews: 175,
    fee: 130,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Tomorrow",
  },
  {
    id: "7",
    name: "Dr. Amanda Patel",
    specialty: "Gynecology",
    experience: 14,
    rating: 4.9,
    reviews: 142,
    fee: 170,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available Today",
  },
  {
    id: "8",
    name: "Dr. David Kim",
    specialty: "Psychiatry",
    experience: 12,
    rating: 4.7,
    reviews: 93,
    fee: 190,
    image: "/placeholder.svg?height=300&width=300",
    availability: "Available in 3 Days",
  },
]

export default function DoctorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-accent/20 py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Find Doctors</h1>
            <p className="text-muted-foreground">
              Browse through our extensive list of qualified healthcare professionals.
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DoctorFilters />
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination totalPages={5} currentPage={1} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
