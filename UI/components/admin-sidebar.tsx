"use client"

import { LayoutDashboard, Users, Calendar, UserRound, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout } = useAuth()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "doctors", label: "Doctors", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "patients", label: "Patients", icon: UserRound },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-30">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu} className="rounded-full">
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-card border-r border-border/40 w-64 shrink-0 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "fixed inset-y-0 left-0 z-20 translate-x-0"
            : "fixed -translate-x-full lg:translate-x-0 lg:static"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-teal-500 mb-6">Admin Panel</h2>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeTab === item.id ? "bg-teal-500/10 text-teal-500" : "hover:bg-accent/50 text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <Button variant="outline" className="w-full flex items-center gap-2 justify-start" onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
