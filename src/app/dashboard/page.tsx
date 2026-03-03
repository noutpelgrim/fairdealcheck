import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, Car, Home, Plus, TrendingUp, BellRing } from "lucide-react";
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

                        {/* Predictive Maintenance Alert (Prototype) */}
                        {isPro && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start space-x-4">
                                <div className="bg-amber-100 p-2 rounded-full text-amber-700 mt-0.5 shrink-0">
                                    <BellRing className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-amber-900 mb-1">Predictive Alert: 2018 Honda Accord</h3>
                                    <p className="text-sm text-amber-800/80 mb-3">
                                        Based on an estimated 65,000 miles, you are entering the window for a timing belt replacement.
                                        Regional data sets the fair market rate at <span className="font-bold">$680</span>.
                                    </p>
                                    <Link href="/analyze">
                                        <Button variant="outline" size="sm" className="bg-white border-amber-200 text-amber-900 hover:bg-amber-50 h-8">
                                            Audit a Quote
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Digital Asset Ledger */}
                        <Card className="overflow-hidden">
                            <div className="border-b border-neutral-100 p-6 flex items-center justify-between bg-neutral-50/50">
                                <div>
                                    <h3 className="text-lg font-semibold text-navy">Digital Asset Ledger</h3>
                                    <p className="text-sm text-neutral-500">Track liabilities and anticipate repair costs.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-9">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Asset
                                </Button>
                            </div>
                            <div className="divide-y divide-neutral-100">
                                {/* Example Asset 1 */}
                                <div className="p-6 flex items-center justify-between hover:bg-neutral-50/30 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-neutral-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                                            <Car className="w-6 h-6 text-navy/60" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-navy">2018 Honda Accord</h4>
                                            <div className="flex items-center text-xs text-neutral-500 mt-1 space-x-2">
                                                <span>64,500 mi</span>
                                                <span>•</span>
                                                <span className="text-amber-600 font-medium">Service recommended</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-navy">View Log</Button>
                                </div>

                                {/* Example Asset 2 */}
                                <div className="p-6 flex items-center justify-between hover:bg-neutral-50/30 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-neutral-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                                            <Home className="w-6 h-6 text-navy/60" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-navy">Primary Residence</h4>
                                            <div className="flex items-center text-xs text-neutral-500 mt-1 space-x-2">
                                                <span>Built 2005</span>
                                                <span>•</span>
                                                <span>HVAC: 12 yrs old</span>
                                                <span>•</span>
                                                <span className="text-emerald-600 font-medium">Healthy</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-navy">View Log</Button>
                                </div>

                                {/* Teaser for Free Users */}
                                {!isPro && (
                                    <div className="p-6 bg-gradient-to-br from-navy to-slate-800 text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
                                        <div className="relative z-10">
                                            <h4 className="text-white font-bold mb-2">Automate your wealth protection.</h4>
                                            <p className="text-white/70 text-sm mb-4 max-w-sm mx-auto">
                                                Pro users unlock endless asset tracking and predictive maintenance alerts based on real market data.
                                            </p>
                                            <Link href="/pricing">
                                                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white border-0">
                                                    Unlock Full Ledger
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card className="bg-white relative overflow-hidden">
                            {/* Top strip coloring based on tier */}
                            <div className={`absolute top-0 inset-x-0 h-1 ${isPro ? 'bg-navy' : 'bg-emerald-500'}`}></div>

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-neutral-700">Account Status</h3>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${isPro ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'}`}>
                                    {isPro ? "PRO" : "FREE"}
                                </span>
                            </div>

                            {/* Gamification metric */}
                            <div className="mb-6 p-4 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100/50 flex items-start space-x-3">
                                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg shrink-0">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Lifetime Savings Identified</p>
                                    <p className="text-2xl font-black text-navy">$1,450</p>
                                </div>
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
                                            <Button variant="solid" className="w-full bg-navy hover:bg-slate-800 text-white">Upgrade to Pro</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 text-emerald-700 font-medium pt-2 pb-4 border-b border-neutral-100">
                                        <CheckCircle2 className="h-5 w-5" />
                                        <span>Unlimited Audits Active</span>
                                    </div>
                                    {metadata.stripeCurrentPeriodEnd && (
                                        <p className="text-sm text-neutral-500">
                                            Renews on: {new Date(metadata.stripeCurrentPeriodEnd).toLocaleDateString()}
                                        </p>
                                    )}
                                    <div className="pt-2">
                                        <Button variant="outline" className="w-full text-sm h-8">Manage Billing</Button>
                                    </div>

                                    {/* Referral hook */}
                                    <div className="mt-6 pt-6 border-t border-neutral-100">
                                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-center">
                                            <h4 className="text-sm font-bold text-blue-900 mb-1">Give $50, Get a Free Month</h4>
                                            <p className="text-[11px] text-blue-700 mb-3 leading-tight">
                                                Send a friend a free quote audit. Get 1 month of Pro added to your account.
                                            </p>
                                            <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white text-blue-800 border-blue-200 hover:bg-blue-50">
                                                Copy Invite Link
                                            </Button>
                                        </div>
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
