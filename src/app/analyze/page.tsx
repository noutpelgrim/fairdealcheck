"use client";

import React, { useState } from "react";
import { QuoteForm, QuoteData } from "@/components/analyzer/QuoteForm";
import { AnalysisResult, AnalysisData } from "@/components/analyzer/AnalysisResult";
import { ScriptGenerator, ScriptsData } from "@/components/analyzer/ScriptGenerator";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AnalyzePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [quoteAmount, setQuoteAmount] = useState<number | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [scripts, setScripts] = useState<ScriptsData | null>(null);
    const [isGeneratingScripts, setIsGeneratingScripts] = useState(false);

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
                        <div className="bg-white rounded-xl shadow-soft p-6 sm:p-10 border border-neutral-100">
                            <h1 className="text-3xl font-bold mb-2">Analyze Your Quote</h1>
                            <p className="text-neutral-500 mb-8">
                                Fill out the details below so we can check if you're getting a fair price.
                            </p>
                            <QuoteForm onSubmit={handleAnalyze} isLoading={isLoading} />
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
