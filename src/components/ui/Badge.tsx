import React from "react";

type BadgeVariant = "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
    const variants = {
        neutral: "bg-neutral-100 text-neutral-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-700",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
