import React from 'react'
import { cn } from '@/utils/helpers'
import { Check } from 'lucide-react'

interface StepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep
          
          return (
            <div key={step} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200',
                    isCompleted && 'bg-primary-600 text-white',
                    isCurrent && 'bg-primary-100 text-primary-600 border-2 border-primary-600',
                    isUpcoming && 'bg-gray-200 text-gray-500'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium hidden sm:block',
                    isCompleted && 'text-primary-600',
                    isCurrent && 'text-primary-600',
                    isUpcoming && 'text-gray-500'
                  )}
                >
                  {step}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 transition-colors duration-200',
                    stepNumber < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
