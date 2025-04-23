"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AddDoctorDialog } from "@/components/add-doctor-dialog"

// Sample doctors data
const doctorsData = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    experience: 12,
    rating: 4.9,
    reviews: 124,
    fee: 150,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    experience: 15,
    rating: 4.8,
    reviews: 98,
    fee: 180,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    experience: 10,
    rating: 4.7,
    reviews: 156,
    fee: 120,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    email: "james.wilson@example.com",
    phone: "+1 (555) 456-7890",
    experience: 18,
    rating: 4.9,
    reviews: 210,
    fee: 200,
    image: "/placeholder.svg?height=100&width=100",
    isActive: false,
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Dermatology",
    email: "lisa.thompson@example.com",
    phone: "+1 (555) 567-8901",
    experience: 8,
    rating: 4.6,
    reviews: 87,
    fee: 160,
    image: "/placeholder.svg?height=100&width=100",
    isActive: true,
  },
]

export function AdminDoctors() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDoctorDialog, setShowAddDoctorDialog] = useState(false)
  const [doctors, setDoctors] = useState(doctorsData)

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleDoctorStatus = (doctorId: string) => {
    setDoctors(doctors.map((doctor) => (doctor.id === doctorId ? { ...doctor, isActive: !doctor.isActive } : doctor)))
  }

  const handleDeleteDoctor = (doctorId: string) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== doctorId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Doctors</h1>
          <p className="text-muted-foreground">Add, edit, or remove doctors from the system</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
          onClick={() => setShowAddDoctorDialog(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add New Doctor</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name, specialty, or email..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctors</CardTitle>
          <CardDescription>A list of all doctors in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Doctor</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Specialty</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Fee</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <tr
                        key={doctor.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={doctor.image} alt={doctor.name} />
                              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{doctor.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doctor.experience} years exp • {doctor.rating} rating
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{doctor.specialty}</td>
                        <td className="p-4 align-middle">
                          <p className="text-xs">{doctor.email}</p>
                          <p className="text-xs text-muted-foreground">{doctor.phone}</p>
                        </td>
                        <td className="p-4 align-middle">${doctor.fee}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center space-x-2">
                            <Switch checked={doctor.isActive} onCheckedChange={() => toggleDoctorStatus(doctor.id)} />
                            <Badge
                              variant="outline"
                              className={
                                doctor.isActive
                                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"
                                  : "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
                              }
                            >
                              {doctor.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10"
                              onClick={() => handleDeleteDoctor(doctor.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="h-24 text-center">
                        No doctors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog open={showAddDoctorDialog} onOpenChange={setShowAddDoctorDialog} />
    </div>
  )
}
