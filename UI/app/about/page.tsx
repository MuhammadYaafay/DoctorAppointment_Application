import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Clock, Shield, Users, Award, CheckCircle, Calendar, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-accent/20 py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  About <span className="text-teal-500">MediBook</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  We're on a mission to make healthcare accessible, convenient, and personalized for everyone.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700" size="lg" asChild>
                  <Link href="/doctors">Find a Doctor</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden border border-border/40 shadow-xl">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Medical team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                At MediBook, we believe that everyone deserves access to quality healthcare without the hassle. Our
                platform connects patients with qualified healthcare professionals, making it easy to book appointments,
                manage medical records, and receive personalized care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl border border-border/40 p-6 hover:border-teal-500/50 hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Patient-Centered Care</h3>
                <p className="text-muted-foreground">
                  We put patients first, ensuring that every aspect of our service is designed to provide the best
                  possible healthcare experience.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/40 p-6 hover:border-teal-500/50 hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Convenience & Efficiency</h3>
                <p className="text-muted-foreground">
                  We streamline the healthcare process, saving you time and reducing the stress associated with managing
                  your health.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/40 p-6 hover:border-teal-500/50 hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality & Trust</h3>
                <p className="text-muted-foreground">
                  We verify all healthcare providers on our platform, ensuring that you receive care from qualified and
                  trusted professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-accent/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose MediBook</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of features designed to make healthcare management simple and
                effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Easy Appointment Booking</h3>
                  <p className="text-muted-foreground">
                    Book appointments with your preferred doctors in just a few clicks, with real-time availability and
                    instant confirmation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Verified Doctors</h3>
                  <p className="text-muted-foreground">
                    All healthcare providers on our platform are thoroughly verified, ensuring you receive care from
                    qualified professionals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Patient Reviews</h3>
                  <p className="text-muted-foreground">
                    Read authentic reviews from other patients to help you choose the right healthcare provider for your
                    needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure Medical Records</h3>
                  <p className="text-muted-foreground">
                    Keep your medical history, prescriptions, and test results in one secure place, accessible whenever
                    you need them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our dedicated team of healthcare professionals, technologists, and customer support specialists work
                together to provide you with the best possible healthcare experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Emily Chen",
                  role: "Chief Medical Officer",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Michael Johnson",
                  role: "Chief Technology Officer",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Sarah Williams",
                  role: "Head of Patient Experience",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "David Rodriguez",
                  role: "Director of Provider Relations",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border/40 overflow-hidden hover:border-teal-500/50 hover:shadow-md transition-all"
                >
                  <div className="aspect-square">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-accent/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what patients and doctors have to say about MediBook.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "MediBook has transformed how I manage my healthcare. Booking appointments is now quick and hassle-free.",
                  author: "Jennifer L.",
                  role: "Patient",
                },
                {
                  quote:
                    "As a doctor, MediBook has helped me streamline my practice and connect with patients more efficiently.",
                  author: "Dr. Robert K.",
                  role: "Cardiologist",
                },
                {
                  quote:
                    "I love being able to read reviews before choosing a doctor. It's made finding the right specialist so much easier.",
                  author: "Thomas M.",
                  role: "Patient",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border/40 p-6 hover:border-teal-500/50 hover:shadow-md transition-all"
                >
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-500/20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
                      <span className="font-semibold text-sm">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="bg-card rounded-xl border border-border/40 p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex h-12 w-12 rounded-full bg-teal-500/10 items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-teal-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Ready to experience better healthcare?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of patients who have simplified their healthcare journey with MediBook.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
                    <Link href="/register">Create an Account</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/doctors">Find a Doctor</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
