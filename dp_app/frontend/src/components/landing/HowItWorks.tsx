import React from 'react';
import { ArrowRight, ClipboardCheck, BarChart3, PieChart, Search } from 'lucide-react';

interface HowItWorksProps {
  onStart: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStart }) => {
  const steps = [
    {
      num: '01',
      title: 'Answer the questions',
      icon: ClipboardCheck,
      description:
        'Go through five short sections covering your age and body metrics, general health, medical history, lifestyle habits, and healthcare background.',
    },
    {
      num: '02',
      title: 'The model evaluates your profile',
      icon: BarChart3,
      description:
        'Your responses are processed by a machine learning model trained on large-scale health survey data. No blood samples or lab results required.',
    },
    {
      num: '03',
      title: 'Receive a risk estimate',
      icon: PieChart,
      description:
        'You get a risk percentage and a clear indicator of whether the model considers your profile to be above or below the risk threshold.',
    },
    {
      num: '04',
      title: 'See what influenced the result',
      icon: Search,
      description:
        'The results page breaks down which factors had the strongest effect on your score — positively or negatively — in plain language.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)]">
            How it works
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Four steps to your result
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            The assessment uses your self-reported health information to estimate diabetes risk — no clinic visit, no paperwork, no waiting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 rounded-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] px-2 py-0.5 border border-[var(--border-color)] bg-[var(--bg-main)]">
                      STEP {step.num}
                    </span>
                    <IconComponent className="w-5 h-5 text-[var(--text-secondary)]" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA Banner */}
        <div className="border border-[var(--border-strong)] bg-[var(--bg-surface)] p-8 sm:p-10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Ready to find out where you stand?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Takes about 5 minutes. No account, no medical records needed.
            </p>
          </div>

          <button
            onClick={onStart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm shadow-xs shrink-0 cursor-pointer"
          >
            <span>Begin Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
