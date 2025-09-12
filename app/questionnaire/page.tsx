'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Stepper } from '@/components/ui/Stepper'
import { useQuoteStore } from '@/stores/useQuoteStore'
import { businessTypes, industries, timelines, budgets } from '@/data/services'
import { validateEmail, validatePhoneNumber } from '@/utils/helpers'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

const steps = [
  'Business Info',
  'Project Details',
  'Timeline & Budget',
  'Goals & Audience',
  'Review & Submit'
]

export default function QuestionnairePage() {
  const router = useRouter()
  const { 
    selectedService, 
    selectedPackage, 
    formData, 
    currentStep, 
    updateFormData, 
    nextStep, 
    previousStep,
    generateQuote 
  } = useQuoteStore()

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  useEffect(() => {
    if (!selectedService || !selectedPackage) {
      router.push('/services')
    }
  }, [selectedService, selectedPackage, router])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.businessName) newErrors.businessName = 'Business name is required'
        if (!formData.businessType) newErrors.businessType = 'Business type is required'
        if (!formData.industry) newErrors.industry = 'Industry is required'
        if (!formData.contactEmail) newErrors.contactEmail = 'Email is required'
        else if (!validateEmail(formData.contactEmail)) newErrors.contactEmail = 'Please enter a valid email'
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
        else if (!validatePhoneNumber(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid Kenyan phone number'
        break
      case 2:
        if (!formData.contentReadiness) newErrors.contentReadiness = 'Please select content readiness'
        if (!formData.assetsAvailable) newErrors.assetsAvailable = 'Please select assets availability'
        break
      case 3:
        if (!formData.timeline) newErrors.timeline = 'Please select timeline'
        if (!formData.budget) newErrors.budget = 'Please select budget range'
        break
      case 4:
        if (!formData.projectGoals) newErrors.projectGoals = 'Project goals are required'
        if (!formData.targetAudience) newErrors.targetAudience = 'Target audience is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === steps.length) {
        generateQuote()
        router.push('/quote')
      } else {
        nextStep()
      }
    }
  }

  const handlePrevious = () => {
    previousStep()
  }

  const handleInputChange = (key: string, value: any) => {
    updateFormData(key as any, value)
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  if (!selectedService || !selectedPackage) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Questionnaire</h1>
              <p className="text-gray-600">
                {selectedService.name} - {selectedPackage.name}
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.push('/services')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
          
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            {currentStep === 1 && (
              <BusinessInfoStep 
                formData={formData} 
                errors={errors}
                onInputChange={handleInputChange}
              />
            )}
            
            {currentStep === 2 && (
              <ProjectDetailsStep 
                formData={formData} 
                errors={errors}
                onInputChange={handleInputChange}
                selectedService={selectedService}
              />
            )}
            
            {currentStep === 3 && (
              <TimelineBudgetStep 
                formData={formData} 
                errors={errors}
                onInputChange={handleInputChange}
              />
            )}
            
            {currentStep === 4 && (
              <GoalsAudienceStep 
                formData={formData} 
                errors={errors}
                onInputChange={handleInputChange}
              />
            )}
            
            {currentStep === 5 && (
              <ReviewStep 
                formData={formData}
                selectedService={selectedService}
                selectedPackage={selectedPackage}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>
          
          <Button onClick={handleNext}>
            {currentStep === steps.length ? 'Generate Quote' : 'Next'}
            {currentStep < steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Step Components
function BusinessInfoStep({ formData, errors, onInputChange }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>
      <p className="text-gray-600 mb-8">
        Tell us about your business so we can tailor our services to your needs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            value={formData.businessName || ''}
            onChange={(e) => onInputChange('businessName', e.target.value)}
            className={`input-field ${errors.businessName ? 'border-red-300' : ''}`}
            placeholder="Enter your business name"
          />
          {errors.businessName && (
            <p className="text-sm text-red-600 mt-1">{errors.businessName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type *
          </label>
          <select
            value={formData.businessType || ''}
            onChange={(e) => onInputChange('businessType', e.target.value)}
            className={`input-field ${errors.businessType ? 'border-red-300' : ''}`}
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.businessType && (
            <p className="text-sm text-red-600 mt-1">{errors.businessType}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            value={formData.industry || ''}
            onChange={(e) => onInputChange('industry', e.target.value)}
            className={`input-field ${errors.industry ? 'border-red-300' : ''}`}
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-sm text-red-600 mt-1">{errors.industry}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            value={formData.contactEmail || ''}
            onChange={(e) => onInputChange('contactEmail', e.target.value)}
            className={`input-field ${errors.contactEmail ? 'border-red-300' : ''}`}
            placeholder="your@email.com"
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            className={`input-field ${errors.phoneNumber ? 'border-red-300' : ''}`}
            placeholder="+254 700 000 000 or 0700 000 000"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">{errors.phoneNumber}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Include country code (+254) or start with 0
          </p>
        </div>
      </div>
    </div>
  )
}

function ProjectDetailsStep({ formData, errors, onInputChange, selectedService }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
      <p className="text-gray-600 mb-8">
        Help us understand your current situation and what you need for this project.
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How ready is your content? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: 'not-started', label: 'Not started - need help creating content' },
              { value: 'partial', label: 'Partially ready - have some content' },
              { value: 'mostly-ready', label: 'Mostly ready - just need organization' },
              { value: 'complete', label: 'Complete - all content ready to go' }
            ].map(option => (
              <label key={option.value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="contentReadiness"
                  value={option.value}
                  checked={formData.contentReadiness === option.value}
                  onChange={(e) => onInputChange('contentReadiness', e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.contentReadiness && (
            <p className="text-sm text-red-600 mt-2">{errors.contentReadiness}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What assets do you currently have? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: 'none', label: 'No assets - need everything created' },
              { value: 'basic', label: 'Basic assets - logo, some images' },
              { value: 'good', label: 'Good assets - professional photos, branding' },
              { value: 'excellent', label: 'Excellent assets - high-quality everything' }
            ].map(option => (
              <label key={option.value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="assetsAvailable"
                  value={option.value}
                  checked={formData.assetsAvailable === option.value}
                  onChange={(e) => onInputChange('assetsAvailable', e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.assetsAvailable && (
            <p className="text-sm text-red-600 mt-2">{errors.assetsAvailable}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function TimelineBudgetStep({ formData, errors, onInputChange }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline & Budget</h2>
      <p className="text-gray-600 mb-8">
        When do you need this project completed and what's your budget range?
      </p>
      
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Project Timeline *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {timelines.map(timeline => (
              <label key={timeline} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="timeline"
                  value={timeline}
                  checked={formData.timeline === timeline}
                  onChange={(e) => onInputChange('timeline', e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{timeline}</span>
              </label>
            ))}
          </div>
          {errors.timeline && (
            <p className="text-sm text-red-600 mt-2">{errors.timeline}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Budget Range *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgets.map(budget => (
              <label key={budget} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  checked={formData.budget === budget}
                  onChange={(e) => onInputChange('budget', e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{budget}</span>
              </label>
            ))}
          </div>
          {errors.budget && (
            <p className="text-sm text-red-600 mt-2">{errors.budget}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function GoalsAudienceStep({ formData, errors, onInputChange }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Goals & Target Audience</h2>
      <p className="text-gray-600 mb-8">
        Help us understand your project goals and who you're trying to reach.
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your main project goals? *
          </label>
          <textarea
            value={formData.projectGoals || ''}
            onChange={(e) => onInputChange('projectGoals', e.target.value)}
            className={`input-field ${errors.projectGoals ? 'border-red-300' : ''}`}
            rows={4}
            placeholder="e.g., Increase online sales, build brand awareness, attract more customers..."
          />
          {errors.projectGoals && (
            <p className="text-sm text-red-600 mt-1">{errors.projectGoals}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who is your target audience? *
          </label>
          <textarea
            value={formData.targetAudience || ''}
            onChange={(e) => onInputChange('targetAudience', e.target.value)}
            className={`input-field ${errors.targetAudience ? 'border-red-300' : ''}`}
            rows={4}
            placeholder="e.g., Young professionals aged 25-35, small business owners, families with children..."
          />
          {errors.targetAudience && (
            <p className="text-sm text-red-600 mt-1">{errors.targetAudience}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={formData.additionalNotes || ''}
            onChange={(e) => onInputChange('additionalNotes', e.target.value)}
            className="input-field"
            rows={3}
            placeholder="Any other information that would help us understand your project better..."
          />
        </div>
      </div>
    </div>
  )
}

function ReviewStep({ formData, selectedService, selectedPackage }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h2>
      <p className="text-gray-600 mb-8">
        Please review your information before we generate your custom quote.
      </p>
      
      <div className="space-y-8">
        {/* Service Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Service</h3>
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{selectedService.icon}</div>
            <div>
              <p className="font-medium text-gray-900">{selectedService.name}</p>
              <p className="text-gray-600">{selectedPackage.name}</p>
            </div>
          </div>
        </div>
        
        {/* Business Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Business Name</p>
              <p className="font-medium">{formData.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Business Type</p>
              <p className="font-medium">{formData.businessType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Industry</p>
              <p className="font-medium">{formData.industry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Email</p>
              <p className="font-medium">{formData.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="font-medium">{formData.phoneNumber}</p>
            </div>
          </div>
        </div>
        
        {/* Project Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Content Readiness</p>
              <p className="font-medium">{formData.contentReadiness}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Assets Available</p>
              <p className="font-medium">{formData.assetsAvailable}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Timeline</p>
              <p className="font-medium">{formData.timeline}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Budget Range</p>
              <p className="font-medium">{formData.budget}</p>
            </div>
          </div>
        </div>
        
        {/* Goals */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Goals</h3>
          <p className="text-gray-700">{formData.projectGoals}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Audience</h3>
          <p className="text-gray-700">{formData.targetAudience}</p>
        </div>
        
        {formData.additionalNotes && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
            <p className="text-gray-700">{formData.additionalNotes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
