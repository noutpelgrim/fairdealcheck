"use client";

import React, { useState } from "react";
import { QuoteForm, QuoteData } from "@/components/analyzer/QuoteForm";
import { AnalysisResult, AnalysisData } from "@/components/analyzer/AnalysisResult";
import { ScriptGenerator, ScriptsData } from "@/components/analyzer/ScriptGenerator";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { QuoteUploader } from "@/components/analyzer/QuoteUploader";

export default function AnalyzePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [quoteAmount, setQuoteAmount] = useState<number | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [scripts, setScripts] = useState<ScriptsData | null>(null);
    const [isGeneratingScripts, setIsGeneratingScripts] = useState(false);
    const [showManualForm, setShowManualForm] = useState(false);

    const handleUploadSuccess = async (analysisId: string) => {
        setIsLoading(true);
        // In a real app, we'd fetch the analysis details by ID here.
        // For the MVP, we'll mock the same result as the form.
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockResult: AnalysisData = {
                fairMin: 1800,
                fairMax: 2200,
                status: "overpriced",
                confidenceScore: 94,
                recommendation: "Strongly recommend negotiating the labor rate. Our database shows it is 25% higher than the local average for this service.",
                overpricingPercentage: 30,
                riskScore: 8
            };
            setAnalysis(mockResult);
            setQuoteAmount(2860); // Mock amount
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyze = async (data: QuoteData) => {
        setIsLoading(true);
        setAnalysis(null);
        setScripts(null);
        setQuoteAmount(data.amount);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to analyze quote");

            const result = await response.json();
            setAnalysis(result);
        } catch (error) {
            console.error(error);
            alert("Error analyzing quote. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateScripts = async () => {
        if (!analysis || !quoteAmount) return;
        setIsGeneratingScripts(true);

        try {
            const response = await fetch("/api/scripts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ analysis, quoteAmount }),
            });

            if (!response.ok) throw new Error("Failed to generate scripts");

            const result = await response.json();
            setScripts(result);
        } catch (error) {
            console.error(error);
            alert("Error generating scripts.");
        } finally {
            setIsGeneratingScripts(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Simple Header */}
            <header className="bg-white border-b border-neutral-100 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 text-neutral-900 hover:text-neutral-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
                <div className="flex items-center space-x-2 font-semibold">
                    <ShieldCheck className="h-5 w-5" />
                    <span>FairDealCheck</span>
                </div>
                <div className="w-[100px]"></div> {/* Spacer for centering */}
            </header>

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {!analysis ? (
                        <div className="space-y-6">
                            <div className="bg-white rounded-[40px] shadow-sm p-6 sm:p-12 border border-neutral-100 text-center">
                                <h1 className="text-4xl font-bold text-navy mb-4">Analyze Your Quote</h1>
                                <p className="text-navy/50 mb-10 max-w-md mx-auto">
                                    Upload a file to let our AI do the work, or enter details manually.
                                </p>

                                <div className="space-y-8">
                                    <QuoteUploader onSuccess={handleUploadSuccess} />

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-neutral-100"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                                            <span className="bg-white px-4 text-navy/20">or</span>
                                        </div>
                                    </div>

                                    {!showManualForm ? (
                                        <Button
                                            variant="outline"
                                            className="w-full h-14 rounded-full border-neutral-200 text-navy/60 font-semibold hover:bg-neutral-50"
                                            onClick={() => setShowManualForm(true)}
                                        >
                                            Enter Details Manually
                                        </Button>
                                    ) : (
                                        <div className="text-left pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                            <QuoteForm onSubmit={handleAnalyze} isLoading={isLoading} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center mb-4">
                                <Button variant="ghost" size="sm" onClick={() => setAnalysis(null)}>
                                    <ArrowLeft className="h-4 w-4 mr-2" /> New Analysis
                                </Button>
                            </div>

                            <AnalysisResult data={analysis} quoteAmount={quoteAmount || 0} />

                            {!scripts ? (
                                <div className="flex justify-center pt-4">
                                    <Button
                                        size="lg"
                                        onClick={handleGenerateScripts}
                                        disabled={isGeneratingScripts}
                                    >
                                        {isGeneratingScripts ? "Writing scripts..." : "Generate Negotiation Scripts"}
                                    </Button>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <ScriptGenerator scripts={scripts} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
