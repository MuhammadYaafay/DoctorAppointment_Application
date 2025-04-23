import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-teal-500 mb-4">MediBook</h3>
            <p className="text-muted-foreground mb-4">
              Book doctor appointments online with ease. Find the right specialist and get the care you need.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-teal-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-teal-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-teal-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Patients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-teal-500 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Medical Plaza, Healthcare Avenue, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-teal-500" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-teal-500" />
                <span className="text-muted-foreground">support@medibook.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MediBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
