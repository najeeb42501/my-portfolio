import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST() {
  console.log("🔥 API HIT");

  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log("API KEY:", apiKey);

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["delivered@resend.dev"],
      subject: "Test Email",
      html: "<p>Working</p>",
    });

    console.log("RESULT:", result);

    return Response.json(result);
  } catch (err) {
    console.error("❌ ERROR:", err);
    return Response.json({ error: err }, { status: 500 });
  }
}
