import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, Car, Home, Plus, TrendingUp, BellRing, UploadCloud, FileText } from "lucide-react";
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
        <div className="h-screen flex bg-slate-50 overflow-hidden font-sans">
            {/* Thin Sidebar */}
            <aside className="hidden md:flex w-[72px] flex-col items-center py-6 bg-slate-900 border-r border-slate-800 shrink-0 z-10">
                <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500 text-white mb-8 shadow-sm">
                    <ShieldCheck className="h-6 w-6" />
                </Link>
                <nav className="flex flex-col gap-4">
                    <Link href="/dashboard" className="w-10 h-10 rounded-lg bg-white/10 text-white flex flex-col items-center justify-center" title="Dashboard">
                        <Home className="w-5 h-5" />
                    </Link>
                    <Link href="/analyze" className="w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex flex-col items-center justify-center transition-colors" title="Audit Quote">
                        <UploadCloud className="w-5 h-5" />
                    </Link>
                    <Link href="/dashboard" className="w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex flex-col items-center justify-center transition-colors" title="Records">
                        <FileText className="w-5 h-5" />
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center text-sm font-medium text-slate-500">
                        <Link href="/" className="md:hidden flex items-center justify-center w-8 h-8 rounded-md bg-emerald-500 text-white mr-3 shadow-sm">
                            <ShieldCheck className="h-4 w-4" />
                        </Link>
                        <Link href="/dashboard" className="hidden sm:inline-block hover:text-slate-900 transition-colors">FairDealCheck</Link>
                        <span className="hidden sm:inline-block mx-2 text-slate-300">/</span>
                        <span className="text-slate-900 font-semibold sm:font-medium">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-500">{user.firstName || "User"}</span>
                        <UserButton />
                    </div>
                </header>

                {/* Main Canvas */}
                <main className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6 lg:p-10">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">System Overview</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Action Area */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="p-8 border border-slate-200 shadow-sm rounded-xl bg-white">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900 tracking-tight mb-1">Audit a Quote</h2>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Cross-reference unverified quotes against 84,000 regional distributor catalogs and labor databases.
                                            </p>
                                        </div>
                                        {canAnalyze ? (
                                            <Link href="/analyze" className="shrink-0">
                                                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg w-full sm:w-auto h-11 px-6 font-medium shadow-none">
                                                    Initiate Audit <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button size="lg" disabled variant="outline" className="shrink-0 w-full sm:w-auto rounded-lg text-slate-400 border-slate-200 font-medium h-11 px-6 shadow-none">
                                                Limit Reached
                                            </Button>
                                        )}
                                    </div>
                                </Card>

                                <Card className="p-8 border border-slate-200 shadow-sm rounded-xl bg-slate-50">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Negotiation Copilot</h2>
                                                {!isPro && <span className="text-[10px] uppercase font-bold tracking-widest bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-sm">PRO</span>}
                                            </div>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Deploy AI to analyze contractor responses and draft an objective, data-backed counter-offer.
                                            </p>
                                        </div>
                                        {isPro ? (
                                            <Link href="/copilot" className="shrink-0">
                                                <Button size="lg" variant="outline" className="bg-white border-slate-200 text-slate-900 hover:bg-slate-50 rounded-lg w-full sm:w-auto font-medium h-11 px-6 shadow-none">
                                                    Engage Copilot <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link href="/pricing" className="shrink-0">
                                                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg w-full sm:w-auto font-medium h-11 px-6 shadow-none">
                                                    Unlock Copilot
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </Card>

                                {/* Predictive Maintenance Alert (Prototype) */}
                                {isPro && (
                                    <div className="bg-white border-l-2 border-slate-200 shadow-sm rounded-r-xl border-y border-r p-6 flex flex-col sm:flex-row items-start space-x-4">
                                        <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-500 mt-0.5 shrink-0">
                                            <BellRing className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-slate-900 tracking-tight mb-1 uppercase tracking-widest">Predictive Alert: 2018 Honda Accord</h3>
                                            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                                                Asset telemetry indicates approaching timing belt lifecycle limit (65,000 mi).
                                                Regional market data estimates replacement at <span className="font-semibold text-slate-900">$680</span>.
                                            </p>
                                            <Link href="/analyze">
                                                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-900 hover:bg-slate-50 h-8 rounded-md font-medium text-xs shadow-none">
                                                    Run Estimate Verification
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Digital Asset Ledger */}
                                <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white">
                                    <div className="border-b border-slate-100 p-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900 tracking-tight">Digital Asset Ledger</h3>
                                            <p className="text-sm text-slate-500">Track liabilities and anticipate cyclical expenditures.</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 rounded-md border-slate-200 hover:bg-slate-50 font-medium text-xs shadow-none text-slate-900">
                                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                                            Add Asset
                                        </Button>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {/* Example Asset 1 */}
                                        <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-slate-50 border border-slate-200 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                                                    <Car className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-900 tracking-tight">2018 Honda Accord</h4>
                                                    <div className="flex items-center text-[11px] text-slate-500 mt-1 uppercase tracking-widest space-x-2">
                                                        <span>64,500 MI</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="text-amber-600 font-semibold">Service Recommended</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900 text-xs font-medium">View Log</Button>
                                        </div>

                                        {/* Example Asset 2 */}
                                        <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-slate-50 border border-slate-200 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                                                    <Home className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-slate-900 tracking-tight">Primary Residence</h4>
                                                    <div className="flex items-center text-[11px] text-slate-500 mt-1 uppercase tracking-widest space-x-2">
                                                        <span>YOC 2005</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span>HVAC 12 YRS</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="text-emerald-600 font-semibold">Nominal</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900 text-xs font-medium">View Log</Button>
                                        </div>

                                        {/* Teaser for Free Users */}
                                        {!isPro && (
                                            <div className="p-6 bg-slate-900 text-center relative overflow-hidden">
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <h4 className="text-white text-sm font-semibold mb-2">Automate your wealth protection.</h4>
                                                    <p className="text-slate-400 text-xs mb-4 max-w-sm mx-auto leading-relaxed">
                                                        Pro users unlock unlimited asset telemetry and predictive lifecycle alerts based on real market decay data.
                                                    </p>
                                                    <Link href="/pricing">
                                                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-white border-0 h-9 rounded-md font-medium shadow-none text-xs">
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
                                <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden relative">
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-sm font-semibold tracking-tight text-slate-900 uppercase">Account Infrastructure</h3>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${isPro ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                {isPro ? "PRO TIER" : "BASE TIER"}
                                            </span>
                                        </div>

                                        {/* Financial Metric */}
                                        <div className="mb-8 border-b border-slate-100 pb-8">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Savings Identified</p>
                                            <p className="text-4xl font-semibold tracking-tight text-slate-900">$1,450</p>
                                        </div>

                                        {!isPro ? (
                                            <div className="space-y-4">
                                                <div className="flex items-baseline justify-between">
                                                    <span className="text-3xl font-semibold text-slate-900 tracking-tight">{usageCount}</span>
                                                    <span className="text-sm font-medium text-slate-400">/ 1 Limit</span>
                                                </div>
                                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Monthly Audit Quota</p>

                                                {usageCount >= 1 && (
                                                    <div className="flex items-start bg-slate-50 text-slate-500 border border-slate-200 p-3 rounded-lg text-xs leading-relaxed mt-4">
                                                        <AlertCircle className="h-3.5 w-3.5 mr-2 mt-0.5 flex-shrink-0" />
                                                        <span>Processing capacity reached. Auto-reset scheduled for {resetDateStr}.</span>
                                                    </div>
                                                )}

                                                <div className="pt-6 mt-6 border-t border-slate-100">
                                                    <Link href="/pricing" className="block">
                                                        <Button variant="solid" className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg h-10 shadow-none font-medium">Upgrade to Pro</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-5">
                                                <div className="flex items-center space-x-2 text-emerald-600 font-medium pb-5 border-b border-slate-100">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                    <span className="text-sm">Unlimited Audits Authorized</span>
                                                </div>
                                                {metadata.stripeCurrentPeriodEnd && (
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        Renewal Cycle: {new Date(metadata.stripeCurrentPeriodEnd).toLocaleDateString()}
                                                    </p>
                                                )}
                                                <div>
                                                    <Button variant="outline" className="w-full border-slate-200 text-slate-900 rounded-lg h-9 shadow-none text-xs font-medium hover:bg-slate-50">Manage Billing Settings</Button>
                                                </div>

                                                {/* Referral hook */}
                                                <div className="mt-8 pt-6 border-t border-slate-100">
                                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                                                        <h4 className="text-xs font-semibold text-slate-900 mb-1.5 uppercase tracking-widest">Network Expansion</h4>
                                                        <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                                                            Refer a contact for a free audit. Receive 1 credit month per conversion.
                                                        </p>
                                                        <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white text-slate-900 border-slate-200 hover:bg-slate-50 shadow-none">
                                                            Copy Referral Hash
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around z-50 px-6 pb-safe">
                <Link href="/dashboard" className="text-white flex flex-col items-center justify-center p-2">
                    <Home className="w-5 h-5" />
                </Link>
                <Link href="/analyze" className="text-slate-400 hover:text-white transition-colors flex flex-col items-center justify-center p-2">
                    <UploadCloud className="w-5 h-5" />
                </Link>
                <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors flex flex-col items-center justify-center p-2">
                    <FileText className="w-5 h-5" />
                </Link>
            </nav>
        </div>
    );
}
