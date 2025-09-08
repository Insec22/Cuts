"use client"

import { Button } from "@/components/ui/button"
import { Clock, Sparkles, Star, Users, Award, Shield } from "lucide-react"
import { BookingFlow } from "./booking-flow"
import { useState } from "react"

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/modern-vintage-barbershop.png"
            alt="Interior de barbearia moderna premiada com barbeiros profissionais"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-background/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6 text-sm text-yellow-400">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>15+ Anos de Experiência</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Licenciado & Segurado</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>5000+ Clientes Satisfeitos</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            A Barbearia Mais Confiável da <span className="text-yellow-400 font-extrabold drop-shadow-lg">Cidade</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Barbeiros mestres com mais de 15 anos de experiência. Cortes premium, barbas clássicas, estilo moderno.
            <strong className="text-yellow-400"> Satisfação garantida ou seu dinheiro de volta.</strong>
          </p>

          <div className="mb-8 bg-card/90 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto border border-yellow-600/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  J
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  R
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-sm text-card-foreground">
              <strong>"Melhor corte que já fiz!"</strong> - Miguel, cliente verificado
            </p>
          </div>

          <div className="mb-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold text-lg px-8 py-4 shadow-lg shadow-yellow-600/30 transition-all duration-300 hover:scale-105 min-h-[44px] relative overflow-hidden group"
                onClick={() => setIsBookingOpen(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Sparkles className="h-5 w-5 mr-2" />
                Agendar Horário
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10 min-h-[44px] bg-transparent"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver Serviços e Preços
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-foreground/90 bg-red-900/20 backdrop-blur-sm rounded-full px-4 py-2 max-w-fit mx-auto border border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>
                <strong>Apenas 2 horários disponíveis hoje</strong> • Agende agora para não perder
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-yellow-600/30 shadow-lg shadow-yellow-600/20">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-5 w-5 text-yellow-400 mr-2" />
              <h3 className="text-lg font-semibold text-card-foreground">Estamos Abertos</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse" />
            </div>
            <div className="space-y-2 text-card-foreground">
              <div className="flex justify-between">
                <span>Segunda - Sexta</span>
                <span className="font-medium">09h00 - 19h00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado</span>
                <span className="font-medium">08h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo</span>
                <span className="font-medium">10h00 - 16h00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingFlow isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
