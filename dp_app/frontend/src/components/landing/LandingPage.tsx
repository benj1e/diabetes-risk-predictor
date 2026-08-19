import React, { useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { StatsStrip } from "./StatsStrip";
import { HowItWorks } from "./HowItWorks";
import { Disclaimer } from "../ui/Disclaimer";
import { waitForBackendHealth } from "../../lib/api";

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    useEffect(() => {
        // Check backend health on page load
        waitForBackendHealth();
    }, []);
    return (
        <div className="space-y-0">
            <HeroSection onStart={onStart} />
            <StatsStrip />
            <HowItWorks onStart={onStart} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <Disclaimer />
            </div>
        </div>
    );
};
