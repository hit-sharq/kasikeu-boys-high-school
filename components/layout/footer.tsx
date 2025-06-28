import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">
                K
              </div>
              <div>
                <h3 className="text-xl font-bold">Kasikeu Boys High School</h3>
                <p className="text-slate-300 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Shaping tomorrow's leaders through excellence in education, character development, and innovation. Join
              our community of learners and achievers.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <span className="text-sm font-semibold">f</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <span className="text-sm font-semibold">t</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <span className="text-sm font-semibold">i</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Staff Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-300 hover:text-white transition-colors text-sm">
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-blue-400 mt-1">📍</div>
                <div className="text-slate-300 text-sm">
                  <p>P.O. Box 123-00100</p>
                  <p>Kasikeu, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-blue-400">📞</div>
                <span className="text-slate-300 text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-blue-400">✉️</div>
                <span className="text-slate-300 text-sm">info@kasikeuboys.ac.ke</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Kasikeu Boys High School. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
