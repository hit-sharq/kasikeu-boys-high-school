"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Calendar", href: "/calendar" },
    { name: "News", href: "/news" },
    { name: "Staff", href: "/staff" },
    { name: "Gallery", href: "/gallery" },
    { name: "Admissions", href: "/admissions" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Sign In", href: "/sign-in" },
    { name: "Sign Up", href: "/sign-up" },
  ]

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <Link href="/" className="logo">
          <div className="logo-icon">K</div>
          <div className="logo-text">
            <h1 style={{ color: isScrolled ? "#111827" : "#fff" }}>Kasikeu Boys' High School</h1>
            <p style={{ color: isScrolled ? "#6b7280" : "#dbeafe" }}>Excellence in Education</p>
          </div>
        </Link>

        <nav className="nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link"
              style={{ color: isScrolled ? "#374151" : "#fff" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/admissions" className="btn btn-primary">
            Apply Now
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: isScrolled ? "#374151" : "#fff" }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
                <Link
                  href="/sign-in"
                  className="block w-full text-center px-4 py-2 mb-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
                <Link href="/admissions" className="btn btn-primary" style={{ width: "100%" }}>
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
