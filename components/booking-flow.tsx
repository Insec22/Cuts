"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Scissors,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  CalendarIcon,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingFlowProps {
  isOpen: boolean
  onClose: () => void
}

interface Service {
  id: string
  name: string
  price: number
  duration: string
  description: string
  popular?: boolean
}

const services: Service[] = [
  { id: "haircut", name: "Corte Clássico", price: 45, duration: "30 min", description: "Corte profissional e estilo" },
  { id: "beard", name: "Barba & Bigode", price: 25, duration: "20 min", description: "Modelagem precisa da barba" },
  {
    id: "shave",
    name: "Barba com Navalha",
    price: 55,
    duration: "45 min",
    description: "Navalha tradicional",
    popular: true,
  },
  {
    id: "full",
    name: "Serviço Completo",
    price: 80,
    duration: "60 min",
    description: "Corte, lavagem, estilo e barba",
  },
]

const mockSchedule = {
  // Dias úteis (Segunda a Sexta)
  weekdays: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ],
  // Sábados
  saturday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"],
  // Domingos - fechado
  sunday: [],
}

const stepTitles = ["Escolher Serviço", "Escolher Data", "Escolher Horário", "Seus Dados"]

export function BookingFlow({ isOpen, onClose }: BookingFlowProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("booking-progress")
      if (saved) {
        const data = JSON.parse(saved)
        setStep(data.step || 1)
        setSelectedService(data.selectedService || null)
        setSelectedDate(data.selectedDate ? new Date(data.selectedDate) : undefined)
        setSelectedTime(data.selectedTime || "")
        setCustomerInfo(data.customerInfo || { name: "", email: "", phone: "", notes: "" })
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      localStorage.setItem(
        "booking-progress",
        JSON.stringify({
          step,
          selectedService,
          selectedDate,
          selectedTime,
          customerInfo,
        }),
      )
    }
  }, [step, selectedService, selectedDate, selectedTime, customerInfo, isOpen])

  const totalSteps = 4

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime("") // Clear time when date changes
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }

    switch (field) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Nome é obrigatório"
        } else if (value.trim().length < 2) {
          newErrors.name = "Nome deve ter pelo menos 2 caracteres"
        } else {
          delete newErrors.name
        }
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) {
          newErrors.email = "E-mail é obrigatório"
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Por favor, insira um e-mail válido"
        } else {
          delete newErrors.email
        }
        break
      case "phone":
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
        if (!value.trim()) {
          newErrors.phone = "Telefone é obrigatório"
        } else if (!phoneRegex.test(value.replace(/[\s\-()]/g, ""))) {
          newErrors.phone = "Por favor, insira um telefone válido"
        } else {
          delete newErrors.phone
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo({ ...customerInfo, [field]: value })
    validateField(field, value)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Booking submitted:", {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
    })

    setShowSuccess(true)
    localStorage.removeItem("booking-progress") // Clear saved progress

    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(false)
      onClose()
      // Reset form
      setStep(1)
      setSelectedService(null)
      setSelectedDate(undefined)
      setSelectedTime("")
      setCustomerInfo({ name: "", email: "", phone: "", notes: "" })
      setErrors({})
    }, 3000)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService !== null
      case 2:
        return selectedDate !== undefined
      case 3:
        return selectedTime !== ""
      case 4:
        return customerInfo.name && customerInfo.email && customerInfo.phone && Object.keys(errors).length === 0
      default:
        return false
    }
  }

  const getAvailableTimes = () => {
    if (!selectedDate) return []

    const dayOfWeek = selectedDate.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (dayOfWeek === 0) {
      // Domingo - fechado
      return mockSchedule.sunday
    } else if (dayOfWeek === 6) {
      // Sábado
      return mockSchedule.saturday
    } else {
      // Segunda a Sexta
      return mockSchedule.weekdays
    }
  }

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="w-full max-w-md mx-auto p-0 bg-white border-green-200">
          <div className="text-center p-8 space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Agendamento Confirmado!</h3>
            <p className="text-green-700">
              Seu agendamento para {selectedService?.name} no dia {selectedDate?.toLocaleDateString("pt-BR")} às{" "}
              {selectedTime} foi confirmado.
            </p>
            <p className="text-sm text-green-600">Enviaremos um e-mail de confirmação em breve.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto h-[100dvh] md:h-auto md:max-h-[95vh] p-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-yellow-600/30 flex flex-col shadow-2xl shadow-yellow-600/20">
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-yellow-600/30 bg-gradient-to-r from-zinc-900 to-zinc-800">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={step > 1 ? prevStep : onClose}
              className="text-white hover:bg-yellow-600/20 p-2 transition-all duration-300 min-h-[44px] min-w-[44px]"
            >
              {step > 1 ? <ChevronLeft className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-white">Agendar Horário</h2>
              <p className="text-sm text-yellow-200">{stepTitles[step - 1]}</p>
            </div>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "w-8 h-2 rounded-full transition-all duration-500 relative overflow-hidden",
                  i + 1 < step
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : i + 1 === step
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-700"
                      : "bg-zinc-600",
                )}
              >
                {i + 1 <= step && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 min-h-0 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_50%)] pointer-events-none" />

          {step === 1 && (
            <div className="p-4 space-y-4 relative z-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Escolha Seu Serviço
                </h3>
                <p className="text-sm text-zinc-300 mt-1">Selecione o serviço que deseja agendar</p>
              </div>

              <div className="space-y-3">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-lg border-2 min-h-[44px] relative overflow-hidden group",
                      selectedService?.id === service.id
                        ? "border-yellow-500 bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 shadow-lg shadow-yellow-600/30 ring-2 ring-yellow-500/30 backdrop-blur-sm"
                        : "border-zinc-600 hover:border-yellow-500 hover:shadow-md bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 backdrop-blur-sm",
                    )}
                    onClick={() => handleServiceSelect(service)}
                  >
                    {service.popular && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 inline mr-1" />
                        Mais Procurado
                      </div>
                    )}

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Scissors className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-white group-hover:text-yellow-300 transition-colors duration-300">
                              {service.name}
                            </h4>
                            <p className="text-sm text-zinc-300">{service.description}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-zinc-400" />
                              <span className="text-xs text-zinc-400 bg-zinc-700/50 px-2 py-1 rounded-full">
                                {service.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                            R$ {service.price}
                          </p>
                          {selectedService?.id === service.id && (
                            <CheckCircle2 className="h-5 w-5 text-green-400 ml-auto mt-1" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-4 relative z-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Escolha a Data
                </h3>
                <p className="text-sm text-zinc-300 mt-1">Escolha quando deseja seu agendamento</p>
              </div>

              <div className="flex justify-center overflow-x-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date < today
                  }}
                  className="rounded-lg border border-yellow-500/30 shadow-lg min-w-fit bg-gradient-to-br from-zinc-800/80 to-zinc-700/80 backdrop-blur-sm"
                  classNames={{
                    day_selected:
                      "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 shadow-lg ring-2 ring-yellow-600/30",
                    day_today: "bg-yellow-500/20 text-yellow-300 font-semibold border border-yellow-500/30",
                    day: "h-12 w-12 text-base text-zinc-200 hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-200 rounded-lg min-h-[44px] min-w-[44px]",
                    head_cell: "text-zinc-300 font-semibold",
                    nav_button:
                      "text-zinc-300 hover:bg-yellow-500/20 hover:text-yellow-300 transition-colors duration-200 min-h-[44px] min-w-[44px]",
                    caption: "text-zinc-200",
                  }}
                />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-yellow-200 bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 p-2 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  Fechado aos domingos
                </div>

                {selectedDate && (
                  <div className="flex items-center gap-2 text-sm text-green-200 bg-gradient-to-r from-green-900/30 to-green-800/30 p-2 rounded-lg border border-green-500/30 backdrop-blur-sm">
                    <Users className="h-4 w-4 text-green-400" />
                    {getAvailableTimes().length} horários disponíveis em {selectedDate.toLocaleDateString("pt-BR")}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-4 relative z-10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Escolha o Horário
                </h3>
                <p className="text-sm text-zinc-300 mt-1">
                  Horários disponíveis para {selectedDate?.toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="space-y-3">
                {getAvailableTimes().length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-zinc-500 mx-auto mb-3" />
                    <p className="text-zinc-300">Nenhum horário disponível para esta data</p>
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="mt-3 min-h-[44px] border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                    >
                      Escolher Outra Data
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                    {getAvailableTimes().map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn(
                          "h-14 text-base font-medium min-h-[44px] transition-all duration-300 flex flex-col gap-1 relative",
                          selectedTime === time
                            ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg shadow-yellow-600/30 ring-2 ring-yellow-600/30"
                            : "hover:bg-yellow-500/20 hover:border-yellow-500 hover:shadow-md border-zinc-600 text-zinc-200 bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 backdrop-blur-sm hover:text-yellow-300",
                        )}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <Clock className="h-4 w-4" />
                        <span>{time}h</span>
                        {selectedTime === time && <CheckCircle2 className="h-4 w-4 absolute top-2 right-2" />}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-4 space-y-6 relative z-10">
              <div className="text-center">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Quase Pronto!
                </h3>
                <p className="text-sm text-zinc-300 mt-1">
                  Só precisamos de alguns dados para confirmar seu agendamento
                </p>
              </div>

              <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/30 shadow-lg backdrop-blur-sm">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 text-yellow-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Resumo do Agendamento
                  </h4>
                  <div className="space-y-2 text-sm text-zinc-200">
                    <div className="flex justify-between">
                      <span>Serviço:</span>
                      <span className="font-medium text-white">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span className="font-medium text-white">{selectedDate?.toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Horário:</span>
                      <span className="font-medium text-white">{selectedTime}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duração:</span>
                      <span className="font-medium text-white">{selectedService?.duration}</span>
                    </div>
                    <div className="border-t border-yellow-500/30 pt-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-zinc-200">Total:</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                          R$ {selectedService?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base font-medium flex items-center gap-2 text-zinc-200">
                    <User className="h-4 w-4 text-yellow-400" />
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={cn(
                      "h-12 text-base mt-2 transition-all duration-200 min-h-[44px] bg-zinc-800/50 border-zinc-600 text-white placeholder:text-zinc-400 backdrop-blur-sm",
                      errors.name
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                        : customerInfo.name
                          ? "border-green-400 focus:border-green-500 focus:ring-green-500/30"
                          : "focus:border-yellow-500 focus:ring-yellow-500/30",
                    )}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                  {customerInfo.name && !errors.name && (
                    <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Perfeito!
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium flex items-center gap-2 text-zinc-200">
                    <Mail className="h-4 w-4 text-yellow-400" />
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn(
                      "h-12 text-base mt-2 transition-all duration-200 min-h-[44px] bg-zinc-800/50 border-zinc-600 text-white placeholder:text-zinc-400 backdrop-blur-sm",
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                        : customerInfo.email
                          ? "border-green-400 focus:border-green-500 focus:ring-green-500/30"
                          : "focus:border-yellow-500 focus:ring-yellow-500/30",
                    )}
                    placeholder="Digite seu e-mail"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                  {customerInfo.email && !errors.email && (
                    <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Enviaremos a confirmação aqui
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2 text-zinc-200">
                    <Phone className="h-4 w-4 text-yellow-400" />
                    Telefone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={cn(
                      "h-12 text-base mt-2 transition-all duration-200 min-h-[44px] bg-zinc-800/50 border-zinc-600 text-white placeholder:text-zinc-400 backdrop-blur-sm",
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/30"
                        : customerInfo.phone
                          ? "border-green-400 focus:border-green-500 focus:ring-green-500/30"
                          : "focus:border-yellow-500 focus:ring-yellow-500/30",
                    )}
                    placeholder="Digite seu telefone"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                  {customerInfo.phone && !errors.phone && (
                    <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Para lembretes do agendamento
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes" className="text-base font-medium flex items-center gap-2 text-zinc-200">
                    <MessageSquare className="h-4 w-4 text-yellow-400" />
                    Observações (Opcional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="min-h-20 text-base mt-2 bg-zinc-800/50 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:ring-yellow-500/30 backdrop-blur-sm"
                    placeholder="Alguma observação especial para seu barbeiro..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 p-4 border-t border-yellow-500/30 bg-gradient-to-r from-zinc-900 to-zinc-800">
          {step < 4 ? (
            <div className="flex justify-between items-center">
              <div className="text-sm text-zinc-700">
                <span className="font-medium">
                  Etapa {step} de {totalSteps}
                </span>
                <div className="text-xs text-zinc-500 mt-1">Progresso salvo automaticamente</div>
              </div>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className={cn(
                  "px-8 h-12 text-base font-medium shadow-lg transition-all duration-300 min-h-[44px]",
                  canProceed()
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-yellow-600/30 hover:shadow-lg hover:scale-105"
                    : "bg-zinc-300 text-zinc-500 cursor-not-allowed",
                )}
              >
                Continuar
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={cn(
                "w-full h-12 text-base font-medium shadow-lg transition-all duration-300 min-h-[44px]",
                canProceed() && !isSubmitting
                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-green-600/30 hover:shadow-lg hover:scale-105"
                  : "bg-zinc-300 text-zinc-500 cursor-not-allowed",
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Confirmando Agendamento...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar Agendamento
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
