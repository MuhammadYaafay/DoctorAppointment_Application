import Link from "next/link"
import {
  Heart,
  Brain,
  Stethoscope,
  Eye,
  Bone,
  Thermometer,
  Baby,
  Pill,
  Scissors,
  SmileIcon as Tooth,
} from "lucide-react"

const specialties = [
  { name: "Cardiology", icon: Heart, color: "text-red-500" },
  { name: "Neurology", icon: Brain, color: "text-purple-500" },
  { name: "General Medicine", icon: Stethoscope, color: "text-teal-500" },
  { name: "Ophthalmology", icon: Eye, color: "text-blue-500" },
  { name: "Orthopedics", icon: Bone, color: "text-amber-500" },
  { name: "Pediatrics", icon: Baby, color: "text-pink-500" },
  { name: "Dermatology", icon: Thermometer, color: "text-green-500" },
  { name: "Dentistry", icon: Tooth, color: "text-yellow-500" },
  { name: "Surgery", icon: Scissors, color: "text-orange-500" },
  { name: "Pharmacy", icon: Pill, color: "text-indigo-500" },
]

export function SpecialtyMenu() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Doctors by Specialty</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our extensive list of specialists to find the right doctor for your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {specialties.map((specialty) => (
            <Link
              key={specialty.name}
              href={`/doctors?specialty=${encodeURIComponent(specialty.name)}`}
              className="flex flex-col items-center p-6 rounded-xl border border-border/40 bg-card hover:border-teal-500/50 hover:shadow-md transition-all group"
            >
              <div className={`mb-3 ${specialty.color}`}>
                <specialty.icon className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium group-hover:text-teal-500 transition-colors">{specialty.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
