"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const specialties = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "Psychiatry",
  "Ophthalmology",
  "Dentistry",
]

const availabilities = ["Available Today", "Available Tomorrow", "Available This Week", "Available Next Week"]

export function DoctorFilters() {
  const [priceRange, setPriceRange] = useState([50, 300])
  const [experienceRange, setExperienceRange] = useState([0, 30])

  return (
    <div className="sticky top-20 rounded-xl border border-border/40 bg-card p-5">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search doctors..." className="pl-9" />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["specialty", "availability", "price", "experience"]}>
        <AccordionItem value="specialty">
          <AccordionTrigger>Specialty</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {specialties.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox id={`specialty-${specialty}`} />
                  <Label htmlFor={`specialty-${specialty}`} className="text-sm font-normal">
                    {specialty}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availabilities.map((availability) => (
                <div key={availability} className="flex items-center space-x-2">
                  <Checkbox id={`availability-${availability}`} />
                  <Label htmlFor={`availability-${availability}`} className="text-sm font-normal">
                    {availability}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[50, 300]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 30]}
                max={40}
                step={1}
                value={experienceRange}
                onValueChange={setExperienceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">{experienceRange[0]} years</span>
                <span className="text-sm">{experienceRange[1]} years</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-3">
        <Button className="w-full bg-teal-600 hover:bg-teal-700">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
