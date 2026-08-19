import React from 'react';
import { getFeatureDisplayInfo } from '../../lib/feature-labels';
import { ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

interface ShapFactorListProps {
  contributions: Record<string, number>;
}

export const ShapFactorList: React.FC<ShapFactorListProps> = ({ contributions }) => {
  const items = Object.entries(contributions);

  // Find max absolute value for scaling magnitude bars
  const maxAbsValue = Math.max(...items.map(([, val]) => Math.abs(val)), 0.001);

  return (
    <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 rounded-sm space-y-6">
      <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
          <Layers className="w-4 h-4" />
          Factor Breakdown
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          What influenced your result?
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Here's a breakdown of which health and lifestyle factors had the most influence on your score, and in which direction.
        </p>
      </div>

      <div className="space-y-4">
        {items.map(([key, val]) => {
          const info = getFeatureDisplayInfo(key);
          const isPositive = val > 0;
          const absVal = Math.abs(val);
          const magnitudePercent = Math.min(100, Math.round((absVal / maxAbsValue) * 100));
          const influenceText = info.getInfluenceText(val);

          return (
            <div
              key={key}
              className="p-4 border border-[var(--border-color)] bg-[var(--bg-main)] rounded-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[var(--text-primary)]">
                      {info.title}
                    </span>
                    <span className="px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--text-secondary)] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xs">
                      {info.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {info.description}
                  </p>
                </div>

                {/* Influence Direction Tag */}
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-1 font-mono text-xs font-semibold rounded-xs shrink-0 ${
                    isPositive
                      ? 'text-[var(--risk-high)] bg-[var(--risk-high-bg)] border border-[var(--risk-high-border)]'
                      : 'text-[var(--risk-low)] bg-[var(--risk-low-bg)] border border-[var(--risk-low-border)]'
                  }`}
                >
                  {isPositive ? (
                    <>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+ Higher Contribution</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>- Lower Contribution</span>
                    </>
                  )}
                </div>
              </div>

              {/* Explanatory text */}
              <p className="text-xs text-[var(--text-primary)] font-medium">
                {influenceText}
              </p>

              {/* Magnitude Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
                  <span>Relative influence</span>
                  <span>{Math.round(magnitudePercent)}%</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xs overflow-hidden">
                  <div
                    className={`h-full rounded-xs ${
                      isPositive ? 'bg-[var(--accent)]' : 'bg-[var(--risk-low)]'
                    }`}
                    style={{ width: `${magnitudePercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
