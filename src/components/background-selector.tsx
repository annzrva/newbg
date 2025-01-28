"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { PreviewImage } from "./preview-image"
import { EditorTips } from "./editor-tips"
import Image from "next/image"

// Define the background type
type Background = {
  id: number
  name: string
  url: {
    avif: string
  }
  thumbnail: {
    avif: string
  }
}

// Backgrounds with actual filenames
const backgrounds: Background[] = [
  { 
    id: 1, 
    name: "Background 1", 
    url: {
      avif: "/backgrounds/bg1.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg1.avif",
    }
  },
  { 
    id: 2, 
    name: "Background 2", 
    url: {
      avif: "/backgrounds/bg2.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg2.avif",
    }
  },
  { 
    id: 3, 
    name: "Background 3", 
    url: {
      avif: "/backgrounds/bg3.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg3.avif",
    }
  },
  { 
    id: 4, 
    name: "Background 4", 
    url: {
      avif: "/backgrounds/bg4.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg4.avif",
    }
  },
  { 
    id: 5, 
    name: "Background 5", 
    url: {
      avif: "/backgrounds/bg5.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg5.avif",
    }
  },
  { 
    id: 6, 
    name: "Background 6", 
    url: {
      avif: "/backgrounds/bg6.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg6.avif",
    }
  },
  { 
    id: 7, 
    name: "Background 7", 
    url: {
      avif: "/backgrounds/bg7.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg7.avif",
    }
  },
  { 
    id: 8, 
    name: "Background 8", 
    url: {
      avif: "/backgrounds/bg8.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg8.avif",
    }
  },
  { 
    id: 9, 
    name: "Background 9", 
    url: {
      avif: "/backgrounds/bg9.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg9.avif",
    }
  },
  { 
    id: 10, 
    name: "Background 10", 
    url: {
      avif: "/backgrounds/bg10.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg10.avif",
    }
  },
  { 
    id: 11, 
    name: "Background 11", 
    url: {
      avif: "/backgrounds/bg11.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg11.avif",
    }
  },
  { 
    id: 12, 
    name: "Background 12", 
    url: {
      avif: "/backgrounds/bg12.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg12.avif",
    }
  },
  { 
    id: 13, 
    name: "Background 13", 
    url: {
      avif: "/backgrounds/bg13.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg13.avif",
    }
  },
  { 
    id: 14, 
    name: "Background 14", 
    url: {
      avif: "/backgrounds/bg14.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg14.avif",
    }
  },
  { 
    id: 15, 
    name: "Background 15", 
    url: {
      avif: "/backgrounds/bg15.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg15.avif",
    }
  },
  { 
    id: 16, 
    name: "Background 16", 
    url: {
      avif: "/backgrounds/bg16.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg16.avif",
    }
  },
  { 
    id: 17, 
    name: "Background 17", 
    url: {
      avif: "/backgrounds/bg17.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg17.avif",
    }
  },
  { 
    id: 18, 
    name: "Background 18", 
    url: {
      avif: "/backgrounds/bg18.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg18.avif",
    }
  },
  { 
    id: 20, 
    name: "Background 20", 
    url: {
      avif: "/backgrounds/bg20.avif",
    }, 
    thumbnail: {
      avif: "/backgrounds/bg20.avif",
    }
  }
]

type BackgroundSelectorProps = {
  uploadedImage: string
}

export function BackgroundSelector({ uploadedImage }: BackgroundSelectorProps) {
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null)

  const handleDownload = (dataUrl: string) => {
    // Create a download link
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'product-with-background.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full space-y-4">
      {/* Preview section */}
      <div className="aspect-[16/9] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
        <PreviewImage 
          productImage={uploadedImage}
          backgroundImage={selectedBackground?.url.avif}
          className="w-full h-full"
          onDownload={handleDownload}
        />
      </div>

      <EditorTips />

      {/* Background grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {backgrounds.map((background) => (
          <Card
            key={background.id}
            className={`relative aspect-square cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary ${
              selectedBackground?.id === background.id
                ? "ring-2 ring-primary"
                : ""
            }`}
            onClick={() => setSelectedBackground(background)}
          >
            <Image
              src={background.thumbnail.avif}
              alt={background.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm text-white">{background.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 