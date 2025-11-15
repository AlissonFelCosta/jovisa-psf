import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoJovisa from "@/assets/LogoJovisa.png";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoJovisa} alt="Jovisa Logo" className="h-135 w-auto" />
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-foreground/60">
            <p>Contato</p>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/jovisapsf/" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-foreground/60">
          <p>© 2025 Jovisa. Todos os direitos reservados. Termos e Condições aplicam-se.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
