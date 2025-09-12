'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Clock, CreditCard, FileText, Shield, Users } from 'lucide-react'

export default function TermsPage() {
  const policies = [
    {
      icon: Clock,
      title: 'Project Timeline',
      items: [
        'Standard projects: 2-4 weeks delivery',
        'Rush projects: 1-2 weeks (additional 25% fee)',
        'Complex projects: 4-8 weeks delivery',
        'Timeline starts after 50% upfront payment'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      items: [
        '50% upfront payment required to start project',
        '50% balance due upon project completion',
        'Accepted: M-Pesa, Bank Transfer, PayPal',
        'All prices in KES (Kenyan Shillings)'
      ]
    },
    {
      icon: FileText,
      title: 'Revisions Policy',
      items: [
        'Starter packages: 2 rounds of revisions',
        'Standard packages: 3 rounds of revisions',
        'Premium packages: Unlimited revisions',
        'Additional revisions: KES 2,000 per round'
      ]
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      items: [
        '100% satisfaction guarantee',
        'Free fixes for technical issues (30 days)',
        'Professional quality standards',
        'Mobile-responsive design included'
      ]
    },
    {
      icon: Users,
      title: 'Communication',
      items: [
        'Primary: WhatsApp (+254 700 000 000)',
        'Email: hello@creativeagency.co.ke',
        'Response time: Within 24 hours',
        'Project updates: Weekly progress reports'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Delivery & Files',
      items: [
        'All source files provided upon final payment',
        'File formats: AI, EPS, PNG, JPG, PDF',
        'Web projects: Fully functional website',
        'Social media: Content calendar + assets'
      ]
    }
  ]

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Most projects are completed within 2-4 weeks. Complex projects may take 4-8 weeks. Rush projects can be completed in 1-2 weeks with an additional 25% fee.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa, Bank Transfer, and PayPal. All payments are processed in Kenyan Shillings (KES).'
    },
    {
      question: 'Can I make changes after the project starts?',
      answer: 'Yes! Each package includes a specific number of revision rounds. Additional revisions beyond the included amount cost KES 2,000 per round.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we provide 30 days of free technical support after project completion. Extended support packages are available for ongoing maintenance.'
    },
    {
      question: 'What if I\'m not satisfied with the work?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with the final result, we\'ll work with you to make it right or provide a full refund.'
    },
    {
      question: 'Do you work with businesses outside Kenya?',
      answer: 'Yes! While we specialize in the Kenyan market, we work with clients worldwide. International payments can be made via PayPal.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service & Policies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear, transparent policies to ensure a smooth working relationship. 
              We believe in fair terms and excellent service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <policy.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                </div>
                <ul className="space-y-2">
                  {policy.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our services and policies
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              We're here to clarify any questions you might have about our policies, 
              pricing, or process. Contact us anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/254700000000" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  📱 WhatsApp Us
                </Button>
              </a>
              <a href="mailto:hello@creativeagency.co.ke">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  📧 Email Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © 2024 Creative Agency Kenya. All rights reserved. | 
              Terms of Service | Privacy Policy | 
              Last updated: {new Date().toLocaleDateString('en-KE')}
            </p>
            <p className="text-xs mt-2">
              This document outlines the terms and conditions for our creative services. 
              By engaging our services, you agree to these terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
