"use client"

import { useEffect, useState } from "react"
import { Search, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { apiRequest } from "@/utils/apiUtils"

interface patientsData{
  id: string
  name: string
  email: string
  phone: string
  registered_date: string
  total_appointments: number
  image: string
}

export function AdminPatients() {
  const [patients, setPatients] = useState<patientsData[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiRequest<patientsData[]>("/api/admin/patients", {
          method: "GET",
          authenticated: true,
        });
        setPatients(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
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
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span className="text-xs">{formatDate(patient.registered_date)}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="secondary">{patient.total_appointments}</Badge>
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
