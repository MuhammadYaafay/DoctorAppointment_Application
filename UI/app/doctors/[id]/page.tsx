'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/context/authContext"
import { apiRequest } from "@/utils/apiUtils"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DoctorProfile } from "@/components/doctor-profile"
import { AppointmentBooking } from "@/components/appointment-booking"
import { DoctorReviews } from "@/components/doctor-reviews"
import { RelatedDoctors } from "@/components/related-doctors"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DoctorData{
  id: string,
  name: string,
  specialty: string,
  experience: number,
  rating: number,
  reviews: number,
  fee: number,
  image: string,
}

export default function DoctorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [doctor, setDoctor] = useState<DoctorData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await apiRequest<DoctorData>(`/api/doctor/${id}`, { authenticated: true })
        setDoctor(data)
      } catch (error) {
        toast.error((error as Error).message || "Failed to load doctor details")
      } finally {
        setIsLoading(false)
      }
    }
    if (user) fetchDoctor()
  }, [user, id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">Loading doctor details...</main>
        <Footer />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">Doctor not found</main>
        <Footer />
      </div>
    )
  }

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
                  {/* <div>
                    <h3 className="text-lg font-semibold mb-2">About Dr. {doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.about}</p>
                  </div> */}

                  {/* <div>
                    <h3 className="text-lg font-semibold mb-2">Services</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {doctor.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* <div>
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
                  </div> */}

                  {/* <div>
                    <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                    <ul className="space-y-1">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <DoctorReviews doctorId={doctor.id} />
                </TabsContent>

                <TabsContent value="location" className="mt-4">
                  <div className="space-y-4">
                    {/* <div>
                      <h3 className="text-lg font-semibold mb-2">Clinic Address</h3>
                      <p className="text-muted-foreground">
                        {doctor.location.address}
                        <br />
                        {doctor.location.city}, {doctor.location.state} {doctor.location.zipCode}
                      </p>
                    </div> */}

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
