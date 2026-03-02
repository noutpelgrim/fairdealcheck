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
                className={`relative w-full flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-[32px] transition-all duration-300 
                    ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-neutral-200 bg-neutral-50 hover:border-emerald-400 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5"}
                    ${isUploading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
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
                    <div className="flex flex-col items-center text-emerald-600">
                        <Loader2 className="w-12 h-12 animate-spin mb-4" />
                        <span className="font-bold text-xl">Analyzing Document...</span>
                        <span className="text-sm opacity-70 mt-2 font-medium">Extracting data and checking market rates</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-navy">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 rotate-3 group-hover:rotate-0 transition-transform">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-2xl mb-2 tracking-tight">Upload Your Quote</span>
                        <span className="text-navy/50 font-medium">Click to browse or drag and drop</span>
                        <div className="flex items-center gap-3 mt-4 text-[10px] font-bold uppercase tracking-widest text-navy/30">
                            <span>PDF</span>
                            <span className="w-1 h-1 rounded-full bg-navy/20"></span>
                            <span>JPG</span>
                            <span className="w-1 h-1 rounded-full bg-navy/20"></span>
                            <span>PNG</span>
                        </div>
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
