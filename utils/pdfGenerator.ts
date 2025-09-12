import html2pdf from 'html2pdf.js'
import { QuoteState } from '@/stores/useQuoteStore'
import { formatCurrency, formatDate } from './helpers'

export function generateQuotePDF(quoteData: {
  selectedService: any;
  selectedPackage: any;
  formData: any;
  quoteId: string;
  generatedAt: Date | null;
}): Promise<void> {
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

export function createQuoteHTML(quoteData: {
  selectedService: any;
  selectedPackage: any;
  formData: any;
  quoteId: string;
  generatedAt: Date | null;
}): string {
  const { selectedService, selectedPackage, formData, quoteId, generatedAt } = quoteData
  
  if (!selectedService || !selectedPackage) {
    throw new Error('Missing service or package data')
  }

  const totalPrice = selectedPackage.price
  const addOnsTotal = 0 // Calculate from selected add-ons
  
  return `
    <div id="quote-content" class="p-8 max-w-4xl mx-auto bg-white">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Creative Agency Kenya</h1>
        <p class="text-gray-600">Professional Creative Services</p>
        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">Quote ID: ${quoteId}</p>
          <p class="text-sm text-gray-600">Generated: ${generatedAt ? formatDate(generatedAt) : formatDate(new Date())}</p>
        </div>
      </div>

      <!-- Client Information -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Client Information</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-600">Business Name</p>
            <p class="font-medium">${formData.businessName || 'Not provided'}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Contact Email</p>
            <p class="font-medium">${formData.contactEmail || 'Not provided'}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Phone Number</p>
            <p class="font-medium">${formData.phoneNumber || 'Not provided'}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Business Type</p>
            <p class="font-medium">${formData.businessType || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <!-- Service Details -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-2">${selectedService.name}</h3>
          <p class="text-gray-600 mb-4">${selectedService.description}</p>
          
          <div class="border-t pt-4">
            <h4 class="font-medium text-gray-900 mb-2">Selected Package: ${selectedPackage.name}</h4>
            <p class="text-gray-600 mb-4">${selectedPackage.description}</p>
            
            <div class="mb-4">
              <h5 class="font-medium text-gray-900 mb-2">Package Features:</h5>
              <ul class="list-disc list-inside text-gray-600 space-y-1">
                ${selectedPackage.features.map((feature: string) => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Pricing Breakdown</h2>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">${selectedPackage.name}</span>
            <span class="font-medium">${formatCurrency(selectedPackage.price)}</span>
          </div>
          ${addOnsTotal > 0 ? `
            <div class="flex justify-between items-center py-2 border-b">
              <span class="text-gray-600">Add-ons</span>
              <span class="font-medium">${formatCurrency(addOnsTotal)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between items-center py-2 text-lg font-semibold">
            <span>Total</span>
            <span>${formatCurrency(totalPrice + addOnsTotal)}</span>
          </div>
        </div>
      </div>

      <!-- Payment Terms -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Payment Schedule</h4>
              <p class="text-gray-600">50% upfront payment</p>
              <p class="text-gray-600">50% upon project completion</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Accepted Payment Methods</h4>
              <p class="text-gray-600">• M-Pesa</p>
              <p class="text-gray-600">• Bank Transfer</p>
              <p class="text-gray-600">• PayPal</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
        <div class="bg-blue-50 p-6 rounded-lg">
          <p class="text-gray-700 mb-4">
            Ready to get started? Contact us to confirm this quote and begin your project.
          </p>
          <div class="space-y-2">
            <p class="text-sm text-gray-600">📱 WhatsApp: +254 700 000 000</p>
            <p class="text-sm text-gray-600">📧 Email: hello@creativeagency.co.ke</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-500 border-t pt-4">
        <p>Thank you for considering Creative Agency Kenya for your project!</p>
        <p class="mt-2">This quote is valid for 30 days from the date of generation.</p>
      </div>
    </div>
  `
}
