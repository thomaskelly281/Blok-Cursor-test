
import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to your dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            A beautiful dashboard with topbar, sidebar, and image carousel built with the Blok design system.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              View dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}