import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ServicePackage {
  id: string
  name: string
  price: number
  features: string[]
  description: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  packages: ServicePackage[]
}

export interface FormData {
  businessType: string
  industry: string
  businessName: string
  contactEmail: string
  phoneNumber: string
  contentReadiness: string
  assetsAvailable: string
  timeline: string
  budget: string
  projectGoals: string
  targetAudience: string
  addOns: string[]
  additionalNotes: string
}

export interface QuoteState {
  // Service selection
  selectedService: Service | null
  selectedPackage: ServicePackage | null
  
  // Form data
  formData: Partial<FormData>
  currentStep: number
  totalSteps: number
  
  // Quote details
  quoteId: string
  generatedAt: Date | null
  
  // Actions
  setSelectedService: (service: Service) => void
  setSelectedPackage: (pkg: ServicePackage) => void
  updateFormData: (key: keyof FormData, value: any) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  generateQuote: () => void
  reset: () => void
}

const initialFormData: Partial<FormData> = {
  businessType: '',
  industry: '',
  businessName: '',
  contactEmail: '',
  phoneNumber: '',
  contentReadiness: '',
  assetsAvailable: '',
  timeline: '',
  budget: '',
  projectGoals: '',
  targetAudience: '',
  addOns: [],
  additionalNotes: '',
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      selectedService: null,
      selectedPackage: null,
      formData: initialFormData,
      currentStep: 1,
      totalSteps: 5,
      quoteId: '',
      generatedAt: null,

      setSelectedService: (service) => set({ selectedService: service }),
      
      setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),
      
      updateFormData: (key, value) =>
        set((state) => ({
          formData: { ...state.formData, [key]: value }
        })),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep, totalSteps } = get()
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 })
        }
      },
      
      previousStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 })
        }
      },
      
      generateQuote: () => {
        const quoteId = `Q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        set({ 
          quoteId,
          generatedAt: new Date()
        })
      },
      
      reset: () => set({
        selectedService: null,
        selectedPackage: null,
        formData: initialFormData,
        currentStep: 1,
        quoteId: '',
        generatedAt: null
      })
    }),
    {
      name: 'quote-storage',
      partialize: (state) => ({
        selectedService: state.selectedService,
        selectedPackage: state.selectedPackage,
        formData: state.formData,
        currentStep: state.currentStep,
        quoteId: state.quoteId,
        generatedAt: state.generatedAt
      })
    }
  )
)
