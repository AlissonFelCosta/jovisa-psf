import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useGoogleDriveImages } from "@/hooks/useGoogleDriveImages";
import { DRIVE_FOLDERS } from "@/config/googleDrive";
import { getThumbnailUrl } from "@/services/googleDriveService";
import { Skeleton } from "@/components/ui/skeleton";

const testimonials = [
  {
    name: "LUCAS PEREIRA",
    role: "Coordenador do 7º Jovisa de Piranguinho e do 10º Jovisa da Paróquia Sagrada Família",
    text: "Eu lhe dei vinte mil réis pra pagar três e trezentos você tem que me voltar dezesseis e setecentos dezessete e setecentos dezesseis e setecentos"
  },
  {
    name: "TEODORO E SAMPAIO",
    role: "Dupla sertaneja",
    text: "Meu bem eu queria que você voltasse ao menos pra buscar, alguns objetos que na despedida você não levou, um batom usado caido no canto da penteadeira..."
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { images, isLoading } = useGoogleDriveImages(DRIVE_FOLDERS.depoimentos);
  
  // Find images by name matching testimonial
  const getCurrentImage = () => {
    const currentName = testimonials[currentIndex].name.toLowerCase();
    if (currentName.includes("lucas")) {
      return images.find(img => img.name.toLowerCase().includes("lucas"));
    }
    if (currentName.includes("gustavo")) {
      return images.find(img => img.name.toLowerCase().includes("gustavo"));
    }
    return images[currentIndex] || images[0];
  };

  const currentImage = getCurrentImage();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Title and Profile */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-12">
              COMENTÁRIOS<br />DE SERVOS e AMIGOS
            </h2>

            {/* Profile Section */}
            <div className="flex gap-6 mb-8">
              {isLoading ? (
                <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
              ) : currentImage ? (
                <img 
                  src={getThumbnailUrl(currentImage.id, 150)} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0"></div>
              )}
              <div>
                <p className="font-semibold text-lg mb-1">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-background/70">{testimonials[currentIndex].role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 border-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Right - Testimonial Text */}
          <div className="text-xl md:text-2xl font-light leading-relaxed">
            <p>{testimonials[currentIndex].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
