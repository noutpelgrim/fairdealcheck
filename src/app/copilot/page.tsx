// @ts-nocheck
"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage as Message } from "ai";
import { Copy, Bot, User, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function CopilotPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    const renderMessageContent = (content: string) => {
        // Very simple markdown-like parsing for the structured response
        const sections = (content || "").split('###').filter(s => s?.trim().length > 0);

        if (sections.length < 3) {
            return <p className="whitespace-pre-wrap">{content}</p>;
        }

        return (
            <div className="space-y-4 w-full">
                {sections.map((section, idx) => {
                    const [title, ...bodyParts] = section?.trim().split(':') || [];
                    const body = bodyParts.join(':')?.trim() || section.replace(title, '')?.trim(); // Fallback if no colon
                    const cleanTitle = title?.trim() || "";

                    if (cleanTitle.toLowerCase().includes('analysis')) {
                        return (
                            <div key={idx} className="text-sm text-neutral-600 bg-neutral-100/50 p-3 rounded-md">
                                <span className="font-semibold block mb-1">🧠 Analysis</span>
                                {body}
                            </div>
                        );
                    }
                    if (cleanTitle.toLowerCase().includes('strategy')) {
                        return (
                            <div key={idx} className="text-sm text-blue-900 bg-blue-50 border border-blue-100 p-3 rounded-md">
                                <span className="font-semibold block mb-1">🎯 Strategy</span>
                                {body}
                            </div>
                        );
                    }
                    if (cleanTitle.toLowerCase().includes('reply')) {
                        return (
                            <div key={idx} className="bg-white border border-neutral-200 shadow-sm rounded-lg p-4 mt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-sm">💬 Suggested Reply</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 shadow-none"
                                        onClick={() => handleCopy(body)}
                                    >
                                        {copiedText === body ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                                <p className="text-sm italic font-serif">"{body}"</p>
                            </div>
                        );
                    }

                    return <p key={idx} className="whitespace-pre-wrap">{section}</p>;
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <header className="bg-white border-b border-neutral-100 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-6">
                    <Link href="/" className="flex items-center space-x-2 text-neutral-900">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="font-semibold text-lg hidden sm:inline-block">FairDealCheck</span>
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">Dashboard</Link>
                        <span className="text-sm font-medium text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full">Copilot</span>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <UserButton />
                </div>
            </header>

            <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-4 h-[calc(100vh-73px)]">
                <div className="text-center py-6">
                    <h1 className="text-2xl font-bold">Negotiation Copilot</h1>
                    <p className="text-neutral-500 text-sm mt-1">Paste your quote and the provider's response here.</p>
                </div>

                <Card className="flex-grow flex flex-col overflow-hidden shadow-sm border-neutral-200">
                    {/* Chat Area */}
                    <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                                <Bot className="w-12 h-12 opacity-20" />
                                <p className="text-sm">I'm ready to analyze their response.</p>
                            </div>
                        )}

                        {messages.map((m: Message) => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-[90%] sm:max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${m.role === 'user' ? 'bg-neutral-900 ml-3' : 'bg-blue-100 mr-3'}`}>
                                        {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-blue-700" />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`mt-1 ${m.role === 'user' ? 'bg-neutral-900 text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm' : 'text-neutral-800 w-full'}`}>
                                        {m.role === 'user' ? (
                                            <p className="whitespace-pre-wrap">{m.content}</p>
                                        ) : (
                                            renderMessageContent(m.content)
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex max-w-[80%] flex-row">
                                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3">
                                        <Bot className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div className="mt-3 flex space-x-1">
                                        <div className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-neutral-100">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm rounded-full focus:ring-neutral-900 focus:border-neutral-900 block p-3 pr-12 shadow-inner"
                                value={input}
                                placeholder="Paste provider response here..."
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className="absolute right-1.5 rounded-full w-8 h-8 p-0"
                                disabled={isLoading || !input?.trim()}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </Card>
            </main>
        </div>
    );
}
