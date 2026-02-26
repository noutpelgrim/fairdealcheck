import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = user.privateMetadata as {
        isPro?: boolean;
        usageCount?: number;
        usageResetDate?: string;
        stripeCurrentPeriodEnd?: string;
    };

    const isPro = metadata.isPro === true;
    const usageCount = metadata.usageCount || 0;

    let resetDateStr = "N/A";
    if (metadata.usageResetDate) {
        resetDateStr = new Date(metadata.usageResetDate).toLocaleDateString();
    } else if (!isPro) {
        const dt = new Date();
        dt.setDate(dt.getDate() + 30);
        resetDateStr = dt.toLocaleDateString();
    }

    const canAnalyze = isPro || usageCount < 1;

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Dashboard Header */}
            <header className="bg-white border-b border-neutral-100 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 text-neutral-900">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-semibold text-lg">FairDealCheck</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-neutral-500">Welcome, {user.firstName || "User"}</span>
                    <UserButton />
                </div>
            </header>

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Action Area */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="flex flex-col sm:flex-row items-center justify-between p-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Check a New Quote</h2>
                                <p className="text-neutral-500 mb-4 sm:mb-0">
                                    Upload details of a quote you've received to see if it's fair.
                                </p>
                            </div>
                            {canAnalyze ? (
                                <Link href="/analyze">
                                    <Button size="lg" className="whitespace-nowrap">
                                        Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <Button size="lg" disabled variant="outline" className="whitespace-nowrap">
                                    Limit Reached
                                </Button>
                            )}
                        </Card>

                        <Card className="flex flex-col sm:flex-row items-center justify-between p-8 bg-blue-50/50 border-blue-100">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <h2 className="text-xl font-semibold">Negotiation Copilot</h2>
                                    {!isPro && <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">PRO</span>}
                                </div>
                                <p className="text-neutral-500 mb-4 sm:mb-0">
                                    Got a reply? Let our AI Copilot analyze their tactics and draft your counter-offer.
                                </p>
                            </div>
                            {isPro ? (
                                <Link href="/copilot">
                                    <Button size="lg" variant="outline" className="whitespace-nowrap bg-white border-blue-200 text-blue-800 hover:bg-blue-50">
                                        Ask Copilot <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/pricing">
                                    <Button size="lg" variant="solid" className="whitespace-nowrap">
                                        Unlock Copilot
                                    </Button>
                                </Link>
                            )}
                        </Card>

                        <Card>
                            <h3 className="text-lg font-semibold mb-4 border-b border-neutral-100 pb-4">Recent Analyses</h3>
                            <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-500">
                                <p>Analysis history is not available in the MVP.</p>
                                <p className="text-sm">Check back soon when we launch database persistence.</p>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card className="bg-white relative overflow-hidden">
                            {/* Top strip coloring based on tier */}
                            <div className={`absolute top-0 inset-x-0 h-1 ${isPro ? 'bg-neutral-900' : 'bg-blue-500'}`}></div>

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-neutral-700">Current Plan</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPro ? 'bg-neutral-900 text-white' : 'bg-blue-100 text-blue-700'}`}>
                                    {isPro ? "PRO" : "FREE"}
                                </span>
                            </div>

                            {!isPro ? (
                                <div className="space-y-4">
                                    <div className="flex items-end justify-between">
                                        <span className="text-3xl font-extrabold">{usageCount} <span className="text-lg font-medium text-neutral-400">/ 1</span></span>
                                    </div>
                                    <p className="text-sm text-neutral-500">Analyses used this month.</p>

                                    {usageCount >= 1 && (
                                        <div className="flex items-start bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm">
                                            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>You've reached your free limit. Resets on {resetDateStr}.</span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-neutral-100">
                                        <Link href="/pricing">
                                            <Button variant="solid" className="w-full">Upgrade to Pro</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 text-green-700 font-medium pt-2 pb-4 border-b border-neutral-100">
                                        <CheckCircle2 className="h-5 w-5" />
                                        <span>Unlimited Analyses Active</span>
                                    </div>
                                    {metadata.stripeCurrentPeriodEnd && (
                                        <p className="text-sm text-neutral-500">
                                            Renews on: {new Date(metadata.stripeCurrentPeriodEnd).toLocaleDateString()}
                                        </p>
                                    )}
                                    <div className="pt-2">
                                        {/* In a full app, this links to Stripe Billing Portal */}
                                        <Button variant="outline" className="w-full text-sm h-8">Manage Billing</Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
