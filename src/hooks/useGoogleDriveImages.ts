import { useQuery } from "@tanstack/react-query";
import { getImagesFromFolder } from "@/services/googleDriveService";
import type { UseGoogleDriveImagesReturn } from "@/types/googleDrive";

export function useGoogleDriveImages(folderId: string): UseGoogleDriveImagesReturn {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["drive-images", folderId],
    queryFn: () => getImagesFromFolder(folderId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  return {
    images: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
