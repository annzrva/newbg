"use client"

import { Rnd } from "react-rnd"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

type MoveableImageProps = {
  src: string
  containerRef: React.RefObject<HTMLDivElement>
  onDownload?: (compositeImage: string) => void
}

type ImageTransform = {
  position: { x: number; y: number }
  size: { width: string | number; height: string | number }
  scale: { x: number; y: number }
}

export function MoveableImage({ src, containerRef, onDownload }: MoveableImageProps) {
  const [transform, setTransform] = useState<ImageTransform>({
    position: { x: 0, y: 0 },
    size: { width: "auto", height: "auto" },
    scale: { x: 1, y: 1 }
  })

  // Calculate initial size based on container and image
  const initializeSize = useCallback(async () => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const img = new window.Image()
    img.src = src

    await new Promise((resolve) => {
      img.onload = resolve
    })

    // Calculate size to fit within container while maintaining aspect ratio
    const containerRatio = container.width / container.height
    const imageRatio = img.width / img.height
    
    let width, height
    if (containerRatio > imageRatio) {
      // Container is wider than image ratio
      height = container.height * 0.8 // 80% of container height
      width = height * imageRatio
    } else {
      // Container is taller than image ratio
      width = container.width * 0.8 // 80% of container width
      height = width / imageRatio
    }

    setTransform(prev => ({
      ...prev,
      size: { width, height },
      position: {
        x: (container.width - width) / 2,
        y: (container.height - height) / 2
      }
    }))
  }, [src, containerRef])

  // Initialize on mount
  useEffect(() => {
    initializeSize()
  }, [initializeSize])

  const centerImage = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const width = typeof transform.size.width === 'number' ? transform.size.width : parseFloat(transform.size.width)
    const height = typeof transform.size.height === 'number' ? transform.size.height : parseFloat(transform.size.height)

    setTransform(prev => ({
      ...prev,
      position: {
        x: (container.width - width) / 2,
        y: (container.height - height) / 2,
      }
    }))
  }, [containerRef, transform.size])

  const renderCompositeImage = useCallback(async (
    container: DOMRect,
    backgroundImage: HTMLImageElement | null,
    productImage: HTMLImageElement,
    transform: ImageTransform
  ): Promise<string> => {
    // Create canvas with actual display dimensions
    const canvas = document.createElement('canvas')
    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = container.width * pixelRatio
    canvas.height = container.height * pixelRatio

    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')

    // Scale for retina/high DPI displays
    ctx.scale(pixelRatio, pixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background if exists
    if (backgroundImage) {
      ctx.drawImage(
        backgroundImage,
        0,
        0,
        container.width,
        container.height
      )
    }

    // Draw product image with exact transformations
    ctx.save()
    
    // Apply the exact position
    ctx.translate(transform.position.x, transform.position.y)
    
    // Get exact dimensions
    const width = typeof transform.size.width === 'number' 
      ? transform.size.width 
      : parseFloat(transform.size.width)
    const height = typeof transform.size.height === 'number' 
      ? transform.size.height 
      : parseFloat(transform.size.height)

    // Draw at exact size
    ctx.drawImage(
      productImage,
      0,
      0,
      width,
      height
    )
    
    ctx.restore()

    return canvas.toDataURL('image/png')
  }, [])

  const handleDownload = async () => {
    if (!containerRef.current) return
    
    try {
      const container = containerRef.current.getBoundingClientRect()
      const backgroundImage = containerRef.current.querySelector('img')
      
      const productImage = new window.Image()
      productImage.src = src
      await new Promise((resolve) => {
        productImage.onload = resolve
      })

      const dataUrl = await renderCompositeImage(
        container,
        backgroundImage,
        productImage,
        transform
      )

      onDownload?.(dataUrl)
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  const resetTransform = () => {
    initializeSize()
  }

  return (
    <>
      <Rnd
        default={{
          x: transform.position.x,
          y: transform.position.y,
          width: transform.size.width,
          height: transform.size.height,
        }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        lockAspectRatio
        position={transform.position}
        size={transform.size}
        onDragStop={(e, d) => {
          setTransform(prev => ({
            ...prev,
            position: { x: d.x, y: d.y }
          }))
        }}
        onResize={(e, direction, ref, delta, position) => {
          setTransform(prev => ({
            ...prev,
            size: {
              width: ref.style.width,
              height: ref.style.height,
            },
            position
          }))
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
        }}
      >
        <Image
          src={src}
          alt="Resizable product"
          className="w-full h-full object-contain"
          fill
          priority
          draggable={false}
        />
      </Rnd>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 space-x-2 z-20">
        <button
          onClick={resetTransform}
          className="bg-white/90 hover:bg-white px-3 py-1 rounded-md text-sm shadow-sm transition-colors"
        >
          Reset
        </button>
        <button
          onClick={centerImage}
          className="bg-white/90 hover:bg-white px-3 py-1 rounded-md text-sm shadow-sm transition-colors"
        >
          Center
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm shadow-sm transition-colors"
        >
          Download
        </button>
      </div>
    </>
  )
} 