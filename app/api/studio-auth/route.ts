import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// You should store this in environment variables
const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD || "your-secure-password-here"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    // Check if password matches
    if (password !== STUDIO_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Create response
    const response = NextResponse.json({ success: true, message: "Authentication successful" }, { status: 200 })

    // Set cookie for 24 hours
    const cookieStore = await cookies()
    cookieStore.set("studio-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours in seconds
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Studio auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
