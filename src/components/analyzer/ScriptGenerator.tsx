"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Copy, Check } from "lucide-react";

export interface ScriptsData {
    friendly: string;
    professional: string;
    assertive: string;
}

export function ScriptGenerator({ scripts }: { scripts: ScriptsData }) {
    const [copiedScript, setCopiedScript] = useState<keyof ScriptsData | null>(null);

    const handleCopy = (key: keyof ScriptsData, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedScript(key);
        setTimeout(() => setCopiedScript(null), 2000);
    };

    const ScriptCard = ({ title, scriptKey, content }: { title: string, scriptKey: keyof ScriptsData, content: string }) => (
        <div className="space-y-3 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm text-neutral-700">{title}</h4>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(scriptKey, content)}
                    className="h-8 text-xs"
                >
                    {copiedScript === scriptKey ? (
                        <><Check className="h-3 w-3 mr-1" /> Copied</>
                    ) : (
                        <><Copy className="h-3 w-3 mr-1" /> Copy</>
                    )}
                </Button>
            </div>
            <p className="text-sm text-neutral-600 whitespace-pre-wrap font-serif italic bg-white p-3 rounded shadow-sm border border-neutral-100">
                "{content}"
            </p>
        </div>
    );

    return (
        <Card className="mt-8 space-y-6">
            <div>
                <h3 className="text-xl font-bold mb-1">Negotiation Scripts</h3>
                <p className="text-sm text-neutral-500">Choose a tone that feels comfortable to you and copy the script.</p>
            </div>

            <div className="space-y-4">
                <ScriptCard
                    title="Friendly (Best for starting a conversation)"
                    scriptKey="friendly"
                    content={scripts.friendly}
                />
                <ScriptCard
                    title="Professional (Balanced & logical)"
                    scriptKey="professional"
                    content={scripts.professional}
                />
                <ScriptCard
                    title="Assertive (Firm pushback & escalation)"
                    scriptKey="assertive"
                    content={scripts.assertive}
                />
            </div>
        </Card>
    );
}
