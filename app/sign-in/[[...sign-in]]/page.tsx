"use client"

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect_url") || "/admin"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-2xl font-bold mb-4">
            K
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Sign In</h1>
          <p className="text-gray-600">Access the Kasikeu Boys High School admin panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-200 focus:border-blue-500 focus:ring-blue-500",
                footerActionLink: "text-blue-600 hover:text-blue-700",
                formFieldLabel: "text-gray-700",
                identityPreviewText: "text-gray-600",
                formResendCodeLink: "text-blue-600 hover:text-blue-700",
              },
            }}
            redirectUrl={redirectUrl}
            signUpUrl="/sign-up"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Only authorized administrators can access this area</p>
          <p className="text-xs text-gray-400 mt-2">Need an account? Contact the system administrator</p>
        </div>
      </div>
    </div>
  )
}
