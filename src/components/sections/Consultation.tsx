"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Consultation({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".consult-mark", {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".consult-mark", start: "top 85%" },
      });

      gsap.from(".consult-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".consult-line", start: "top 85%" },
      });

      gsap.from(".consult-fade", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".consult-fade", start: "top 90%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="consultation"
      ref={root}
      className="relative bg-canvas pt-8 pb-32 md:pt-10 md:pb-48 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto text-center">
        {!hideHeading && (
          <>
            <div className="consult-mark flex items-center gap-4 mb-16 justify-center">
              <span className="font-mono text-sm text-accent"></span>
              <span className="hairline w-24" />
              <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">
                Consultation
              </span>
              <span className="hairline w-24" />
            </div>

            <h2 className="font-display font-light leading-[1.05] text-[9vw] md:text-[4.6vw]">
              <span className="consult-line block overflow-hidden">
                <span>Looking for the Right</span>
              </span>
              <span className="consult-line block overflow-hidden font-medium text-accent">
                <span>Product or Supplier?</span>
              </span>
            </h2>

            <p className="consult-fade mt-10 max-w-xl mx-auto text-ink-soft leading-relaxed">
              Share your product requirements with Navkar Global Sourcing, and
              we&apos;ll help you identify verified suppliers, compare
              quotations, and manage your sourcing journey from supplier
              selection to final delivery.
            </p>
          </>
        )}

        <div className="consult-fade mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@navkarglobal.com"
            className="px-8 py-4 bg-ink text-canvas text-xs uppercase tracking-[0.25em] rounded-full hover:bg-accent transition-colors duration-500"
          >
            Submit Your Requirement
          </a>
          <a
            href="#plans"
            className="px-8 py-4 border border-line text-xs uppercase tracking-[0.25em] rounded-full hover:border-ink transition-colors duration-500"
          >
            Speak to a Sourcing Expert
          </a>
        </div>
      </div>
    </section>
  );
}
