const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const SEND_ENQUIRY_URL = `${API_BASE}/api/send-enquiry`;
