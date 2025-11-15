import { AlertTriangle, Download, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoogleDriveImages } from "@/hooks/useGoogleDriveImages";
import { DRIVE_FOLDERS } from "@/config/googleDrive";
import { getThumbnailUrl, getFullSizeUrl, downloadImage } from "@/services/googleDriveService";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { images, isLoading } = useGoogleDriveImages(DRIVE_FOLDERS.galeria);
  
  const currentImage = currentImageIndex !== null ? images[currentImageIndex] : null;

  const handleDownload = (imageId: string, imageName: string) => {
    downloadImage(imageId, imageName);
  };

  const handleNext = () => {
    if (currentImageIndex === null || images.length === 0) return;
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev! + 1
    );
  };

  const handlePrevious = () => {
    if (currentImageIndex === null || images.length === 0) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev! - 1
    );
  };

  const handleBackToGrid = () => {
    setCurrentImageIndex(null);
    setIsGalleryOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentImageIndex === null) return;
      
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') setCurrentImageIndex(null);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentImageIndex, images.length]);


  return (
    <section id="galeria" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left - Title */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              GALERIA JOVISA!
            </h2>
          </div>

          {/* Right - Warning Message */}
          <div className="bg-background border-l-4 border-yellow-500 p-6 rounded-lg shadow-sm">
            <div className="flex gap-3">
              <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-lg mb-2">Aviso Importante</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  A fotografia vai muito além de câmeras e iluminação - é sobre as pessoas e os momentos vividos. 
                  Por isso, pedimos que os momentos mais fortes e significativos do Encontro não sejam publicados, 
                  para preservar a experiência das próximas pessoas que ainda irão vivê-lo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Grid Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))
          ) : images.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Nenhuma foto disponível ainda</p>
            </div>
          ) : (
            images.slice(0, 6).map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className="aspect-square bg-muted hover:bg-muted/80 transition-all hover:scale-105 cursor-pointer rounded-lg overflow-hidden"
                aria-label={`Ver ${image.name}`}
              >
                <img
                  src={getThumbnailUrl(image.id, 200)}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))
          )}
        </div>

        {/* Open Gallery Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setIsGalleryOpen(true)}
            size="lg"
            className="text-base px-8"
            disabled={isLoading || images.length === 0}
          >
            Ver Todas as Fotos ({images.length})
          </Button>
        </div>

        {/* Lightbox with Navigation */}
        <Dialog open={currentImageIndex !== null} onOpenChange={() => setCurrentImageIndex(null)}>
          <DialogContent className="max-w-6xl">
            {currentImage ? (
              <>
                {/* Header with counter and back button */}
                <div className="flex justify-between items-center mb-4">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToGrid}
                    className="gap-2"
                  >
                    <Grid3x3 className="h-4 w-4" />
                    Voltar ao Grid
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Foto {currentImageIndex! + 1} de {images.length}
                  </span>
                </div>

                {/* Image with navigation */}
                <div className="relative group">
                  {/* Previous button */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handlePrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  {/* Image */}
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={getFullSizeUrl(currentImage.id)}
                      alt={currentImage.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Next button */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Download button */}
                <div className="flex justify-center mt-4">
                  <Button onClick={() => handleDownload(currentImage.id, currentImage.name)}>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Foto
                  </Button>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>

        {/* Full Gallery Dialog with Grid */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="py-4">
              <h3 className="text-2xl font-semibold mb-6">Galeria Completa</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {isLoading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <Skeleton key={index} className="aspect-square rounded-lg" />
                  ))
                ) : (
                  images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => {
                        setIsGalleryOpen(false);
                        setCurrentImageIndex(index);
                      }}
                      className="aspect-square bg-muted hover:bg-muted/80 transition-all hover:scale-105 cursor-pointer rounded-lg overflow-hidden"
                      aria-label={`Ver ${image.name}`}
                    >
                      <img
                        src={getThumbnailUrl(image.id, 300)}
                        alt={image.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
