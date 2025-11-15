import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoJovisa from "@/assets/JovisaLogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <a href="#momentos" className="text-xs font-medium tracking-wider hover:text-foreground/70 transition-colors">
              MOMENTOS
            </a>
            <a href="#coordenadores" className="text-xs font-medium tracking-wider hover:text-foreground/70 transition-colors">
              COORDENADORES
            </a>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none flex justify-center">
            <a href="#home" className="flex items-center">
              <img src={logoJovisa} alt="Jovisa Logo" className="h-200 w-auto" />
            </a>
          </div>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <a href="#galeria" className="text-xs font-medium tracking-wider hover:text-foreground/70 transition-colors">
              GALERIA
            </a>
            <a href="#comentario" className="text-xs font-medium tracking-wider hover:text-foreground/70 transition-colors">
              PADLET
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <a href="#momentos" className="text-xs font-medium tracking-wider" onClick={() => setIsOpen(false)}>
                MOMENTOS
              </a>
              <a href="#coordenadores" className="text-xs font-medium tracking-wider" onClick={() => setIsOpen(false)}>
                COORDENADORES
              </a>
              <a href="#galeria" className="text-xs font-medium tracking-wider" onClick={() => setIsOpen(false)}>
                GALERIA
              </a>
              <a href="#comentario" className="text-xs font-medium tracking-wider" onClick={() => setIsOpen(false)}>
                PADLET
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
