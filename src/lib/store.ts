import { create } from 'zustand'

type StoreState = {
  uploadedImage: string | null
  setUploadedImage: (image: string | null) => void
}

export const useStore = create<StoreState>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image) => set({ uploadedImage: image }),
})) 