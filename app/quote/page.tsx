'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useQuoteStore } from '@/stores/useQuoteStore'
import { addOns } from '@/data/services'
import { formatCurrency, generateWhatsAppMessage, generateWhatsAppUrl } from '@/utils/helpers'
// Dynamic import for PDF generation to avoid SSR issues
const generateQuotePDF = async (quoteData: any) => {
  const { default: html2pdf } = await import('html2pdf.js')
  const element = document.getElementById('quote-content')
  
  if (!element) {
    throw new Error('Quote content element not found')
  }

  const opt = {
    margin: 1,
    filename: `quote-${quoteData.quoteId}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  return html2pdf().set(opt).from(element).save()
}
import { ArrowLeft, Download, MessageCircle, Mail, CheckCircle, Star } from 'lucide-react'

export default function QuotePage() {
  const router = useRouter()
  const { 
    selectedService, 
    selectedPackage, 
    formData, 
    quoteId, 
    generatedAt,
    reset 
  } = useQuoteStore()
  
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    if (!selectedService || !selectedPackage) {
      router.push('/services')
    }
  }, [selectedService, selectedPackage, router])

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const calculateTotal = () => {
    const basePrice = selectedPackage?.price || 0
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    return basePrice + addOnPrice
  }

  const handleExportPDF = async () => {
    if (!selectedService || !selectedPackage) return
    
    setIsGeneratingPDF(true)
    try {
      // Generate PDF using the existing quote content
      await generateQuotePDF({
        selectedService,
        selectedPackage,
        formData,
        quoteId: quoteId || 'Q-' + Date.now(),
        generatedAt: generatedAt || new Date()
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleWhatsAppContact = () => {
    if (!selectedService || !selectedPackage) return
    
    const message = generateWhatsAppMessage(
      selectedService.name,
      selectedPackage.name,
      calculateTotal(),
      formData.businessName || '',
      formData.contactEmail || ''
    )
    
    const whatsappUrl = generateWhatsAppUrl('254700000000', message)
    window.open(whatsappUrl, '_blank')
  }

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Quote Inquiry - ${selectedService?.name}`)
    const body = encodeURIComponent(`
Hi,

I'm interested in proceeding with the quote for:

Service: ${selectedService?.name}
Package: ${selectedPackage?.name}
Total: ${formatCurrency(calculateTotal())}
Quote ID: ${quoteId}

Please let me know the next steps.

Best regards,
${formData.businessName}
${formData.contactEmail}
    `)
    
    window.open(`mailto:hello@creativeagency.co.ke?subject=${subject}&body=${body}`)
  }

  const handleStartNewQuote = () => {
    reset()
    router.push('/services')
  }

  if (!selectedService || !selectedPackage) {
    return null
  }

  const total = calculateTotal()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Custom Quote</h1>
              <p className="text-gray-600">
                Quote ID: {quoteId || 'Q-' + Date.now()}
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.push('/services')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hidden content for PDF generation */}
        <div id="quote-content" className="hidden">
          <div className="p-8 max-w-4xl mx-auto bg-white">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Creative Agency Kenya</h1>
              <p className="text-gray-600">Professional Creative Services</p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Quote ID: {quoteId || 'Q-' + Date.now()}</p>
                <p className="text-sm text-gray-600">Generated: {generatedAt ? new Date(generatedAt).toLocaleDateString('en-KE') : new Date().toLocaleDateString('en-KE')}</p>
              </div>
            </div>

            {/* Client Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Business Name</p>
                  <p className="font-medium">{formData.businessName || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Email</p>
                  <p className="font-medium">{formData.contactEmail || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium">{formData.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Business Type</p>
                  <p className="font-medium">{formData.businessType || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedService.name}</h3>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Package: {selectedPackage.name}</h4>
                  <p className="text-gray-600 mb-4">{selectedPackage.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Package Features:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedPackage.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Breakdown</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">{selectedPackage.name}</span>
                  <span className="font-medium">{formatCurrency(selectedPackage.price)}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Add-ons</span>
                    <span className="font-medium">{formatCurrency(selectedAddOns.reduce((total, addOnId) => {
                      const addOn = addOns.find(a => a.id === addOnId)
                      return total + (addOn?.price || 0)
                    }, 0))}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Payment Schedule</h4>
                    <p className="text-gray-600">50% upfront payment</p>
                    <p className="text-gray-600">50% upon project completion</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Accepted Payment Methods</h4>
                    <p className="text-gray-600">• M-Pesa</p>
                    <p className="text-gray-600">• Bank Transfer</p>
                    <p className="text-gray-600">• PayPal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Ready to get started? Contact us to confirm this quote and begin your project.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">📱 WhatsApp: +254 700 000 000</p>
                  <p className="text-sm text-gray-600">📧 Email: hello@creativeagency.co.ke</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 border-t pt-4">
              <p>Thank you for considering Creative Agency Kenya for your project!</p>
              <p className="mt-2">This quote is valid for 30 days from the date of generation.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quote Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{selectedService.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedService.name}</h2>
                  <p className="text-gray-600">{selectedPackage.name}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Package Features:</h3>
                <ul className="space-y-1">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Add-ons Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Add-ons</h3>
              <p className="text-gray-600 mb-4">
                Enhance your project with these additional services:
              </p>
              
              <div className="space-y-3">
                {addOns.map((addOn) => (
                  <label
                    key={addOn.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddOns.includes(addOn.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes(addOn.id)}
                        onChange={() => handleAddOnToggle(addOn.id)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{addOn.name}</p>
                        <p className="text-sm text-gray-600">{addOn.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-600">
                        {formatCurrency(addOn.price)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Business</p>
                  <p className="font-medium">{formData.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="font-medium">{formData.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Industry</p>
                  <p className="font-medium">{formData.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget Range</p>
                  <p className="font-medium">{formData.budget}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedPackage.name}</span>
                  <span className="font-medium">{formatCurrency(selectedPackage.price)}</span>
                </div>
                
                {selectedAddOns.map((addOnId) => {
                  const addOn = addOns.find(a => a.id === addOnId)
                  return addOn ? (
                    <div key={addOnId} className="flex justify-between">
                      <span className="text-gray-600">{addOn.name}</span>
                      <span className="font-medium">{formatCurrency(addOn.price)}</span>
                    </div>
                  ) : null
                })}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• 50% upfront payment</p>
                  <p>• 50% upon completion</p>
                  <p>• M-Pesa, Bank Transfer, PayPal</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <Button 
                onClick={handleExportPDF}
                disabled={isGeneratingPDF}
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF Quote'}
              </Button>
              
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline"
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue via WhatsApp
              </Button>
              
              <Button 
                onClick={handleEmailContact}
                variant="outline"
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send via Email
              </Button>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-3">
                "Professional service and great results. The website they created for my business 
                has brought in so many new customers!"
              </p>
              <p className="text-sm font-medium text-gray-900">- Sarah M., Nairobi Salon</p>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us to confirm this quote and begin your project. 
              We're here to help you succeed!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleWhatsAppContact} size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start via WhatsApp
              </Button>
              <Button onClick={handleStartNewQuote} variant="outline" size="lg">
                Create New Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
