import { Service } from '@/stores/useQuoteStore'

export const services: Service[] = [
  {
    id: 'web-design',
    name: 'Web Design & Development',
    description: 'Professional websites that convert visitors into customers',
    icon: '🌐',
    packages: [
      {
        id: 'web-starter',
        name: 'Starter Website',
        price: 25000,
        description: 'Perfect for small businesses and personal brands',
        features: [
          'Up to 5 pages',
          'Mobile responsive design',
          'Contact form',
          'Basic SEO setup',
          '1 month support',
          '2 rounds of revisions'
        ]
      },
      {
        id: 'web-standard',
        name: 'Standard Website',
        price: 45000,
        description: 'Ideal for growing businesses with more complex needs',
        features: [
          'Up to 10 pages',
          'Mobile responsive design',
          'Contact forms & newsletter signup',
          'Advanced SEO optimization',
          'Google Analytics integration',
          '3 months support',
          '3 rounds of revisions',
          'Content management system'
        ]
      },
      {
        id: 'web-premium',
        name: 'Premium Website',
        price: 75000,
        description: 'Full-featured websites for established businesses',
        features: [
          'Unlimited pages',
          'Custom design & animations',
          'E-commerce functionality',
          'Advanced integrations',
          'Performance optimization',
          '6 months support',
          'Unlimited revisions',
          'Admin dashboard',
          'Multi-language support'
        ]
      }
    ]
  },
  {
    id: 'graphics',
    name: 'Graphics & Branding',
    description: 'Visual identity that makes your brand memorable',
    icon: '🎨',
    packages: [
      {
        id: 'graphics-starter',
        name: 'Brand Starter',
        price: 15000,
        description: 'Essential branding for new businesses',
        features: [
          'Logo design (3 concepts)',
          'Business card design',
          'Letterhead design',
          'Color palette',
          'Typography guide',
          '2 rounds of revisions'
        ]
      },
      {
        id: 'graphics-standard',
        name: 'Brand Standard',
        price: 30000,
        description: 'Comprehensive branding package',
        features: [
          'Logo design (5 concepts)',
          'Complete brand identity',
          'Business stationery set',
          'Social media templates',
          'Brand guidelines document',
          '3 rounds of revisions',
          'File formats (AI, EPS, PNG, JPG)'
        ]
      },
      {
        id: 'graphics-premium',
        name: 'Brand Premium',
        price: 50000,
        description: 'Full brand ecosystem development',
        features: [
          'Logo design (unlimited concepts)',
          'Complete brand identity system',
          'Marketing materials design',
          'Website mockups',
          'Brand guidelines & style guide',
          'Unlimited revisions',
          'All file formats',
          'Brand consultation session'
        ]
      }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    description: 'Engaging content that builds your community',
    icon: '📱',
    packages: [
      {
        id: 'social-starter',
        name: 'Social Starter',
        price: 20000,
        description: 'Essential social media presence',
        features: [
          '2 platforms (Facebook & Instagram)',
          '15 posts per month',
          'Basic graphics & captions',
          'Hashtag research',
          'Monthly analytics report',
          'Community management'
        ]
      },
      {
        id: 'social-standard',
        name: 'Social Standard',
        price: 35000,
        description: 'Comprehensive social media strategy',
        features: [
          '3 platforms (Facebook, Instagram, Twitter)',
          '25 posts per month',
          'Custom graphics & videos',
          'Content calendar',
          'Engagement strategies',
          'Weekly analytics reports',
          'Influencer outreach'
        ]
      },
      {
        id: 'social-premium',
        name: 'Social Premium',
        price: 55000,
        description: 'Full-service social media management',
        features: [
          'All major platforms',
          '40+ posts per month',
          'Video content creation',
          'Paid advertising management',
          'Influencer partnerships',
          'Daily analytics monitoring',
          'Crisis management',
          'Strategy consultation'
        ]
      }
    ]
  },
  {
    id: 'bundles',
    name: 'Complete Packages',
    description: 'All-in-one solutions for maximum impact',
    icon: '🚀',
    packages: [
      {
        id: 'bundle-starter',
        name: 'Business Starter',
        price: 50000,
        description: 'Everything you need to launch your business online',
        features: [
          'Starter website (5 pages)',
          'Basic branding package',
          'Social media setup',
          'Google My Business setup',
          'Basic SEO optimization',
          '3 months support'
        ]
      },
      {
        id: 'bundle-standard',
        name: 'Business Growth',
        price: 90000,
        description: 'Comprehensive digital presence for growing businesses',
        features: [
          'Standard website (10 pages)',
          'Complete branding package',
          '3 months social media management',
          'Advanced SEO setup',
          'Analytics & reporting',
          '6 months support'
        ]
      },
      {
        id: 'bundle-premium',
        name: 'Business Elite',
        price: 150000,
        description: 'Premium digital ecosystem for established businesses',
        features: [
          'Premium website (unlimited pages)',
          'Full brand ecosystem',
          '6 months social media management',
          'E-commerce integration',
          'Paid advertising setup',
          '12 months support',
          'Priority support & consultation'
        ]
      }
    ]
  }
]

export const addOns = [
  {
    id: 'seo-optimization',
    name: 'SEO Optimization',
    price: 10000,
    description: 'Advanced search engine optimization'
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    price: 15000,
    description: 'Professional copywriting and content strategy'
  },
  {
    id: 'photography',
    name: 'Professional Photography',
    price: 20000,
    description: 'Product and lifestyle photography'
  },
  {
    id: 'video-production',
    name: 'Video Production',
    price: 25000,
    description: 'Promotional and explainer videos'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing Setup',
    price: 8000,
    description: 'Newsletter design and automation setup'
  },
  {
    id: 'analytics-setup',
    name: 'Analytics & Tracking',
    price: 5000,
    description: 'Google Analytics and conversion tracking setup'
  }
]

export const businessTypes = [
  'Small Business',
  'Startup',
  'NGO/Non-profit',
  'Artist/Creative',
  'E-commerce Store',
  'Restaurant/Cafe',
  'Salon/Beauty',
  'Consulting Firm',
  'Other'
]

export const industries = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance',
  'Retail',
  'Food & Beverage',
  'Beauty & Wellness',
  'Real Estate',
  'Entertainment',
  'Non-profit',
  'Other'
]

export const timelines = [
  'ASAP (1-2 weeks)',
  '1 month',
  '2-3 months',
  '3-6 months',
  'Flexible'
]

export const budgets = [
  'Under KES 30,000',
  'KES 30,000 - 50,000',
  'KES 50,000 - 100,000',
  'KES 100,000 - 200,000',
  'KES 200,000+',
  'Not sure yet'
]
