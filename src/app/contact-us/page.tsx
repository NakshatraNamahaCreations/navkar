import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Consultation from "@/components/sections/Consultation";

export const metadata = {
  title: "Contact Us | Navkar Global Sourcing",
  description:
    "Get in touch with Navkar Global Sourcing — share your product requirement and our team will help you find the right supplier.",
};

const DETAILS = [
  {
    label: "Address",
    value: "12-A, Mahendra Industrial Premises, Sion East, Mumbai – 400022",
    icon: (
      <path
        d="M12 21s7-6.5 7-11.5a7 7 0 10-14 0C5 14.5 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Email",
    value: "sales@navkarglobalsourcing.com",
    href: "mailto:sales@navkarglobalsourcing.com",
    icon: (
      <path
        d="M4 5h16v14H4V5zm0 0l8 7 8-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Phone",
    value: "+91 98925 75304",
    href: "tel:+919892575304",
    icon: (
      <path
        d="M6 3h4l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2C9.5 20 4 14.5 4 5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ContactUsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main className="flex flex-col flex-1">
        <PageHero
          variant="split"
          eyebrow="Contact Us"
          title="Looking for the right"
          accentWord="product or supplier?"
          copy="Share your product requirement with our team. We will help you identify suitable suppliers, compare quotations and manage the complete sourcing process."
          side={
            <div className="flex flex-col gap-4">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl border border-canvas/15 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent-soft shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                      {d.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-canvas/40 mb-1">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-sm font-medium text-canvas hover:text-accent-soft transition-colors duration-300"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-canvas leading-relaxed">
                        {d.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <Consultation hideHeading />
      </main>
      <Footer />
    </div>
  );
}
