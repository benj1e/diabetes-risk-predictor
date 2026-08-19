import React from 'react';

export const StatsStrip: React.FC = () => {
  const stats = [
    { value: '23', label: 'Questions', sublabel: 'Covering health, lifestyle & background' },
    { value: '5', label: 'Sections', sublabel: 'Organized from general to specific' },
    { value: '~5 min', label: 'To complete', sublabel: 'No login or account required' },
    { value: '0', label: 'Lab tests needed', sublabel: 'Entirely self-reported information' },
  ];

  return (
    <section className="py-10 border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)]">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`pt-4 lg:pt-0 ${idx !== 0 ? 'lg:pl-8' : ''} space-y-1`}
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--accent)]">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                {stat.label}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
