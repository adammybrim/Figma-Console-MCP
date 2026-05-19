import type { HTMLAttributes, KeyboardEvent } from 'react';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

/** Mirrors the "Dashboard Card" component set in Figma (file n1Gg49TiP5wpNTyMxUQSph).
 *  Two variants:
 *    - `default`     → generic info card (no status dot, no drill-in arrow)
 *    - `actionable`  → status dot + drill-in arrow, signals "this is clickable"
 *  Hover transitions a soft drop-shadow in over 200ms (matches Figma Smart Animate). */
export type DashboardCardVariant = 'default' | 'actionable';
export type DashboardCardStatus  = 'amber' | 'green' | 'red' | 'blue';

const STATUS_DOT: Record<DashboardCardStatus, string> = {
  amber: 'bg-warning-text',
  green: 'bg-brand-primary',
  red:   'bg-danger-text',
  blue:  'bg-info-text',
};

export interface DashboardCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: DashboardCardVariant;
  /** Top-line category (e.g. "AWAITING APPROVAL"). Rendered uppercase/tracked. */
  label: string;
  /** The headline number, e.g. "12 payouts". */
  stat: string;
  /** Secondary line below the stat, e.g. "£842,330 pending release". */
  support: string;
  /** Trend chip text. Pass falsy to hide the chip entirely. */
  trend?: string;
  trendDirection?: 'up' | 'down';
  /** Colour of the status dot on actionable cards. */
  status?: DashboardCardStatus;
}

export function DashboardCard({
  variant = 'default',
  label,
  stat,
  support,
  trend,
  trendDirection = 'up',
  status = 'amber',
  onClick,
  className,
  ...rest
}: DashboardCardProps) {
  const isActionable = variant === 'actionable';
  const interactive  = isActionable && typeof onClick === 'function';

  const containerCls = [
    'flex flex-col gap-3',
    'p-4 rounded-xl border border-default bg-surface',
    'transition-shadow duration-200 ease-out',
    'hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]',
    interactive && 'cursor-pointer outline-offset-2',
    className,
  ].filter(Boolean).join(' ');

  const handleKey = interactive
    ? (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (onClick as (e: unknown) => void)(e);
        }
      }
    : undefined;

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKey}
      className={containerCls}
      {...rest}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isActionable && (
            <span aria-hidden className={`block h-2 w-2 rounded-full ${STATUS_DOT[status]}`} />
          )}
          <span className="text-label-small text-tertiary uppercase tracking-wider">{label}</span>
        </div>
        {isActionable && (
          <ChevronRight aria-hidden className="h-3.5 w-3.5 text-tertiary" strokeWidth={2} />
        )}
      </div>

      {/* Stat + trend chip */}
      <div className="flex items-center justify-between">
        <span className="flex-1 text-display-large text-primary">{stat}</span>
        {trend && (
          <span className="inline-flex items-center gap-1 rounded-full border border-success-border bg-success-bg px-2 py-1 text-label-small text-success-text">
            {trendDirection === 'up'
              ? <TrendingUp aria-hidden className="h-3.5 w-3.5" strokeWidth={2.25} />
              : <TrendingDown aria-hidden className="h-3.5 w-3.5" strokeWidth={2.25} />}
            {trend}
          </span>
        )}
      </div>

      {/* Support */}
      <span className="text-body-regular text-secondary">{support}</span>
    </div>
  );
}
