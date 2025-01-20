"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function registerUser(formData: {
  name: string
  email: string
  github: string
  linkedin: string
  college: string
  course: string
  year: string
  phone: string
  videoUrl: string
  discord: string
}) {
  try {
    const registration = await prisma.registration.create({
      data: {
        name: formData.name,
        email: formData.email,
        github: formData.github,
        linkedin: formData.linkedin,
        college: formData.college,
        course: formData.course,
        year: formData.year,
        phone: formData.phone,
        videoUrl: formData.videoUrl,
        discord: formData.discord,
      },
    })

    revalidatePath("/")
    return { success: true, data: registration }
  } catch (error) {
    console.error("Registration error:", error)
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        if (error.message.includes("email")) {
          return { success: false, error: "This email is already registered" }
        }
        if (error.message.includes("phone")) {
          return { success: false, error: "This phone number is already registered" }
        }
      }
    }
    return { success: false, error: "Failed to register. Please try again." }
  }
}
