import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80
                  border border-gray-700 rounded-2xl p-5 shadow-[0_0_25px_rgba(139,92,246,0.4)]
                  backdrop-blur-sm
                  flex flex-col md:flex-row transition-transform hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}