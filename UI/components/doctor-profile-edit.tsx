"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/authContext"
import { apiRequest } from "@/utils/apiUtils"
import { Footer } from "./footer"
import { Header } from "./header"
import { Skeleton } from "./ui/skeleton"

// Sample doctor data
// const doctorData = {
//   name: "Dr. Sarah Johnson",
//   specialty: "Cardiology",
//   email: "sarah.johnson@example.com",
//   phone: "+1 (555) 123-4567",
//   experience: 12,
//   fee: 150,
//   avatar: "/placeholder.svg?height=200&width=200",
//   about:
//     "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation. Dr. Johnson is known for her patient-centered approach and dedication to providing comprehensive cardiac care.",
//   education: [
//     { degree: "MD in Cardiology", institution: "Harvard Medical School", year: "2008" },
//     { degree: "MBBS", institution: "Johns Hopkins University", year: "2004" },
//   ],
//   certifications: [
//     "American Board of Internal Medicine",
//     "American College of Cardiology",
//     "Advanced Cardiac Life Support (ACLS)",
//   ],
//   languages: ["English", "Spanish"],
//   address: "123 Medical Plaza, Suite 456, New York, NY 10001",
//   workingHours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
//   isAvailable: true,
//   services: [
//     "Cardiac Consultation",
//     "Echocardiography",
//     "Stress Testing",
//     "Holter Monitoring",
//     "Cardiac Rehabilitation",
//     "Preventive Cardiology",
//   ],
// }

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  medicalHistory?: {
    allergies?: string;
    chronicConditions?: string;
    currentMedications?: string;
    pastSurgeries?: string;
  };
  doctorDetails?: {
    specialty?: string;
    experience?: number;
    fee?: number;
  };
}

export function DoctorProfile() {
  const {user} = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await apiRequest("/api/auth/profile", {
          authenticated: true,
        }) as ProfileData
        setProfileData(data)
      } catch (error) {
        console.error("Error fetching profile data:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProfileData()
    }
  }, [user])

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev!,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    try {
      await apiRequest("/api/auth/updateProfile", {
        method: "PUT",
        body: profileData,
        authenticated: true,
      })
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="space-y-8">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full md:col-span-2" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground">Unable to load profile data. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your professional information and availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your professional photo</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full">
              Upload New Picture
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              Recommended: Square image, at least 300x300 pixels
            </p>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your professional details</CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing || isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select
                      disabled={!isEditing || isSaving}
                      value={profileData.doctorDetails.specialty || ""}
                      onValueChange={(value) => handleInputChange("specialty", value)}
                    >
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="General Medicine">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing || isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing || isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={profileData.doctorDetails.experience.toString()}
                      onChange={(e) => handleInputChange("experience", Number.parseInt(e.target.value))}
                      disabled={!isEditing || isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee">Consultation Fee ($)</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={profileData.doctorDetails.fee.toString()}
                      onChange={(e) => handleInputChange("fee", Number.parseInt(e.target.value))}
                      disabled={!isEditing || isSaving}
                    />
                  </div>
                </div>
              </TabsContent>
{/* 
              <TabsContent value="professional" className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="services">Services Offered</Label>
                  <Textarea
                    id="services"
                    rows={4}
                    value={profileData.services.join("\n")}
                    onChange={(e) => handleInputChange("services", e.target.value.split("\n"))}
                    disabled={!isEditing || isSaving}
                    placeholder="Enter each service on a new line"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education & Qualifications</Label>
                  <Textarea
                    id="education"
                    rows={4}
                    value={profileData.education
                      .map((edu) => `${edu.degree}, ${edu.institution}, ${edu.year}`)
                      .join("\n")}
                    disabled={!isEditing || isSaving}
                    placeholder="Format: Degree, Institution, Year (one per line)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    rows={3}
                    value={profileData.certifications.join("\n")}
                    onChange={(e) => handleInputChange("certifications", e.target.value.split("\n"))}
                    disabled={!isEditing || isSaving}
                    placeholder="Enter each certification on a new line"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages Spoken</Label>
                  <Input
                    id="languages"
                    value={profileData.languages.join(", ")}
                    onChange={(e) => handleInputChange("languages", e.target.value.split(", "))}
                    disabled={!isEditing || isSaving}
                    placeholder="Separate languages with commas"
                  />
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <Textarea
                    id="working-hours"
                    rows={4}
                    value={profileData.workingHours}
                    onChange={(e) => handleInputChange("workingHours", e.target.value)}
                    disabled={!isEditing || isSaving}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="availability">Availability Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle this to show if you're currently accepting new appointments
                    </p>
                  </div>
                  <Switch
                    id="availability"
                    checked={profileData.isAvailable}
                    onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
                    disabled={!isEditing || isSaving}
                  />
                </div> */}
              {/* </TabsContent> */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
