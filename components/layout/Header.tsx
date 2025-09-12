'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useQuoteStore } from '@/stores/useQuoteStore'

export function Header() {
  const { selectedService, selectedPackage } = useQuoteStore()
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Creative Agency Kenya
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Terms
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            {selectedService && selectedPackage ? (
              <Link href="/questionnaire">
                <Button size="sm">
                  Continue Quote
                </Button>
              </Link>
            ) : (
              <Link href="/services">
                <Button size="sm">
                  Get Quote
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
