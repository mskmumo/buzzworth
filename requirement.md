📄 Product Requirements Document (PRD)
Project: Creative Agency Quoting Tool
Platform: Web (Next.js with App Router)
Audience: Kenyan creative clients (NGOs, startups, artists, salons, ecommerce)
1. 🎯 Product Vision

To streamline the quoting process for creative services (Web, Graphics, Social Media) via an interactive, mobile-first web app. The goal is to offer a tailored experience, pricing transparency, and a professional feel—all localized for the Kenyan market.

2. 💼 Business Goals

Increase quote-to-sale conversion rate by simplifying decision-making.

Reduce back-and-forth with clients by collecting key details upfront.

Present agency as tech-savvy and process-driven.

Support both local (Mpesa, Paybill) and international (PayPal) clients.

3. 👥 Target Users

Small business owners

NGOs

Startup founders

Artists and content creators

Salon and ecommerce operators

4. 🧭 User Flow
[Landing Page] 
  → [Service Explorer] 
    → [Service Tier Modal/Page] 
      → [Dynamic Discovery Questionnaire] 
        → [Quote Summary] 
          → [Terms & Policies] 
            → [Export or Follow-up via WhatsApp/Email]

5. 🛠 Tech Stack
Area	Stack
Framework	Next.js (App Router)
Styling	TailwindCSS
State Management	Zustand (preferred for modularity)
Component Architecture	Modular + Reusable Components
Persistence	localStorage or Zustand middleware
Backend (Optional)	Next API routes or Supabase/Firebase
PDF Export	html2pdf.js or react-pdf
Animation	Tailwind + Framer Motion
6. 🧱 Core Features & Pages
1. Landing Page (/)

Hero section with value prop

CTA: “Get a Quote” → navigates to /services

Kenyan imagery and branding

Minimal animations (fade in/slide up)

2. Service Explorer (/services)

Grid of services: Web Design, Graphics, Social Media, Bundles

Click → open /services/[slug] with tier details

3. Tiered Pricing Page (/services/[slug])

2–3 pricing cards (Starter / Standard / Premium)

Each shows:

Features

Price range (in KES)

Button: “Start Project” → goes to /questionnaire

4. Discovery Questionnaire (/questionnaire)

Multi-step dynamic form (using Zustand for persistence)

Conditional fields per service type (web vs graphics, etc.)

Progress bar at top

Validation per step

Back / Next buttons

State is persistent across refreshes

Sample fields:

Step	Fields
1	Business type, industry
2	Content readiness, assets availability
3	Preferred timeline, budget range
4	Optional Add-ons (e.g. SEO, branding)
5. Quote Summary (/quote)

Break down:

Selected package

Estimated total (KES)

Add-ons

Milestones (e.g. 50% upfront, 50% on delivery)

Buttons:

Export PDF

Send via WhatsApp / Email

Optional: Save quote to localStorage or backend

6. Client Policy Page (/terms)

Simple bullet points on:

Revisions

Payment policy (Mpesa, Paybill, Bank, PayPal)

Turnaround time

Cancellation terms

7. 💾 State Management
✅ Use Zustand

Minimal boilerplate

Reactivity across steps

Works well with localStorage

Store: stores/useQuoteStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useQuoteStore = create(
  persist(
    (set) => ({
      serviceType: '',
      selectedPackage: null,
      formData: {},
      updateFormData: (key, value) =>
        set((state) => ({
          formData: { ...state.formData, [key]: value }
        })),
      reset: () => set({ serviceType: '', selectedPackage: null, formData: {} })
    }),
    { name: 'quote-storage' }
  )
)

8. 📦 Component Architecture
/app
  /services
    /[slug]/page.tsx
  /questionnaire/page.tsx
  /quote/page.tsx
  /terms/page.tsx

/components
  /ui
    Button.tsx
    Input.tsx
    Select.tsx
    Stepper.tsx
    Modal.tsx
  /quote
    QuoteSummary.tsx
    PackageCard.tsx
    AddonsSection.tsx
  /form
    FormWrapper.tsx
    Step1.tsx
    Step2.tsx
    Step3.tsx
    ReviewStep.tsx
  /layout
    Header.tsx
    Footer.tsx

/stores
  useQuoteStore.ts

/utils
  pricing.ts
  pdfGenerator.ts
  validationSchemas.ts

/styles
  globals.css
  transitions.css

9. 💡 UX Enhancements
Area	Suggestions
Multi-step form	Use Framer Motion or Tailwind transitions (transition-all, ease-in-out) for slide/fade between steps
Inputs	Use floating labels, validation hints, smart selects
Progress	Sticky top progress bar with % and step name
Mobile UX	Prioritize tap targets, mobile grid first
Feedback	Toasts/snackbars after saving/exporting
10. 📄 Quote Export (PDF)

Use:

html2pdf.js (for client-side DOM export)

OR react-pdf (for structured PDF creation)

PDF Should Include:

Logo + Company Info

Client selections

Estimated pricing in KES

Payment schedule

Date + Quote ID

CTA: "Confirm via WhatsApp"

11. 📲 Follow-Up Integration

WhatsApp Link Generator:

const message = encodeURIComponent(`
Hi, I'd like to proceed with this quote:

Service: Web Design
Package: Standard
Total: KES 35,000
Deadline: 3 weeks
`);

const whatsappUrl = `https://wa.me/2547XXXXXXXX?text=${message}`;


Button on /quote: “Continue via WhatsApp”

12. 🔐 Admin Dashboard (Optional Future Feature)

View all saved quotes (requires backend)

Simple auth (Supabase or NextAuth)

Export as CSV

Mark quotes as "In Progress", "Closed", etc.

13. ✅ MVP Completion Checklist
Feature	Status
Landing Page	☐
Services Explorer	☐
Tiered Pricing	☐
Questionnaire (Multi-step)	☐
Zustand Store + Persistence	☐
Quote Summary Generator	☐
PDF Export	☐
WhatsApp Follow-up	☐
Tailwind Animations	☐
Client Policy Page	☐
14. 📁 GitHub Project Boards (Suggested Columns)

Backlog

In Progress

Review

QA

Done