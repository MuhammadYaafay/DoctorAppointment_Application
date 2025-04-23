import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { SpecialtyMenu } from "@/components/specialty-menu"
import { FeaturedDoctors } from "@/components/featured-doctors"
import { ServiceBenefits } from "@/components/service-benefits"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SpecialtyMenu />
        <FeaturedDoctors />
        <ServiceBenefits />
      </main>
      <Footer />
    </div>
  )
}
