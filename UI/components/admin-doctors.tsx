"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AddDoctorDialog } from "@/components/add-doctor-dialog";
import { useAuth } from "@/context/authContext";
import { apiRequest } from "@/utils/apiUtils";

interface doctorsData {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  image: string;
  is_approved: boolean;
}

export function AdminDoctors() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDoctorDialog, setShowAddDoctorDialog] = useState(false);
  const [doctors, setDoctors] = useState<doctorsData[]>([]);

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiRequest<doctorsData[]>("/api/admin/doctors", {
          method: "GET",
          authenticated: true,
        });
        setDoctors(response);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle approving a doctor
  const handleApproveDoctor = async (doctorId: string) => {
    try {
      const response = await apiRequest<doctorsData>(
        `/api/admin/doctors/${doctorId}/approve`,
        {
          authenticated: true,
          method: "PATCH",
        }
      );

      if (response) {
        setDoctors(
          doctors.map((doctor) =>
            doctor.id === doctorId
              ? { ...doctor, is_approved: true } // Directly set to true (approve)
              : doctor
          )
        );
      } else {
        console.error("Error approving doctor");
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  // Handle deleting a doctor
  const handleDeleteDoctor = async (doctorId: string) => {
    try {
      const response = await apiRequest<doctorsData>(
        `/api/admin/doctors/${doctorId}/reject`,
        {
          authenticated: true,
          method: "DELETE",
        }
      );

      if (response) {
        setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
      } else {
        console.error("Error deleting doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Doctors</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove doctors from the system
          </p>
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
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Doctor
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Specialty
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Contact
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Fee
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Status
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Actions
                    </th>
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
                              <AvatarImage
                                src={doctor.image}
                                alt={doctor.name}
                              />
                              <AvatarFallback>
                                {doctor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{doctor.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doctor.experience} years exp • {doctor.rating}{" "}
                                rating
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{doctor.specialty}</td>
                        <td className="p-4 align-middle">
                          <p className="text-xs">{doctor.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {doctor.phone}
                          </p>
                        </td>
                        <td className="p-4 align-middle">${doctor.fee}</td>

                        {/* STATUS COLUMN */}
                        <td className="p-4 align-middle">
                          <Badge
                            variant="outline"
                            className={
                              doctor.is_approved
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"
                                : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500"
                            }
                          >
                            {doctor.is_approved ? "Approved" : "Pending"}
                          </Badge>
                        </td>

                        {/* ACTIONS COLUMN */}
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {/* Show Approve button only if not approved */}
                            {!doctor.is_approved && (
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() =>
                                  handleApproveDoctor(doctor.id)
                                }
                              >
                                Approve
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="outline"
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

      <AddDoctorDialog
        open={showAddDoctorDialog}
        onOpenChange={setShowAddDoctorDialog}
      />
    </div>
  );
}
