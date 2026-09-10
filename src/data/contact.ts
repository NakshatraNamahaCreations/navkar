/** Single source of truth for the public WhatsApp contact, shared by the
 *  floating chat button and the in-page consultation CTA. */
export const WHATSAPP_NUMBER = "919987267555";

export const WHATSAPP_MESSAGE =
  "Hi Navkar Global Sourcing, I'd like to know more about your sourcing services.";

export const whatsappLink = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
