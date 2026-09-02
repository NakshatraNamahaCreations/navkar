import type { ReactNode } from "react";

export type Plan = {
  num: string;
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  features: string[];
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
    tagline: "If you already have your supplier.",
    blurb: "Light-touch support for teams who've already found their factory.",
    features: [
      "Contact Suppliers",
      "Payment Assistance",
      "Receiving Products",
      "Counting Quantity",
    ],
    planTitle: "Basic Sourcing Plan",
    subtitle: "Professional Support for Your Existing Supplier",
    intro: [
      "Already have a supplier or factory but need professional assistance? Our Basic Global Sourcing Services Plan is designed for businesses that have identified their supplier and require support with one specific sourcing service.",
      "We act as your trusted representative, coordinating directly with your supplier and helping ensure that the selected international sourcing service is completed professionally and efficiently.",
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
      "Supplier Verification",
      "Factory Verification",
      "Product Quality Inspection",
      "Pre-Shipment Inspection",
      "Supplier Communication",
      "Price Verification",
      "Production Follow-Up",
      "Packaging Verification",
      "Order Coordination",
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
    tagline: "If you don't have a supplier yet.",
    blurb: "Our most-booked desk: full sourcing from a cold start to a verified factory.",
    features: [
      "Product Categorization",
      "Supplier Sourcing",
      "Competitive Price Negotiation",
      "Supplier Verification",
    ],
    featured: true,
    planTitle: "Pro Sourcing Plan",
    subtitle: "End-to-End Global Sourcing Services",
    intro: [
      "Looking for a reliable partner to manage your complete sourcing journey? Our Pro Global Sourcing Services Plan provides end-to-end sourcing support, from finding the right supplier to production, quality control, and shipment coordination.",
      "Our team works as your dedicated global sourcing agent, helping you identify suitable manufacturers, evaluate suppliers, negotiate competitive prices, monitor production, inspect product quality, and coordinate the sourcing process.",
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
      "Supplier & Manufacturer Sourcing",
      "Supplier Verification",
      "Factory Background Checks",
      "Factory Audit & Assessment",
      "Product & Sample Evaluation",
      "Price & Commercial Negotiation",
      "Production Monitoring",
      "Quality Control Inspection",
      "Pre-Shipment Inspection",
      "Packaging & Labelling Verification",
      "Logistics & Shipping Coordination",
      "Documentation Support",
      "Order Management & Tracking",
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
    tagline: "Bundled solutions, quoted case-to-case.",
    blurb: "For requirements that don't fit a template, scoped and quoted directly.",
    features: [
      "Tailor-Made Sourcing Solutions",
      "Import & Logistics Support",
      "Payment Routing & Support",
      "Shipment Consolidation",
    ],
    planTitle: "Custom Sourcing Plan",
    subtitle: "Flexible Global Sourcing Services for Your Business",
    intro: [
      "Every business has different sourcing requirements. Our Custom Global Sourcing Services Plan is designed for clients who already have a supplier or manufacturer but need professional support with multiple sourcing activities.",
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
      "Supplier Verification & Background Checks",
      "Factory Audit & Assessment",
      "Product & Sample Quality Inspection",
      "Price & Commercial Negotiation",
      "Quality Control & Pre-Shipment Inspection",
      "Production Monitoring",
      "Packaging & Labelling Verification",
      "Logistics & Shipping Coordination",
      "Documentation & Compliance Support",
      "Supplier Communication & Follow-Up",
      "Order Management & Tracking",
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
    slug: "custom-pro",
    name: "Custom Pro",
    tagline: "For clients travelling to source themselves.",
    blurb: "Boots on the ground alongside you: audits, translation, and factory visits.",
    features: [
      "Business Travel Assistance",
      "Supplier Audits & Verification",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
    ],
    planTitle: "Custom Pro Sourcing Plan",
    subtitle: "On-the-Ground Support When You Travel to Source",
    intro: [
      "Planning to travel and source directly with your suppliers? Our Custom Pro Global Sourcing Services Plan gives you a trusted partner on the ground, helping you navigate factory visits, negotiations, and supplier meetings with confidence.",
      "Our team accompanies and supports you throughout your sourcing trip, handling language barriers, coordination, and verification so you can focus on building the right supplier relationships.",
    ],
    idealFor: [
      "Are travelling to meet suppliers or visit factories in person",
      "Need local language and communication support",
      "Want supplier and factory audits carried out during their visit",
      "Require help coordinating supplier and factory meetings",
      "Prefer real-time, on-ground sourcing guidance",
    ],
    servicesHeading: "Available On-Ground Support",
    servicesList: [
      "Business Travel Assistance",
      "Supplier & Factory Audits",
      "Language & Communication Support",
      "Supplier & Factory Meeting Coordination",
      "Local Logistics Assistance",
      "On-Site Negotiation Support",
      "Real-Time Sourcing Guidance",
    ],
    whyChooseHeading: "Why Choose the Custom Pro Plan?",
    whyChooseQuote: "Your Trip. Our Ground Support. Confident Sourcing.",
    whyChooseText:
      "Travel to source with a trusted local partner by your side. From factory visits to supplier negotiations, we help you make confident sourcing decisions in person.",
    icon: (
      <>
        <path d="M3 12l4-4 4 3 4-3 4 3v3l-4 4-3-2-3 2-4-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];
