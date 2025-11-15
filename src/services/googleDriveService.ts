import { GOOGLE_DRIVE_API_KEY } from "@/config/googleDrive";
import type { DriveFile, DriveResponse } from "@/types/googleDrive";

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3";

export async function getImagesFromFolder(folderId: string): Promise<DriveFile[]> {
  try {
    const query = `'${folderId}' in parents and mimeType contains 'image/'`;
    const fields = "files(id,name,mimeType,thumbnailLink,webContentLink,createdTime)";
    
    const url = `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&fields=${fields}&orderBy=createdTime desc&key=${GOOGLE_DRIVE_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status}`);
    }
    
    const data: DriveResponse = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching images from Google Drive:", error);
    throw error;
  }
}

export function getThumbnailUrl(fileId: string, size: number = 400): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

export function getFullSizeUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
}

export function downloadImage(fileId: string, fileName: string): void {
  const url = `https://drive.google.com/uc?id=${fileId}&export=download`;
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
