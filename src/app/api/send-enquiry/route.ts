import nodemailer from "nodemailer";

type EnquiryPayload = {
  formName: string;
  fields: Record<string, string | undefined | null>;
  attachment?: {
    filename: string;
    contentBase64: string;
    contentType?: string;
  };
};

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  const user = process.env.TITAN_EMAIL_USER;
  const pass = process.env.TITAN_EMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "TITAN_EMAIL_USER / TITAN_EMAIL_PASS are not set. Add them to .env.local (and to the Vercel project's Environment Variables) to enable email sending."
    );
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }

  return cachedTransporter;
}

function humanizeLabel(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function POST(request: Request) {
  let payload: EnquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { formName, fields, attachment } = payload;
  if (!formName || !fields || typeof fields !== "object") {
    return Response.json(
      { error: "Missing formName or fields." },
      { status: 400 }
    );
  }

  const entries = Object.entries(fields).filter(
    ([, value]) => value !== undefined && value !== null && String(value).trim() !== ""
  );

  const rowsHtml = entries
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#20394a;border-bottom:1px solid #e5e9eb;white-space:nowrap;vertical-align:top;">${humanizeLabel(
          key
        )}</td><td style="padding:8px 12px;color:#333;border-bottom:1px solid #e5e9eb;">${String(
          value
        ).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");

  const textBody = entries
    .map(([key, value]) => `${humanizeLabel(key)}: ${value}`)
    .join("\n");

  const submitterEmail = entries.find(
    ([key]) => key.toLowerCase().includes("email")
  )?.[1];

  const recipient = process.env.MAIL_TO || "sales@navkarglobalsourcing.com";

  if (attachment?.contentBase64 && attachment.contentBase64.length > 10_000_000) {
    return Response.json(
      { error: "Attachment is too large (max ~7MB)." },
      { status: 413 }
    );
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Navkar Website" <${process.env.TITAN_EMAIL_USER}>`,
      to: recipient,
      replyTo: submitterEmail ? String(submitterEmail) : undefined,
      subject: `New ${formName} submission — Navkar Global Sourcing website`,
      text: textBody,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#20394a;">New ${formName} submission</h2>
          <p style="color:#666;font-size:13px;">Submitted from navkarglobalsourcing.com</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            ${rowsHtml}
          </table>
        </div>
      `,
      attachments: attachment
        ? [
            {
              filename: attachment.filename,
              content: Buffer.from(attachment.contentBase64, "base64"),
              contentType: attachment.contentType,
            },
          ]
        : undefined,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("send-enquiry error:", err);
    return Response.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
