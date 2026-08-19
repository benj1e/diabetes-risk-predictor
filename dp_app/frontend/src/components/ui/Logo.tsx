import React from "react";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showText = true }) => {
    const sizeMap = {
        sm: { box: 32, svg: 16, textSize: "text-xs" },
        md: { box: 40, svg: 20, textSize: "text-sm" },
        lg: { box: 48, svg: 24, textSize: "text-base" },
    };

    const { box, svg, textSize } = sizeMap[size];

    return (
        <div className="flex items-center gap-2">
            <div
                className="rounded-sm bg-gradient-to-br from-[var(--accent)] to-[#a83a1f] text-white flex items-center justify-center shadow-sm group-hover:from-[var(--accent-hover)] group-hover:to-[#932d1a] transition-all"
                style={{ width: box, height: box }}
            >
                {/* Custom SVG Logo: Pulse + Glucose Drop */}
                <svg
                    width={svg}
                    height={svg}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Pulse line */}
                    <path d="M2 12h3l2-4 2 8 2-4 2 8 2-4h4" />

                    {/* Glucose drop integrated into pulse */}
                    <circle
                        cx="18"
                        cy="8"
                        r="2.5"
                        fill="currentColor"
                        opacity="0.8"
                    />
                    <path
                        d="M18 10.5c0 1.5-1 3-2 4-1-1-2-2.5-2-4a2 2 0 114 0z"
                        fill="currentColor"
                        opacity="0.6"
                    />
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col">
                    <div
                        className={`font-mono font-bold tracking-wider uppercase text-[var(--text-primary)] ${textSize}`}
                    >
                        Vitals
                    </div>
                    <div className="text-[10px] font-mono tracking-widest text-[var(--text-secondary)] uppercase">
                        Predict
                    </div>
                </div>
            )}
        </div>
    );
};
