import { addOns } from '@/data/services'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateWhatsAppMessage(
  serviceName: string,
  packageName: string,
  totalPrice: number,
  businessName: string,
  contactEmail: string
): string {
  const message = `Hi! I'm interested in your creative services.

Service: ${serviceName}
Package: ${packageName}
Total: ${formatCurrency(totalPrice)}
Business: ${businessName}
Email: ${contactEmail}

I'd like to discuss this quote and proceed with the project. When can we schedule a consultation?`

  return encodeURIComponent(message)
}

export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function calculateTotalPrice(
  packagePrice: number,
  selectedAddOns: string[]
): number {
  const addOnPrices = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOns.find(a => a.id === addOnId)
    return total + (addOn?.price || 0)
  }, 0)
  
  return packagePrice + addOnPrices
}

export function generateQuoteId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `Q-${timestamp}-${random}`.toUpperCase()
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhoneNumber(phone: string): boolean {
  // Kenyan phone number validation (starts with +254 or 0)
  const phoneRegex = /^(\+254|0)[17]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
