import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-background to-background/80">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597807037496-c56a1d8bc29a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Health, <span className="text-teal-500">Our Priority</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Book appointments with top doctors online, manage your health records, and get the care you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
                <Link href="/doctors">Find Doctors</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden border border-border/40 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Doctor with patient"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background border border-border/40 rounded-xl p-4 shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Trusted by</p>
                  <p className="text-2xl font-bold">10,000+</p>
                  <p className="text-xs text-muted-foreground">Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
