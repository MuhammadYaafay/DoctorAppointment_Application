"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/doctor-card";
import { apiRequest } from "@/utils/apiUtils";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Pagination } from "./pagination";

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

export function FeaturedDoctors() {
  const { user } = useAuth();
  const [data, setData] = useState<Doctor[]>([]); // Array of doctors
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = (await apiRequest("/api/doctor/", {
          authenticated: true,
        })) as Doctor[];
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
    <section className="py-16 bg-accent/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Doctors</h2>
            <p className="text-muted-foreground max-w-2xl">
              Our top-rated specialists with exceptional patient satisfaction
              and expertise.
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700"
            asChild
          >
            <Link href="/doctors">View All Doctors</Link>
          </Button>
        </div>

        {isLoading ? (
          <div>Loading doctors...</div>
        ) : data.length === 0 ? (
          <div>No doctors found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
