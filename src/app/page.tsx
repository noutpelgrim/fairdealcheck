import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, FileText, BarChart3, ShieldCheck } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-neutral-900" />
            <span className="font-semibold text-lg tracking-tight">FairDealCheck</span>
          </div>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Log In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="solid" size="sm">Get Started</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6">
            You work hard for your money. <br className="hidden sm:block" />
            <span className="text-neutral-500">Stop letting them guess your budget.</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            We know you hate haggling. Paste your quote, get instant data-backed market rates, and copy-paste our expert negotiation scripts to ensure you never overpay again.
          </p>
          <div className="flex justify-center">
            <Link href="/analyze">
              <Button variant="solid" size="lg" className="rounded-full shadow-soft-hover transition-all text-lg px-8 py-6">
                Check My Quote Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Sections */}
        <section className="py-24 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Financial intelligence for everyday expenses.</h2>
              <p className="text-neutral-600">The tools you need to level the playing field with service providers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="hover:shadow-soft-hover transition-shadow text-left border-neutral-200">
                <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data-Backed Intel</h3>
                <p className="text-neutral-600">
                  Stop wondering if you're being ripped off. We analyze local market rates to tell you exactly where your quote stands.
                </p>
              </Card>

              {/* Feature 2 */}
              <Card className="hover:shadow-soft-hover transition-shadow text-left border-neutral-200">
                <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Done-For-You Scripts</h3>
                <p className="text-neutral-600">
                  Hate confrontation? Us too. Use our psychology-backed, copy-paste responses to push back firmly but professionally.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="hover:shadow-soft-hover transition-shadow text-left border-neutral-200">
                <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Financial Confidence</h3>
                <p className="text-neutral-600">
                  Turn anxiety into empowerment. Walk into any mechanic, dentist, or contractor with the confidence of an expert.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Invest in your financial peace of mind.</h2>
            <p className="text-neutral-600">One negotiation pays for the tool. Choose your tier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <Card padding="lg" className="flex flex-col border-neutral-200">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Free</h3>
                <p className="text-neutral-500 mb-6">For the occasional check.</p>
                <div className="flex items-baseline text-4xl font-extrabold text-neutral-900">
                  €0<span className="text-lg font-medium text-neutral-500 ml-1">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-400 mr-3 shrink-0" /> 1 quote check per month</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-400 mr-3 shrink-0" /> Basic text script</li>
              </ul>
              <Link href="/analyze" className="w-full">
                <Button variant="outline" className="w-full">Get Started Free</Button>
              </Link>
            </Card>

            {/* Pro Tier */}
            <Card padding="lg" className="flex flex-col border-neutral-900 shadow-soft-hover relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-neutral-900"></div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                <p className="text-neutral-500 mb-6">Unlimited negotiating power.</p>
                <div className="flex items-baseline text-4xl font-extrabold text-neutral-900">
                  €19<span className="text-lg font-medium text-neutral-500 ml-1">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3 shrink-0" /> Unlimited quote checks</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3 shrink-0" /> Copilot AI negotiation chat</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3 shrink-0" /> Advanced psychology scripts</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-neutral-900 mr-3 shrink-0" /> Priority market data access</li>
              </ul>
              <Link href="/pricing" className="w-full">
                <Button variant="solid" className="w-full bg-neutral-900 text-white">Upgrade to Pro</Button>
              </Link>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 text-neutral-600">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-semibold">FairDealCheck</span>
          </div>
          <div className="flex space-x-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
