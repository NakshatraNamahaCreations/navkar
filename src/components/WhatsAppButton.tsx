"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919987267555";
const WHATSAPP_MESSAGE = "Hi Navkar Global Sourcing, I'd like to know more about your sourcing services.";

export default function WhatsAppButton() {
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 400);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 flex items-center"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "scale(1)" : "scale(0.4)",
        transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* hover label */}
      <span
        className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink text-canvas text-xs font-medium px-4 py-2 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.4)] transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(8px)",
          pointerEvents: "none",
        }}
      >
        Chat with us
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
      />

      <span
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.65)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
        style={{ background: "linear-gradient(155deg, #34E070 0%, #22C35E 55%, #128C4A 100%)" }}
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="relative w-6 h-6 md:w-7 md:h-7">
          <path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.23.61 4.32 1.67 6.11L4 29l8.09-1.63a11.94 11.94 0 003.92.66h.01c6.63 0 12.01-5.38 12.01-12.01S22.65 3 16.01 3zm0 21.7h-.01a9.7 9.7 0 01-4.94-1.36l-.35-.21-3.68.99.98-3.6-.23-.37a9.68 9.68 0 01-1.49-5.14c0-5.36 4.36-9.72 9.73-9.72 2.6 0 5.04 1.01 6.88 2.85a9.65 9.65 0 012.85 6.87c0 5.36-4.37 9.72-9.74 9.72zm5.34-7.28c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.19 3.02.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.33.19 1.84.11.56-.08 1.73-.71 1.97-1.39.25-.68.25-1.27.17-1.39-.07-.13-.26-.2-.55-.35z" />
        </svg>
      </span>
    </a>
  );
}
