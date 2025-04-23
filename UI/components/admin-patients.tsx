"use client"

import { useState } from "react"
import { Search, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample patients data
const patientsData = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-12",
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main St, New York, NY 10001",
    registeredDate: "2023-01-15",
    totalAppointments: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1990-03-24",
    gender: "Female",
    bloodGroup: "A+",
    address: "456 Park Ave, New York, NY 10022",
    registeredDate: "2023-02-20",
    totalAppointments: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+1 (555) 345-6789",
    dateOfBirth: "1978-11-08",
    gender: "Male",
    bloodGroup: "B-",
    address: "789 Broadway, New York, NY 10003",
    registeredDate: "2023-03-05",
    totalAppointments: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 456-7890",
    dateOfBirth: "1992-07-17",
    gender: "Female",
    bloodGroup: "AB+",
    address: "321 5th Ave, New York, NY 10016",
    registeredDate: "2023-01-30",
    totalAppointments: 3,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 567-8901",
    dateOfBirth: "1980-09-22",
    gender: "Male",
    bloodGroup: "O-",
    address: "654 Madison Ave, New York, NY 10022",
    registeredDate: "2023-04-10",
    totalAppointments: 7,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 678-9012",
    dateOfBirth: "1988-12-03",
    gender: "Female",
    bloodGroup: "A-",
    address: "987 Lexington Ave, New York, NY 10021",
    registeredDate: "2023-02-15",
    totalAppointments: 6,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function AdminPatients() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  )

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Patients</h1>
        <p className="text-muted-foreground">View and manage patient information</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, email, or phone..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">Export Data</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>A list of all registered patients in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Patient</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Age/Gender</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Blood Group</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Registered</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Appointments</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={patient.image} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{patient.address}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span className="text-xs">{patient.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span className="text-xs">{patient.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <span>{calculateAge(patient.dateOfBirth)} years</span>
                            <Badge variant="outline">{patient.gender}</Badge>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500">
                            {patient.bloodGroup}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span className="text-xs">{formatDate(patient.registeredDate)}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="secondary">{patient.totalAppointments}</Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              History
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="h-24 text-center">
                        No patients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
