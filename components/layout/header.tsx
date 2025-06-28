"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { user, isLoaded } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if user is admin
  useEffect(() => {
    async function checkAdminStatus() {
      if (!isLoaded) return

      setIsLoading(true)

      if (user) {
        try {
          const response = await fetch("/api/auth/check-admin")
          const data = await response.json()
          setIsAdmin(data.isAdmin)
        } catch (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }

      setIsLoading(false)
    }

    checkAdminStatus()
  }, [user, isLoaded])

  const publicNavigation = [
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
  ]

  // Add admin panel to navigation if user is admin
  const navigation = [...publicNavigation, ...(isAdmin ? [{ name: "Admin Panel", href: "/admin" }] : [])]

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
              className={`nav-link ${item.name === "Admin Panel" ? "admin-nav-link" : ""}`}
              style={{
                color: isScrolled ? "#374151" : "#fff",
                ...(item.name === "Admin Panel" && {
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                }),
              }}
            >
              {item.name === "Admin Panel" && "🛠️ "}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && !isLoading && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Admin
                </div>
              )}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-secondary">
                Sign In
              </Link>
              <Link href="/admissions" className="btn btn-primary">
                Apply Now
              </Link>
            </>
          )}
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
                <Link
                  key={item.name}
                  href={item.href}
                  className={`mobile-nav-link ${item.name === "Admin Panel" ? "admin-mobile-nav-link" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                  style={
                    item.name === "Admin Panel"
                      ? {
                          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                          color: "#fff",
                          fontWeight: "600",
                          borderRadius: "0.5rem",
                          margin: "0.25rem 0",
                        }
                      : {}
                  }
                >
                  {item.name === "Admin Panel" && "🛠️ "}
                  {item.name}
                </Link>
              ))}

              <div style={{ paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
                    </span>
                    {isAdmin && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Admin</span>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="block w-full text-center px-4 py-2 mb-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link href="/admissions" className="btn btn-primary" style={{ width: "100%" }}>
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
