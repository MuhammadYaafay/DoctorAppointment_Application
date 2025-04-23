"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/authContext"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-teal-500">MediBook</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-teal-500 transition-colors">
            Home
          </Link>
          <Link href="/doctors" className="text-sm font-medium hover:text-teal-500 transition-colors">
            Find Doctors
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-teal-500 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-teal-500 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/appointments">My Appointments</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                {user.role === "doctor" && (
                  <DropdownMenuItem asChild>
                    <Link href="/doctor-panel">Doctor Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                <Link href="/login?tab=register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-md hover:bg-accent" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-teal-500 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                href="/doctors"
                className="text-sm font-medium hover:text-teal-500 transition-colors"
                onClick={toggleMenu}
              >
                Find Doctors
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-teal-500 transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-teal-500 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
            <div className="pt-4 border-t border-border/40 flex flex-col space-y-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium hover:text-teal-500 transition-colors"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/appointments"
                    className="text-sm font-medium hover:text-teal-500 transition-colors"
                    onClick={toggleMenu}
                  >
                    My Appointments
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-sm font-medium hover:text-teal-500 transition-colors"
                      onClick={toggleMenu}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {user.role === "doctor" && (
                    <Link
                      href="/doctor-panel"
                      className="text-sm font-medium hover:text-teal-500 transition-colors"
                      onClick={toggleMenu}
                    >
                      Doctor Panel
                    </Link>
                  )}
                  <Button variant="ghost" className="justify-start px-0" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/login" onClick={toggleMenu}>
                      Login
                    </Link>
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                    <Link href="/login?tab=register" onClick={toggleMenu}>
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
