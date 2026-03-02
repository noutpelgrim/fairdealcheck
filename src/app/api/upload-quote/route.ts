import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Enforce HTTPS in production
        if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https://')) {
            return NextResponse.json({ error: "Insecure connection. HTTPS required." }, { status: 400 });
        }

        const formData = await request.formData();
        const file = formData.get("quoteFile") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }

        // Backend Validation
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Unsupported file type. Use PDF, JPG, or PNG." }, { status: 415 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File exceeds 10MB limit." }, { status: 413 });
        }

        // Mock processing delay for realism
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real app, this would involve OCR and business logic.
        // We'll return a mock ID.
        const mockAnalysisId = 'analysis_' + Math.random().toString(36).substr(2, 9);

        return NextResponse.json({
            success: true,
            analysisId: mockAnalysisId
        }, { status: 200 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Internal server error during upload." },
            { status: 500 }
        );
    }
}
