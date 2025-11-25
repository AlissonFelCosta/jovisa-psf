import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import logoJovisa from "@/assets/LogoJovisa.png";

const Contact = () => {
  return (
    <section id="comentario" className="py-20 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Info and Button */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              DEIXA UM<br />COMENTÁRIO
            </h2>

            <p className="text-sm text-background/80 leading-relaxed mb-20 max-w-lg">
              Nós, da Paróquia Sagrada Família, temos o nosso PADLET! Lá você pode compartilhar uma foto sua, 
              informar seu nome, a data do seu aniversário, seu santo de devoção e deixar um feedback: pode ser 
              a música de animação que mais gostou, a música mais marcante para você ou até mesmo uma palestra 
              que tenha tocado seu coração.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-background/70">Deixe aqui sua Mensagem</span>
              </div>
              <Button 
                asChild
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-12 py-6 text-base font-medium"
              >
                <a href="https://padlet.com/davilucas9/deixe-aqui-sua-mensagem-c9j5qj86nvbqgz30" target="_blank" rel="noopener noreferrer">
                  PADLET
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Padlet Example Card */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="bg-background text-foreground rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full">
              {/* Header */}
              <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-semibold">Exemplo</span>
                <button className="text-xs px-2 py-1 border border-white/30 rounded hover:bg-white/10 transition-colors">
                  Editar
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Profile Image */}
                <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center overflow-hidden p-4">
                  <img src={logoJovisa} alt="Jovisa Logo" className="w-full h-full object-contain" />
                </div>

                {/* Text Content */}
                <div className="text-center mb-4">
                  <h3 className="text-red-600 font-bold text-lg mb-3">Me Chamo Jovisa</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Sou da Paróquia Sagrada Família<br />
                    Sou de 1 julho de 2001<br />
                    Minha música favorita é profetiza<br />
                    meu santos de devoção é Santa<br />
                    Terezinha e são bento<br />
                    Meu Instagram é @JovisaPSF
                  </p>
                </div>

                {/* Heart */}
                <div className="flex items-center justify-center gap-1 text-red-600">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">170</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
