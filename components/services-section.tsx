"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Zap, Sparkles, Crown, Clock, Star, CheckCircle } from "lucide-react"
import { useState } from "react"
import { BookingFlow } from "./booking-flow"

const services = [
  {
    icon: Scissors,
    title: "Corte Clássico",
    price: "R$ 45",
    duration: "30 min",
    description: "Corte tradicional com técnicas modernas de estilo",
    popular: false,
    features: ["Consulta incluída", "Dicas de estilo", "Garantia de 30 dias"],
  },
  {
    icon: Zap,
    title: "Barba & Bigode",
    price: "R$ 25",
    duration: "20 min",
    description: "Modelagem precisa da barba e cuidados",
    popular: false,
    features: ["Preparação com toalha quente", "Finalização com óleo", "Consultoria de formato"],
  },
  {
    icon: Sparkles,
    title: "Barba com Navalha",
    price: "R$ 55",
    duration: "45 min",
    description: "Barbear luxuoso com navalha e tratamento de toalha quente",
    popular: true,
    features: ["Óleo pré-barba", "Tratamento toalha quente", "Bálsamo pós-barba"],
  },
  {
    icon: Crown,
    title: "Serviço Completo",
    price: "R$ 80",
    duration: "60 min",
    description: "Pacote completo com corte, barba e finalização",
    popular: false,
    features: ["Tudo incluído", "Produtos premium", "Tratamento VIP"],
  },
]

export function ServicesSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/5 to-transparent pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 bg-clip-text text-transparent">
              Serviços Premium, Resultados Garantidos
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto text-pretty mb-4">
              Serviços profissionais de barbearia por mestres com mais de 15 anos de experiência
            </p>
            <div className="inline-flex items-center gap-2 bg-green-900/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              100% Satisfação Garantida ou Seu Dinheiro de Volta
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:border-accent transition-all duration-500 hover:shadow-xl hover:shadow-accent/30 relative overflow-hidden hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm"
              >
                {service.popular && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-600 to-yellow-700 text-black text-xs font-bold px-3 py-1 rounded-bl-lg shadow-lg z-10">
                    <Star className="h-3 w-3 inline mr-1" />
                    Mais Procurado
                  </div>
                )}

                <CardHeader className="text-center relative">
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit group-hover:bg-accent/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <service.icon className="h-8 w-8 text-yellow-400 transition-all duration-500 group-hover:text-yellow-300" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">
                    {service.price}
                  </CardDescription>

                  <div className="inline-flex items-center gap-1 bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-full text-xs font-medium text-zinc-800 dark:text-zinc-200 mt-2">
                    <Clock className="h-3 w-3" />
                    {service.duration}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-center text-foreground/70 text-pretty group-hover:text-foreground/90 transition-colors duration-300">
                    {service.description}
                  </p>

                  <ul className="space-y-1 text-xs text-foreground/60">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="sm"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Agendar Este Serviço
                  </Button>
                </CardContent>

                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BookingFlow isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
