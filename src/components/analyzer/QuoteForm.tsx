"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export interface QuoteData {
    serviceType: string;
    location: string;
    amount: number;
    description: string;
    urgency: string;
}

interface QuoteFormProps {
    onSubmit: (data: QuoteData) => Promise<void>;
    isLoading: boolean;
}

export function QuoteForm({ onSubmit, isLoading }: QuoteFormProps) {
    const [formData, setFormData] = useState({
        serviceType: "car_repair",
        location: "",
        amount: "",
        description: "",
        urgency: "medium",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: Number(formData.amount),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Service Type"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    options={[
                        { label: "Car Repair", value: "car_repair" },
                        { label: "Plumbing", value: "plumbing" },
                        { label: "Dentist", value: "dentist" },
                        { label: "Contractor", value: "contractor" },
                        { label: "Other", value: "other" },
                    ]}
                    required
                />
                <Input
                    label="Location (City or Zip)"
                    name="location"
                    type="text"
                    placeholder="e.g. 10001 or New York"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Quote Amount (€)"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="e.g. 1500"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <Select
                    label="Urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    options={[
                        { label: "Low (Flexible)", value: "low" },
                        { label: "Medium (Soon)", value: "medium" },
                        { label: "High (ASAP)", value: "high" },
                    ]}
                    required
                />
            </div>

            <div className="space-y-1.5 w-full flex flex-col">
                <label className="text-sm font-medium text-neutral-700">Description of Service</label>
                <textarea
                    name="description"
                    rows={3}
                    className="flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    placeholder="e.g. Broken water heater replacement..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze My Quote"}
            </Button>
        </form>
    );
}
