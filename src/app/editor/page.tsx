"use client"

import { BackgroundSelector } from "../../components/background-selector"
import { useStore } from "../../lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function EditorPage() {
  const uploadedImage = useStore((state) => state.uploadedImage)
  const router = useRouter()

  // Redirect if no image is uploaded
  useEffect(() => {
    if (!uploadedImage) {
      router.push("/upload")
    }
  }, [uploadedImage, router])

  if (!uploadedImage) return null

  return (
    <main className="min-h-screen p-4">
      <BackgroundSelector uploadedImage={uploadedImage} />
    </main>
  )
} 