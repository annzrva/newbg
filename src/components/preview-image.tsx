"use client"

import { useRef } from "react"
import Image from "next/image"
import { MoveableImage } from "./moveable-image"

type PreviewImageProps = {
  productImage: string
  backgroundImage?: string
  className?: string
  onDownload?: (dataUrl: string) => void
}

export function PreviewImage({ productImage, backgroundImage, className, onDownload }: PreviewImageProps) {
  const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  return (
    <div className={`relative w-full h-full ${className}`} ref={containerRef}>
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
            fill
            priority
          />
        </div>
      )}
      <MoveableImage 
        src={productImage} 
        containerRef={containerRef} 
        onDownload={onDownload}
      />
    </div>
  )
} 