"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminDoctors } from "@/components/admin-doctors"
import { AdminAppointments } from "@/components/admin-appointments"
import { AdminPatients } from "@/components/admin-patients"
import { AdminSettings } from "@/components/admin-settings"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />
      case "doctors":
        return <AdminDoctors />
      case "appointments":
        return <AdminAppointments />
      case "patients":
        return <AdminPatients />
      case "settings":
        return <AdminSettings />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow p-6 overflow-auto">{renderContent()}</div>
      </main>
      <Footer />
    </div>
  )
}
