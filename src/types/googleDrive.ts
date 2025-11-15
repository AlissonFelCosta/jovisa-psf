export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  createdTime: string;
}

export interface DriveResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

export interface UseGoogleDriveImagesReturn {
  images: DriveFile[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
