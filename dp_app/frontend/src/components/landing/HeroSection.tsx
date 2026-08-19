import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Database } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Editorial Context */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-secondary)] font-mono text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              CDC BRFSS Machine Learning Pipeline
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
              Understand your diabetes risk{' '}
              <span className="text-[var(--accent)] underline decoration-1 underline-offset-8">
                without a blood test.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-sans">
              An epidemiological assessment using demographic profiles, physical health indicators, and lifestyle factors derived from the CDC’s Behavioral Risk Factor Surveillance System.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStart}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-sm font-semibold tracking-wider uppercase transition-all rounded-sm shadow-sm group cursor-pointer"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] px-2 py-1">
                <ShieldCheck className="w-4 h-4 text-[var(--risk-low)]" />
                <span>No lab work or medical devices required</span>
              </div>
            </div>

            {/* Micro highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Feature Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>80% Prediction Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Instant Result Output</span>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Data Visual Representation */}
          <div className="lg:col-span-5">
            <div className="border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 rounded-sm shadow-xs space-y-6 font-mono">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  <Cpu className="w-4 h-4 text-[var(--accent)]" />
                  Model Feature Matrix
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)] uppercase">23 Variables</span>
              </div>

              {/* Sample Structured Data Display */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 border border-[var(--border-color)] bg-[var(--bg-main)]">
                  <span className="text-[var(--text-secondary)]">PRIMARY BIOMETRIC</span>
                  <span className="font-bold text-[var(--text-primary)]">Body Mass Index (_BMI5)</span>
                </div>

                <div className="flex justify-between items-center p-2.5 border border-[var(--border-color)] bg-[var(--bg-main)]">
                  <span className="text-[var(--text-secondary)]">DEMOGRAPHIC</span>
                  <span className="font-bold text-[var(--text-primary)]">14-Bracket Age Category</span>
                </div>

                <div className="flex justify-between items-center p-2.5 border border-[var(--border-color)] bg-[var(--bg-main)]">
                  <span className="text-[var(--text-secondary)]">CARDIOVASCULAR</span>
                  <span className="font-bold text-[var(--text-primary)]">MI / Angina / Stroke Flags</span>
                </div>

                <div className="flex justify-between items-center p-2.5 border border-[var(--border-color)] bg-[var(--bg-main)]">
                  <span className="text-[var(--text-secondary)]">LIFESTYLE MATRIX</span>
                  <span className="font-bold text-[var(--text-primary)]">Activity / Smoking / Alcohol</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
