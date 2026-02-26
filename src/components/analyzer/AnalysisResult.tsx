import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export interface AnalysisData {
    fairMin: number;
    fairMax: number;
    status: "fair" | "high" | "overpriced";
    confidenceScore: number;
    recommendation: string;
    overpricingPercentage: number;
    riskScore: number;
}

export function AnalysisResult({ data, quoteAmount }: { data: AnalysisData; quoteAmount: number }) {
    const getStatusBadge = () => {
        switch (data.status) {
            case "fair":
                return <Badge variant="success">Fair Price</Badge>;
            case "high":
                return <Badge variant="warning">Slightly High</Badge>;
            case "overpriced":
                return <Badge variant="danger">Overpriced</Badge>;
        }
    };

    const getStatusIcon = () => {
        switch (data.status) {
            case "fair":
                return <CheckCircle2 className="h-8 w-8 text-green-500" />;
            case "high":
                return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
            case "overpriced":
                return <AlertCircle className="h-8 w-8 text-red-500" />;
        }
    };

    const getStatusTitle = () => {
        switch (data.status) {
            case "fair": return "Looks good!";
            case "high": return "You could probably negotiate.";
            case "overpriced": return "Hold on, this is too high.";
        }
    };

    const formattedMin = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(data.fairMin);
    const formattedMax = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(data.fairMax);

    return (
        <Card className="space-y-6">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-6">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-neutral-50 rounded-full">
                        {getStatusIcon()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{getStatusTitle()}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-neutral-500">Your Quote: €{quoteAmount}</span>
                            {getStatusBadge()}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-neutral-500">Confidence Score</div>
                    <div className="text-2xl font-bold font-mono">{data.confidenceScore}%</div>
                </div>
            </div>

            <div className="py-2">
                <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Estimated Fair Range</h3>
                <div className="text-3xl font-extrabold text-neutral-900 mb-6">
                    {formattedMin} - {formattedMax}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                        <div className="text-sm text-neutral-500 mb-1">Risk Score</div>
                        <div className={`text-xl font-bold ${data.riskScore > 7 ? 'text-red-600' : data.riskScore > 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {data.riskScore} / 10
                        </div>
                    </div>
                    {data.overpricingPercentage > 0 && (
                        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                            <div className="text-sm text-neutral-500 mb-1">Overpriced By</div>
                            <div className="text-xl font-bold text-red-600">
                                +{data.overpricingPercentage}%
                            </div>
                        </div>
                    )}
                </div>

                <p className="mt-4 text-neutral-700 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                    <strong>Our recommendation:</strong> {data.recommendation}
                </p>
            </div>
        </Card>
    );
}
