import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "accent";
}

export function Button({ children, variant = "default", className = "", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200";

  const colors =
    variant === "accent"
      ? "bg-[var(--color-accent)] text-white hover:bg-purple-600 hover:shadow-lg"
      : "bg-gray-700 text-white hover:bg-gray-600";

  return (
    <button className={`${base} ${colors} ${className}`} {...props}>
      {children}
    </button>
  );
}