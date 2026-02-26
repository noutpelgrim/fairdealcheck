import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export function Button({ variant = "solid", size = "md", children, className = "", ...props }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        solid: "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900",
        outline: "border border-neutral-200 bg-transparent hover:bg-neutral-50 text-neutral-900 focus:ring-neutral-200",
        ghost: "bg-transparent hover:bg-neutral-100 text-neutral-900 focus:ring-neutral-200"
    };

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg"
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
