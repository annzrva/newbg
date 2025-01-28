"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const setUploadedImage = useStore((state) => state.setUploadedImage)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && isValidFile(file)) {
      await handleFileUpload(file)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && isValidFile(file)) {
      await handleFileUpload(file)
    }
  }

  const isValidFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, or WebP)')
      return false
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB')
      return false
    }

    return true
  }

  const handleFileUpload = async (file: File) => {
    try {
      // Create a data URL from the file
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setUploadedImage(base64String)
        router.push('/editor')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card
      className={`p-8 border-2 border-dashed ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } rounded-lg text-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="space-y-4">
        <div className="text-gray-600">
          <p className="text-lg">Drag and drop your image here</p>
          <p className="text-sm">or</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
        />
        <Button onClick={handleButtonClick}>Select File</Button>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Supported formats:</p>
          <div className="flex justify-center gap-2">
            {['PNG', 'JPG', 'JPEG', 'WebP'].map((format) => (
              <span
                key={format}
                className="px-2 py-1 bg-gray-100 rounded text-xs font-mono"
              >
                {format}
              </span>
            ))}
          </div>
          <p>Maximum file size: 10MB</p>
        </div>
      </div>
    </Card>
  )
} 