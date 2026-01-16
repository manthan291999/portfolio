import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export async function POST(req: NextRequest) {
    try {
        const payload: ContactPayload = await req.json();

        // Basic validation
        if (!payload.name || !payload.email || !payload.message) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // In a real application, you would send an email here using SendGrid, Resend, or AWS SES.
        // For now, we'll simulate a successful submission.
        console.log("Contact form submission:", payload);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
