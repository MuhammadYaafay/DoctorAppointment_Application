import { DoctorCard } from "@/components/doctor-card"
import { useAuth } from "@/context/authContext";
import { apiRequest } from "@/utils/apiUtils";
import { useEffect, useState } from "react"
import { toast } from "sonner";


interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  fee: number;
  rating: number;
  reviews: number;
  availability: string[];
  image?: string;
}

interface RelatedDoctorsProps {
  currentDoctorId: string
  specialty: string
}

export function RelatedDoctors({ currentDoctorId, specialty }: RelatedDoctorsProps) {
  const {user} = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [relatedDoctors, setRelatedDoctors] = useState<Doctor[]>([])
  // Filter out the current doctor
  const filteredDoctors = relatedDoctors.filter((doctor) => doctor.id !== currentDoctorId)

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = (await apiRequest("/api/doctor/", {
          authenticated: true,
        })) as Doctor[];
        setRelatedDoctors(response);
      } catch (error) {
        toast.error("Failed to load doctors");
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDoctorData();
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Other {specialty} Specialists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  )
}
