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
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "react-day-picker"
import { Award, Clock, GraduationCap, MapPin, Stethoscope } from "lucide-react"

interface DoctorData{
  id: string,
  name: string,
  specialty: string,
  experience: number,
  rating?: number| null,
  reviews?: number| null,
  fee: number,
  image?: string| null,
  about?: string| null,
  services?: string[]| null,
  education?: {
    degree: string,
    institution: string,
    year: number
  }[]| null,
  certifications?: string[]| null,
  location?: {
    address: string,
    city: string,
    state: string,
    zipCode: string
  }| null,
  available_slots?: {
    day: string,
    slots: string[]
  }[]| null,
  is_approved: boolean
  availability?: string| null;
  languages?: string[] | null;
}

export default function DoctorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [doctor, setDoctor] = useState<DoctorData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await apiRequest<DoctorData>(`/api/doctor/${id}`, { authenticated: true })
        setDoctor(data)
      } catch (error) {
        toast.error("Failed to load doctor details", {
          description: (error as Error).message || "Please try again later",
        })
      } finally {
        setIsLoading(false)
      }
    }
    if (id) fetchDoctor()
  }, [id, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex gap-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              
              <Tabs defaultValue="about">
                <TabsList>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6 space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Doctor Not Found</h2>
            <p className="text-muted-foreground">
              The doctor you're looking for doesn't exist or may have been removed
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/doctors'}>
              Browse Doctors
            </Button>
          </div>
        </main>
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

              <Tabs 
                defaultValue="about" 
                className="mt-8"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6 space-y-8">
                  {doctor.about && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Stethoscope className="h-5 w-5" />
                        About Dr. {doctor.name}
                      </h3>
                      <p className="text-muted-foreground">{doctor.about}</p>
                    </div>
                  )}

                  {doctor.services?.length ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Services
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {doctor.services.map((service, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-teal-500 mr-2" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {doctor.education?.length ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                      </h3>
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
                  ) : null}

                  {doctor.certifications?.length ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                      </h3>
                      <ul className="space-y-1">
                        {doctor.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-teal-500 mr-2" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {doctor.languages?.length ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Languages Spoken</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-accent rounded-full text-sm"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <DoctorReviews doctorId={doctor.id} />
                </TabsContent>

                <TabsContent value="location" className="mt-6">
                  {doctor.location ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Clinic Address
                        </h3>
                        <address className="not-italic text-muted-foreground">
                          {doctor.location.address}
                          <br />
                          {doctor.location.city}, {doctor.location.state} {doctor.location.zipCode}
                        </address>
                      </div>

                      <div className="aspect-video rounded-lg overflow-hidden border border-border/40">
                        {/* Map integration would go here */}
                        <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                          <span className="text-muted-foreground">
                            Map of {doctor.location.city}, {doctor.location.state}
                          </span>
                        </div>
                      </div>

                      {doctor.availability && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Availability
                          </h3>
                          <p className="text-muted-foreground">{doctor.availability}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Location information not available</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1 sticky top-4 h-fit">
              <AppointmentBooking 
                doctor={doctor} 
                key={activeTab} // Force re-render when tab changes
              />
            </div>
          </div>

          <div className="mt-12">
            <RelatedDoctors 
              currentDoctorId={doctor.id} 
              specialty={doctor.specialty} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
