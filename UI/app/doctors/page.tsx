'use client'

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DoctorCard } from "@/components/doctor-card";
import { DoctorFilters } from "@/components/doctor-filters";
import { Pagination } from "@/components/pagination";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/apiUtils";
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

export default function DoctorsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<Doctor[]>([]); // Array of doctors
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await apiRequest("/api/doctor/", {
          authenticated: true,
        }) as Doctor[];
        setData(response);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-accent/20 py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Find Doctors</h1>
            <p className="text-muted-foreground">
              Browse through our extensive list of qualified healthcare
              professionals.
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DoctorFilters />
            </div>
            <div className="lg:col-span-3">
              {isLoading ? (
                <div>Loading doctors...</div>
              ) : data.length === 0 ? (
                <div>No doctors found</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                  <div className="mt-8">
                    <Pagination totalPages={5} currentPage={1} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
