import { Clock, Calendar, CreditCard, ShieldCheck, MessageSquare, Award } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Quick Appointments",
    description: "Book appointments in less than 2 minutes and save your valuable time.",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Manage all your appointments in one place with our intuitive calendar.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options with end-to-end encryption for your security.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Doctors",
    description: "All our doctors are verified professionals with proven expertise.",
  },
  {
    icon: MessageSquare,
    title: "Online Consultation",
    description: "Get medical advice from the comfort of your home via video calls.",
  },
  {
    icon: Award,
    title: "Quality Care",
    description: "We ensure the highest standards of healthcare for all our patients.",
  },
]

export function ServiceBenefits() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose MediBook</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a seamless healthcare experience with numerous benefits for our patients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border/40 bg-card hover:border-teal-500/50 hover:shadow-md transition-all group"
            >
              <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-500 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
