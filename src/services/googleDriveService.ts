import { GOOGLE_DRIVE_API_KEY } from "@/config/googleDrive";
import type { DriveFile, DriveResponse, DriveFolder } from "@/types/googleDrive";

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3";

async function getImagesWithPagination(folderId: string): Promise<DriveFile[]> {
  let allFiles: DriveFile[] = [];
  let pageToken: string | undefined;

  try {
    do {
      const query = `'${folderId}' in parents and mimeType contains 'image/'`;
      const fields = "files(id,name,mimeType,thumbnailLink,webContentLink,createdTime),nextPageToken";
      
      const url = `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&fields=${fields}&orderBy=createdTime desc&pageSize=1000${pageToken ? `&pageToken=${pageToken}` : ''}&key=${GOOGLE_DRIVE_API_KEY}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status}`);
      }
      
      const data: DriveResponse = await response.json();
      allFiles = [...allFiles, ...(data.files || [])];
      pageToken = data.nextPageToken;
    } while (pageToken);

    return allFiles;
  } catch (error) {
    console.error("Error fetching images from Google Drive:", error);
    throw error;
  }
}

async function getSubfolders(folderId: string): Promise<DriveFolder[]> {
  try {
    const query = `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`;
    const fields = "files(id,name)";
    
    const url = `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&fields=${fields}&key=${GOOGLE_DRIVE_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error fetching subfolders from Google Drive:", error);
    throw error;
  }
}

export async function getImagesFromFolder(folderId: string): Promise<DriveFile[]> {
  try {
    // Get images from current folder with pagination
    const images = await getImagesWithPagination(folderId);
    
    // Get all subfolders
    const subfolders = await getSubfolders(folderId);
    
    // Recursively get images from each subfolder
    for (const folder of subfolders) {
      const subImages = await getImagesFromFolder(folder.id);
      images.push(...subImages);
    }
    
    return images;
  } catch (error) {
    console.error("Error fetching images recursively from Google Drive:", error);
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
