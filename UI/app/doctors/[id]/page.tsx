import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DoctorProfile } from "@/components/doctor-profile"
import { AppointmentBooking } from "@/components/appointment-booking"
import { DoctorReviews } from "@/components/doctor-reviews"
import { RelatedDoctors } from "@/components/related-doctors"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the availableSlots to include dates relative to the current date
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const dayAfterTomorrow = new Date(today)
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

const formatDateString = (date: Date) => {
  return date.toISOString().split("T")[0]
}

// Sample doctor data
const doctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  experience: 12,
  rating: 4.9,
  reviews: 124,
  fee: 150,
  image: "../../../public/doc2.png?height=300&width=300",
  availability: "Available Today",
  languages: ["English", "Spanish"],
  education: [
    { degree: "MD in Cardiology", institution: "Harvard Medical School", year: "2008" },
    { degree: "MBBS", institution: "Johns Hopkins University", year: "2004" },
  ],
  certifications: [
    "American Board of Internal Medicine",
    "American College of Cardiology",
    "Advanced Cardiac Life Support (ACLS)",
  ],
  // languages: ["English", "Spanish"],
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation. Dr. Johnson is known for her patient-centered approach and dedication to providing comprehensive cardiac care.",
  services: [
    "Cardiac Consultation",
    "Echocardiography",
    "Stress Testing",
    "Holter Monitoring",
    "Cardiac Rehabilitation",
    "Preventive Cardiology",
  ],
  location: {
    address: "123 Medical Plaza, Suite 456",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  availableSlots: [
    { date: formatDateString(today), slots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"] },
    { date: formatDateString(tomorrow), slots: ["10:00 AM", "01:00 PM", "03:30 PM"] },
    { date: formatDateString(dayAfterTomorrow), slots: ["09:30 AM", "12:00 PM", "02:30 PM", "05:00 PM"] },
  ],
}

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DoctorProfile doctor={doctor} />

              <Tabs defaultValue="about" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About Dr. {doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.about}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Services</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {doctor.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Education</h3>
                    <ul className="space-y-3">
                      {doctor.education.map((edu, index) => (
                        <li key={index} className="flex flex-col">
                          <span className="font-medium">{edu.degree}</span>
                          <span className="text-sm text-muted-foreground">
                            {edu.institution}, {edu.year}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                    <ul className="space-y-1">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <DoctorReviews doctorId={doctor.id} />
                </TabsContent>

                <TabsContent value="location" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Clinic Address</h3>
                      <p className="text-muted-foreground">
                        {doctor.location.address}
                        <br />
                        {doctor.location.city}, {doctor.location.state} {doctor.location.zipCode}
                      </p>
                    </div>

                    <div className="aspect-video rounded-lg overflow-hidden border border-border/40">
                      {/* Map placeholder */}
                      <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                        <span className="text-muted-foreground">Map View</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <AppointmentBooking doctor={doctor} />
            </div>
          </div>

          <div className="mt-12">
            <RelatedDoctors currentDoctorId={doctor.id} specialty={doctor.specialty} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
