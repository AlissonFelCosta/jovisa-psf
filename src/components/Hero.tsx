import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { useGoogleDriveImages } from "@/hooks/useGoogleDriveImages";
import { DRIVE_FOLDERS } from "@/config/googleDrive";
import { getThumbnailUrl } from "@/services/googleDriveService";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { images, isLoading, error } = useGoogleDriveImages(DRIVE_FOLDERS.momentosesperados);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
    <section id="momentos" className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              MOMENTOS<br />ESPERADOS
            </h1>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair italic font-light tracking-tight">
              CRIANDO<br />MEMÓRIAS
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mb-8">
          <Carousel setApi={setApi} className="w-full" opts={{ align: "center", loop: true }}>
            <CarouselContent className="-ml-4">
              {isLoading ? (
                [1, 2, 3, 4, 5].map((index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Skeleton className="aspect-[3/4] rounded-lg" />
                  </CarouselItem>
                ))
              ) : error ? (
                <CarouselItem className="pl-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center text-center p-6">
                    <p className="text-sm text-muted-foreground">Erro ao carregar fotos</p>
                  </div>
                </CarouselItem>
              ) : images.length === 0 ? (
                <CarouselItem className="pl-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center text-center p-6">
                    <p className="text-sm text-muted-foreground">Nenhuma foto disponível</p>
                  </div>
                </CarouselItem>
              ) : (
                images.map((image) => (
                  <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <img
                      src={getThumbnailUrl(image.id, 400)}
                      alt={image.name}
                      className="aspect-[3/4] w-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Description Text */}
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-sm font-medium mb-3">Plenárias: onde tudo se conecta</h3>
          <p className="text-sm leading-relaxed text-foreground/70">
            Nas plenárias, a conexão com as palavras das palestras se torna ainda mais viva. É o momento de refletir sobre o que tocou o coração, partilhar experiências com o grupo e ouvir o que cada um sentiu. Entre trocas sinceras e aprendizados, nascem memórias, amizades e uma fé que se fortalece a cada palavra.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
