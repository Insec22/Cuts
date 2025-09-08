"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Send, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after success animation
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Pronto para seu próximo corte? Entre em contato para agendar um horário ou tirar dúvidas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Envie uma mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">Retornaremos em até 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Seu Nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Seu E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Seu Telefone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Sua Mensagem"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500/20 resize-none transition-all duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white h-12 shadow-lg shadow-yellow-500/30 transition-all duration-300 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-yellow-500/20">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua Principal, 123
                        <br />
                        Centro
                        <br />
                        São Paulo, SP 01234-567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">Telefone</h3>
                      <p className="text-muted-foreground font-medium">(11) 98765-4321</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">E-mail</h3>
                      <p className="text-muted-foreground font-medium">contato@classiccuts.com.br</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-yellow-500/20">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10" />
                  <p className="text-muted-foreground font-medium">Mapa Interativo em Breve</p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Siga-nos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-white hover:border-yellow-500 transition-all duration-300 min-h-[44px] min-w-[44px] bg-transparent"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-white hover:border-yellow-500 transition-all duration-300 min-h-[44px] min-w-[44px] bg-transparent"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-white hover:border-yellow-500 transition-all duration-300 min-h-[44px] min-w-[44px] bg-transparent"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
