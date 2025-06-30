import { uploadImage } from "./cloudinary"

export async function handleImageUpload(file: File): Promise<string> {
  try {
    const imageUrl = await uploadImage(file)
    return imageUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

export function validateImageFile(file: File): boolean {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload JPEG, PNG, or WebP images.")
  }

  if (file.size > maxSize) {
    throw new Error("File too large. Please upload images smaller than 5MB.")
  }

  return true
}
