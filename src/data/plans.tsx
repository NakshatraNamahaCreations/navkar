import type { ReactNode } from "react";

export type Plan = {
  num: string;
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  features: string[];
  fee: string;
  featured?: boolean;
  planTitle: string;
  subtitle: string;
  intro: string[];
  idealFor: string[];
  servicesHeading: string;
  servicesList: string[];
  whyChooseHeading: string;
  whyChooseQuote: string;
  whyChooseText: string;
  icon: ReactNode;
};

export const PLANS: Plan[] = [
  {
    num: "01",
    slug: "basic",
    name: "Basic",
    tagline: "If you have supplier already.",
    blurb: "Light-touch support for teams who've already found their factory.",
    features: [
      "Contact Suppliers",
      "Payment Assistance",
      "Price Assistance",
      "Quantity Monitoring",
      "Random Inspection of Product",
      "Shipping and Logistics Arrangement",
    ],
    fee: "Service Fee: 5-7% or min. $50",
    planTitle: "Basic Sourcing Plan",
    subtitle: "Professional Support for Your Existing Supplier",
    intro: [
      "Already have a supplier or factory but need professional assistance? Our Basic Global Sourcing Services Plan is designed for businesses that have identified their supplier and require support with one specific sourcing service.",
      "We act as your trusted representative, coordinating directly with your supplier in China and other global markets and helping ensure that the selected international sourcing service is completed professionally and efficiently.",
    ],
    idealFor: [
      "Already have a supplier or manufacturer identified",
      "Require support with one specific sourcing service",
      "Need a reliable global sourcing partner to coordinate with their supplier",
      "Want greater transparency and confidence before shipment",
      "Need professional assistance without choosing a complete sourcing package",
    ],
    servicesHeading: "Available Sourcing Support",
    servicesList: [
      "Contact Suppliers",
      "Payment Assistance",
      "Price Assistance",
      "Quantity Monitoring",
      "Random Inspection of Product",
      "Shipping and Logistics Arrangement",
    ],
    whyChooseHeading: "Why Choose the Basic Plan?",
    whyChooseQuote: "Your Supplier. Our Support. Your Peace of Mind.",
    whyChooseText:
      "Get professional global sourcing support without paying for a complete sourcing package. Our team helps you coordinate with your existing supplier and reduce sourcing-related risks before your products are shipped.",
    icon: (
      <>
        <path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M15 3v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    num: "02",
    slug: "pro",
    name: "Pro",
    tagline: "If you don't have supplier.",
    blurb: "Our most-booked desk: full sourcing from a cold start to a verified factory.",
    features: [
      "Product Categorization",
      "Find Best Suited Supplier",
      "Competitive Price Negotiation",
      "Supplier Verification",
      "Sample Support",
      "Custom Branding Support",
      "Shipping & Logistics Coordination",
      "Production Follow-Up",
    ],
    fee: "Service Fee: 8-10% or min. $300-500",
    featured: true,
    planTitle: "Pro Sourcing Plan",
    subtitle: "End-to-End Global Sourcing Services",
    intro: [
      "Looking for a reliable partner to manage your complete sourcing journey? Our Pro Global Sourcing Services Plan provides end-to-end sourcing support, from finding the right supplier to production, quality control, and shipment coordination.",
      "Our team works as your dedicated global sourcing agent, helping you identify suitable manufacturers in China and other global markets, evaluate suppliers, negotiate competitive prices, monitor production, inspect product quality, and coordinate the sourcing process.",
    ],
    idealFor: [
      "Do not yet have a supplier or factory identified",
      "Need complete product sourcing support",
      "Want access to reliable manufacturers and suppliers",
      "Need professional supplier evaluation and negotiation",
      "Want competitive sourcing prices",
      "Require quality control and inspection support",
      "Prefer one partner to manage the complete sourcing process",
    ],
    servicesHeading: "Our Pro Sourcing Services Include",
    servicesList: [
      "Product Categorization",
      "Find Best Suited Supplier",
      "Competitive Price Negotiation",
      "Supplier Verification",
      "Sample Support",
      "Custom Branding Support",
      "Shipping & Logistics Coordination",
      "Production Follow-Up",
    ],
    whyChooseHeading: "Why Choose the Pro Plan?",
    whyChooseQuote: "One Partner. Complete Global Sourcing Support.",
    whyChooseText:
      "From finding reliable manufacturers to coordinating quality checks and shipment, Navkar Global Sourcing helps you manage the entire sourcing journey while saving time, reducing sourcing risks, and improving supplier confidence.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 12.5l2.5 2.5L16.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    num: "03",
    slug: "custom",
    name: "Custom",
    tagline: "Fees will be quoted on case to case basis.",
    blurb: "For requirements that don't fit a template, scoped and quoted directly.",
    features: [
      "Tailor-Made Sourcing Solutions",
      "Solve Client Specific Concerns",
      "Handle Bottlenecks",
      "Product Technical Assistance",
      "Custom Product Support",
      "Shipment Consolidation",
    ],
    fee: "Service Fee: 8-10% or min. $300-500",
    planTitle: "Custom Sourcing Plan",
    subtitle: "Flexible Global Sourcing Services for Your Business",
    intro: [
      "Every business has different sourcing requirements. Our Custom Global Sourcing Services Plan is designed for clients who already have a supplier or manufacturer in China and other global markets but need professional support with multiple sourcing activities.",
      "Instead of choosing a complete sourcing package, you can select and combine the services that match your specific product, supplier, and business requirements.",
    ],
    idealFor: [
      "Already have a supplier or factory identified",
      "Need support with multiple sourcing services",
      "Want professional assistance without a complete sourcing package",
      "Require flexible sourcing support based on their project",
      "Need specialized assistance during production or shipment",
    ],
    servicesHeading: "Services You Can Combine",
    servicesList: [
      "Tailor-Made Sourcing Solutions",
      "Solve Client Specific Concerns",
      "Handle Bottlenecks",
      "Product Technical Assistance",
      "Custom Product Support",
      "Shipment Consolidation",
    ],
    whyChooseHeading: "Why Choose the Custom Plan?",
    whyChooseQuote: "Your Requirements. Your Combination. Full Flexibility.",
    whyChooseText:
      "Build a sourcing package that matches your exact needs. Combine the services you require and get professional support at every step, without paying for services you don't need.",
    icon: (
      <>
        <path d="M4 20V9l8-6 8 6v11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="9" y="12" width="6" height="8" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    num: "04",
    slug: "business-tour",
    name: "Business Tour",
    tagline: "For clients travelling to source themselves.",
    blurb: "Boots on the ground alongside you: meetings, trade shows, and factory visits.",
    features: [
      "Business Travel Assistance",
      "Supplier & Factory Meeting Coordination",
      "Complete Itinerary Support",
      "Trade Show Assistance",
      "Product Discovery",
      "Group Tour",
    ],
    fee: "Let's connect",
    planTitle: "Business Tour Plan",
    subtitle: "On-the-Ground Support When You Travel to Source",
    intro: [
      "Planning to travel and source directly with your suppliers in China and other global markets? Our Business Tour Plan gives you a trusted partner on the ground, helping you navigate factory visits, trade shows, and supplier meetings with confidence.",
      "Our team accompanies and supports you throughout your sourcing trip, handling itinerary planning, coordination, and product discovery so you can focus on building the right supplier relationships.",
    ],
    idealFor: [
      "Are travelling to meet suppliers or visit factories in person",
      "Want to attend trade shows and discover new products",
      "Need a complete itinerary planned and managed for their trip",
      "Require help coordinating supplier and factory meetings",
      "Prefer travelling as part of a group tour",
    ],
    servicesHeading: "Available On-Ground Support",
    servicesList: [
      "Business Travel Assistance",
      "Supplier & Factory Meeting Coordination",
      "Complete Itinerary Support",
      "Trade Show Assistance",
      "Product Discovery",
      "Group Tour",
    ],
    whyChooseHeading: "Why Choose the Business Tour Plan?",
    whyChooseQuote: "Your Trip. Our Ground Support. Confident Sourcing.",
    whyChooseText:
      "Travel to source with a trusted local partner by your side. From factory visits to trade shows, we help you make confident sourcing decisions in person.",
    icon: (
      <>
        <path d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];
