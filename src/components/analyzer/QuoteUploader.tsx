"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, AlertCircle } from "lucide-react";

export function QuoteUploader({ onSuccess }: { onSuccess?: (analysisId: string) => void }) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // UI State
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Constants for validation
    const MAX_FILE_SIZE_MB = 10;
    const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

    // Trigger hidden file input when button/area is clicked
    const handleTriggerClick = () => {
        fileInputRef.current?.click();
    };

    // Validates and processes the selected file
    const handleFile = async (file: File) => {
        setError(null);

        // 1. Validation: Check File Type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Invalid file type. Please upload a PDF, JPG, or PNG.");
            return;
        }

        // 2. Validation: Check File Size
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        await uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setIsUploading(true);

        try {
            // Prepare FormData for multipart/form-data POST request
            const formData = new FormData();
            formData.append("quoteFile", file);

            // 3. Send securely via HTTPS to our backend API
            const response = await fetch("/api/upload-quote", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await response.json();

            // 4. On Success: Trigger callback or redirect
            // For MVP simplicity, we might just update the local state in the parent if we weren't redirecting.
            // But the requirements asked for a redirect or dynamic render. 
            // Let's assume the parent handles the state if we wanted dynamic, 
            // but for a "full flow" a results page or a state update is good.
            // Since AnalyzePage already exists and has a state-based result view, 
            // we'll actually want to pass the result back to the parent instead of a hard redirect 
            // if we want to stay on the same page. 
            // Or, we redirect to a results page if that's the preferred UX.
            // The user request said: "Redirect the user to the analysis results page OR dynamically render"

            // If the parent provided an 'onSuccess' callback, we'd use it.
            // Let's modify this to use a prop if we want to integrate into AnalyzePage.
            if (onSuccess) {
                onSuccess(data.analysisId);
            } else {
                window.location.href = `/analyze?results=${data.analysisId}`;
            }

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred during upload.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Hidden native file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        handleFile(e.target.files[0]);
                    }
                }}
            />

            {/* Accessible Upload Area / Button */}
            <button
                type="button"
                onClick={handleTriggerClick}
                disabled={isUploading}
                className={`relative w-full flex flex-col items-center justify-center p-12 border transition-all duration-300 rounded-xl
                    ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-300 bg-white hover:border-slate-400 border-dashed"}
                    ${isUploading ? "opacity-100 cursor-not-allowed border-slate-200 border-solid" : "cursor-pointer"}
                `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFile(e.dataTransfer.files[0]);
                    }
                }}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center text-slate-900 w-full max-w-sm">
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-5 relative">
                            <div className="absolute top-0 left-0 h-full w-1/2 bg-slate-900 rounded-full animate-pulse" style={{ animationDuration: '1.2s' }} />
                        </div>
                        <span className="text-[15px] font-medium tracking-tight mb-1.5">Parsing document structure...</span>
                        <span className="text-[11px] uppercase tracking-widest text-slate-500">Cross-referencing 84,000 distributor catalogs</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-900">
                        <UploadCloud className="w-5 h-5 text-slate-400 mb-4" strokeWidth={1.5} />
                        <span className="text-[15px] font-medium tracking-tight mb-2">Select document for analysis</span>
                        <span className="text-[13px] text-slate-500">Secure 256-bit SSL connection. PDF, JPG, or PNG up to 10MB.</span>
                    </div>
                )}
            </button>

            {/* Error Message UI */}
            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-2xl flex items-start text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{error}</span>
                </div>
            )}
        </div>
    );
}
