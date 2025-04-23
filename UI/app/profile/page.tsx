"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/authContext"
import { apiRequest } from "@/utils/apiUtils"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

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
    specialization?: string;
    experience?: number;
    fee?: number;
  };
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev!,
      [field]: value,
    }))
  }

  const handleMedicalHistoryChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev!,
      medicalHistory: {
        ...prev!.medicalHistory,
        [field]: value,
      },
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-accent/20 py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and medical history</p>
          </div>
        </div>

        <div className="container py-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile picture</CardDescription>
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
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    {user?.role === "doctor" && profileData.doctorDetails && (
                      <div className="pt-4 border-t border-border/40">
                        <h3 className="text-lg font-medium mb-4">Doctor Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="specialization">Specialization</Label>
                            <Input
                              id="specialization"
                              value={profileData.doctorDetails.specialization || ""}
                              onChange={(e) => handleInputChange("specialization", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input
                              id="experience"
                              type="number"
                              value={profileData.doctorDetails.experience || ""}
                              onChange={(e) => handleInputChange("experience", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fee">Consultation Fee (USD)</Label>
                            <Input
                              id="fee"
                              type="number"
                              value={profileData.doctorDetails.fee || ""}
                              onChange={(e) => handleInputChange("fee", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medical">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Your medical information helps doctors provide better care</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit Medical History
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        placeholder="List any allergies you have"
                        value={profileData.medicalHistory?.allergies || ""}
                        onChange={(e) => handleMedicalHistoryChange("allergies", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chronic-conditions">Chronic Conditions</Label>
                      <Textarea
                        id="chronic-conditions"
                        placeholder="List any chronic conditions"
                        value={profileData.medicalHistory?.chronicConditions || ""}
                        onChange={(e) => handleMedicalHistoryChange("chronicConditions", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        placeholder="List any medications you're currently taking"
                        value={profileData.medicalHistory?.currentMedications || ""}
                        onChange={(e) => handleMedicalHistoryChange("currentMedications", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surgeries">Past Surgeries</Label>
                      <Textarea
                        id="surgeries"
                        placeholder="List any past surgeries with dates"
                        value={profileData.medicalHistory?.pastSurgeries || ""}
                        onChange={(e) => handleMedicalHistoryChange("pastSurgeries", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
