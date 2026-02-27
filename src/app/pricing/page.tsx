"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

export default function PricingPage() {
    const [paddle, setPaddle] = useState<Paddle>();
    const { isLoaded, isSignedIn, user } = useUser();

    // Download and initialize Paddle instance from CDN
    useEffect(() => {
        initializePaddle({
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox' ? 'sandbox' : 'production',
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
        }).then(
            (paddleInstance: Paddle | undefined) => {
                if (paddleInstance) {
                    setPaddle(paddleInstance);
                }
            },
        );
    }, []);

    const handleUpgrade = () => {
        if (!isSignedIn || !user) {
            alert("Please log in to upgrade.");
            return;
        }

        if (paddle) {
            paddle.Checkout.open({
                settings: {
                    displayMode: "overlay",
                    theme: "light",
                },
                items: [
                    {
                        priceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID!,
                        quantity: 1
                    }
                ],
                customData: {
                    userId: user.id
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Simple Header */}
            <header className="bg-white border-b border-neutral-100 py-4 px-6 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-2 text-neutral-900 hover:text-neutral-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2 font-semibold">
                    <ShieldCheck className="h-5 w-5" />
                    <span>FairDealCheck</span>
                </div>
                <div className="w-[150px]"></div> {/* Spacer for centering */}
            </header>

            <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold mb-4">Unlimited negotiating power.</h1>
                        <p className="text-xl text-neutral-600">Upgrade to Pro to never overpay again.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Free Tier */}
                        <Card padding="lg" className="flex flex-col opacity-75">
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-2">Free</h3>
                                <p className="text-neutral-500 mb-6">Basic quote analysis</p>
                                <div className="flex items-baseline text-4xl font-extrabold">
                                    €0<span className="text-lg font-medium text-neutral-500 ml-1">/mo</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-400 mr-3" /> 1 quote check per month</li>
                                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-400 mr-3" /> Basic text script</li>
                            </ul>
                            <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                        </Card>

                        {/* Pro Tier */}
                        <Card padding="lg" className="flex flex-col border-neutral-900 shadow-soft-hover relative overflow-hidden transform scale-105 border-2">
                            <div className="absolute top-0 inset-x-0 h-1 bg-neutral-900"></div>
                            <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">POPULAR</div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                                <p className="text-neutral-500 mb-6">Unlimited negotiating power</p>
                                <div className="flex items-baseline text-4xl font-extrabold">
                                    €19<span className="text-lg font-medium text-neutral-500 ml-1">/mo</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3" /> Unlimited quote checks</li>
                                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3" /> Advanced multi-tone scripts</li>
                                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3" /> Complex market data engine</li>
                            </ul>
                            <Button
                                variant="solid"
                                className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
                                onClick={handleUpgrade}
                                disabled={!isLoaded || !paddle}
                            >
                                {!paddle ? "Loading Checkout..." : "Upgrade to Pro"}
                            </Button>
                        </Card>
                    </div>

                    <div className="mt-12 text-center text-sm text-neutral-500">
                        <p>Payments are securely processed by Paddle. You can cancel your subscription at any time.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
