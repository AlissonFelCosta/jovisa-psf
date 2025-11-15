import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useGoogleDriveImages } from "@/hooks/useGoogleDriveImages";
import { DRIVE_FOLDERS } from "@/config/googleDrive";
import { getThumbnailUrl } from "@/services/googleDriveService";
import { Skeleton } from "@/components/ui/skeleton";

const Portfolio = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { images, isLoading, error } = useGoogleDriveImages(DRIVE_FOLDERS.santissimosacramento);

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <section id="galeria" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Title and Description */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              SANTÍSSIMO SACRAMENTO
            </h2>
            <p className="text-sm leading-relaxed text-foreground/70">
              Fotos do Santíssimo Sacramento exposto um convite profundo para que possamos nos entregar ainda mais à presença viva de Cristo, deixando que Sua luz transforme nosso coração e nossa história.
            </p>
          </div>

          {/* Right - Carousel */}
          <div>
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {isLoading ? (
                  [1, 2, 3].map((index) => (
                    <CarouselItem key={index}>
                      <Skeleton className="aspect-[4/3] rounded-lg" />
                    </CarouselItem>
                  ))
                ) : error ? (
                  <CarouselItem>
                    <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center text-center p-6">
                      <p className="text-sm text-muted-foreground">Erro ao carregar fotos</p>
                    </div>
                  </CarouselItem>
                ) : images.length === 0 ? (
                  <CarouselItem>
                    <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center text-center p-6">
                      <p className="text-sm text-muted-foreground">Nenhuma foto disponível</p>
                    </div>
                  </CarouselItem>
                ) : (
                  images.map((image) => (
                    <CarouselItem key={image.id}>
                      <img
                        src={getThumbnailUrl(image.id, 600)}
                        alt={image.name}
                        className="aspect-[4/3] w-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
            </Carousel>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
