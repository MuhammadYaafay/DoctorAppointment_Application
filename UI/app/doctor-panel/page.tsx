"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { DoctorDashboard } from "@/components/doctor-dashboard"
import { DoctorAppointments } from "@/components/doctor-appointments"
import { DoctorProfile } from "@/components/doctor-profile-edit"

export default function DoctorPanelPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DoctorDashboard />
      case "appointments":
        return <DoctorAppointments />
      case "profile":
        return <DoctorProfile />
      default:
        return <DoctorDashboard />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex">
        <DoctorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow p-6 overflow-auto">{renderContent()}</div>
      </main>
      <Footer />
    </div>
  )
}
