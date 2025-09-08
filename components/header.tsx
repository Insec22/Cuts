"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Scissors } from "lucide-react"
import { BookingFlow } from "./booking-flow"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const navItems = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Galeria", href: "#gallery" },
    { name: "Sobre", href: "#about" },
    { name: "Contato", href: "#contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-foreground">Classic Cuts</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => setIsBookingOpen(true)}
              >
                Agendar
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-accent transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 w-fit"
                  onClick={() => {
                    setIsBookingOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  Agendar
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <BookingFlow isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
