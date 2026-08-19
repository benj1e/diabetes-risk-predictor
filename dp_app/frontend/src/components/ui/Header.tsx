import React from "react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
    currentView: "landing" | "assessment" | "results";
    onNavigate: (view: "landing" | "assessment") => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-main)]/95 backdrop-blur-sm transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Brand identity */}
                <button
                    onClick={() => onNavigate("landing")}
                    className="text-left group cursor-pointer focus:outline-none"
                >
                    <div className="text-xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        DIABETES{" "}
                        <span className="text-[var(--accent)]">PREDICTOR</span>
                    </div>
                </button>

                {/* Right side navigation & theme toggle */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {currentView === "landing" ? (
                        <button
                            onClick={() => onNavigate("assessment")}
                            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-xs font-mono tracking-wider uppercase font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer rounded-sm shadow-xs"
                        >
                            Start Assessment
                        </button>
                    ) : (
                        <button
                            onClick={() => onNavigate("landing")}
                            className="px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-strong)] bg-[var(--bg-surface)] transition-colors cursor-pointer rounded-sm"
                        >
                            Overview
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
