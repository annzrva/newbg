import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Product Background Editor</h1>
        <p className="text-lg text-gray-600">Upload your product image and choose a background</p>
        <Button asChild>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/upload`}>Get Started</Link>
        </Button>
      </div>
    </main>
  )
}
