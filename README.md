# 🇰🇪 Creative Agency Kenya - Quoting Tool

A modern, mobile-first web application for Kenyan creative agencies to streamline their quoting process. Built with Next.js, TailwindCSS, and Zustand for state management.

## ✨ Features

- **Landing Page** - Professional agency introduction with Kenyan branding
- **Service Explorer** - Interactive service selection (Web Design, Graphics, Social Media, Bundles)
- **Tiered Pricing** - Clear package options with transparent KES pricing
- **Multi-step Questionnaire** - Dynamic form that adapts based on service selection
- **Quote Summary** - Professional quote generation with pricing breakdown
- **PDF Export** - Download quotes as professional PDF documents
- **WhatsApp Integration** - Direct contact via WhatsApp with pre-filled messages
- **Mobile-First Design** - Optimized for Kenyan mobile users
- **Local Payment Methods** - M-Pesa, Paybill, and international options

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom Kenyan theme
- **State Management**: Zustand with localStorage persistence
- **Animations**: Framer Motion
- **PDF Generation**: html2pdf.js
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kenyan-creative-agency
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 User Flow

1. **Landing Page** → User learns about the agency
2. **Service Explorer** → User browses available services
3. **Tiered Pricing** → User selects a package (Starter/Standard/Premium)
4. **Questionnaire** → User provides project details in 5 steps
5. **Quote Summary** → User reviews and exports their custom quote
6. **Contact** → User connects via WhatsApp or email

## 🎨 Customization

### Services & Pricing

Edit `data/services.ts` to modify:
- Service categories and descriptions
- Package tiers and pricing
- Features included in each package
- Add-on services

### Styling

The app uses a custom Kenyan theme in `tailwind.config.js`:
- Primary colors: Blue theme
- Kenyan colors: Red, green, black, white
- Custom animations and transitions

### WhatsApp Integration

Update the phone number in:
- `utils/helpers.ts` - `generateWhatsAppUrl` function
- `app/quote/page.tsx` - Contact buttons
- `app/terms/page.tsx` - Contact information

## 📦 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── services/          # Service pages
│   ├── questionnaire/     # Multi-step form
│   ├── quote/            # Quote summary
│   └── terms/            # Terms & policies
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── data/                 # Static data
│   └── services.ts       # Services, pricing, options
├── stores/               # State management
│   └── useQuoteStore.ts  # Zustand store
├── utils/                # Utility functions
│   ├── helpers.ts        # General helpers
│   └── pdfGenerator.ts   # PDF export logic
└── styles/               # Global styles
    └── globals.css       # TailwindCSS imports
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any environment-specific settings:

```env
# Optional: Add any API keys or configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=254700000000
NEXT_PUBLIC_EMAIL=hello@creativeagency.co.ke
```

### Deployment

The app is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any Node.js hosting platform

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Features Breakdown

### State Management
- Zustand store with localStorage persistence
- Form data maintained across page refreshes
- Quote generation with unique IDs

### Form Validation
- Email validation for Kenyan formats
- Phone number validation (+254 or 0 prefix)
- Required field validation
- Step-by-step validation

### PDF Export
- Professional quote formatting
- Company branding
- Client information
- Pricing breakdown
- Payment terms

### Mobile Optimization
- Responsive design for all screen sizes
- Touch-friendly interface
- Fast loading on mobile networks
- Kenyan mobile user patterns

## 🎯 Target Users

- **Small Businesses** - Restaurants, salons, retail stores
- **NGOs** - Non-profits needing digital presence
- **Startups** - Tech companies and entrepreneurs
- **Artists** - Content creators and creative professionals
- **E-commerce** - Online stores and marketplaces

## 💰 Pricing Structure

All prices are in Kenyan Shillings (KES):
- **Web Design**: KES 25,000 - 75,000
- **Graphics & Branding**: KES 15,000 - 50,000
- **Social Media**: KES 20,000 - 55,000
- **Complete Packages**: KES 50,000 - 150,000

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:
- **WhatsApp**: +254 700 000 000
- **Email**: hello@creativeagency.co.ke
- **Website**: [Your Website URL]

---

Built with ❤️ for the Kenyan creative community
