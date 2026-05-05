import { Resend } from "resend";

export const runtime = "nodejs";

const CONTACT_TO_EMAIL = "najeeb08089@gmail.com";

const CONTACT_FROM_EMAIL = "Portfolio <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { message: "Invalid request. Please try again." },
      { status: 400 },
    );
  }

  const name = cleanText(payload.name);
  const email = cleanText(payload.email).toLowerCase();
  const message = cleanText(payload.message);

  if (!name || !email || !message) {
    return Response.json(
      { message: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (message.length < 10) {
    return Response.json(
      { message: "Please add a little more detail to your message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      { message: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">New portfolio message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="margin-top: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
              ${safeMessage}
            </div>
          </div>
        </div>
      `,
      text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend contact error:", error);

      return Response.json(
        { message: "Message could not be sent right now. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({
      message: "Message sent successfully. I will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { message: "Message could not be sent right now. Please try again." },
      { status: 500 },
    );
  }
}
