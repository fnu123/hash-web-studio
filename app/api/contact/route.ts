import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      fullName,
      email,
      phone,
      businessName,
      businessType,
      hasWebsite,
      features,
      budget,
      timeline,
      message,
    } = body

    await resend.emails.send({
      from: "Website Lead <onboarding@resend.dev>",
      to: "hdhashmat@gmail.com",
      replyTo: email,
      subject: `New Website Request from ${fullName}`,

      html: `
        <h2>New Website Lead</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Type:</strong> ${businessType}</p>
        <p><strong>Has Website:</strong> ${hasWebsite}</p>
        <p><strong>Features:</strong> ${features}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Email failed" }, { status: 500 })
  }
}