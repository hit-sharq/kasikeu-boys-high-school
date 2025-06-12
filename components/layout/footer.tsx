import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <h3 className="text-lg font-bold">Kasikeu Boys High School</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Excellence in Education, Character Development, and Leadership Training.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-white text-sm">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gray-300 hover:text-white text-sm">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-gray-300 hover:text-white text-sm">
                  Staff Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white text-sm">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Academic</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calendar" className="text-gray-300 hover:text-white text-sm">
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white text-sm">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <span className="text-gray-300 text-sm">KCSE Results</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Curriculum</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  P.O. Box 123-00100
                  <br />
                  Kasikeu, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@kasikeuboys.ac.ke</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Kasikeu Boys High School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
