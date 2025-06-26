"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Settings } from "lucide-react"

export default function StudioLogin() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if already authenticated
  useEffect(() => {
    const authCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("studio-auth="))

    if (authCookie && authCookie.includes("authenticated")) {
      const returnUrl = searchParams.get("returnUrl") || "/studio"
      router.push(returnUrl)
    }
  }, [router, searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/studio-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Set authentication cookie
        document.cookie = "studio-auth=authenticated; path=/; max-age=86400; SameSite=Strict"

        // Get return URL from query params or default to studio
        const returnUrl = searchParams.get("returnUrl") || "/studio"

        // Small delay to ensure cookie is set
        setTimeout(() => {
          router.push(returnUrl)
        }, 100)
      } else {
        setError("Incorrect password. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-black" />
          </div>
          <CardTitle className="text-2xl text-white">Studio Access</CardTitle>
          <CardDescription className="text-gray-300">
            Enter the password to access the content management studio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Enter studio password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Access Studio"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Need access?{" "}
              <a href="mailto:admin@yoursite.com" className="text-yellow-400 hover:text-yellow-300">
                Contact administrator
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
