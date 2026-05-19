import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

/** Mirrors the top navbar / breadcrumb pattern from Figma file n1Gg49TiP5wpNTyMxUQSph.
 *  Structure:  [breadcrumb]  ............  [icon actions] | [user profile]   */
export interface BreadcrumbItem {
  /** Optional leading icon (typically a Lucide icon — e.g. `<Home size={18} />`). */
  icon?: ReactNode;
  /** Item label. The final item's label is rendered as the page title (h2 primary). */
  label?: string;
  href?: string;
}

export interface NavAction {
  icon: ReactNode;
  /** Used as the button's aria-label. */
  label?: string;
  /** Optional badge value (notification count). Number or short string. */
  badge?: number | string;
  onClick?: () => void;
}

export interface PageHeaderUser {
  name: string;
  email?: string;
  /** Hex value for the avatar background. Defaults to brand green. */
  avatarColor?: string;
  onClick?: () => void;
}

export interface PageHeaderProps {
  breadcrumb: BreadcrumbItem[];
  /** Icon-button shortcuts on the right (search, notifications, settings, etc.). */
  navActions?: NavAction[];
  /** Optional user profile chip with avatar + name + email. */
  user?: PageHeaderUser;
  className?: string;
}

export function PageHeader({ breadcrumb, navActions, user, className }: PageHeaderProps) {
  const containerCls = [
    'flex items-center justify-between w-full',
    'px-6 py-3 bg-surface border-b border-default',
    className,
  ].filter(Boolean).join(' ');

  const lastIdx = breadcrumb.length - 1;

  return (
    <header className={containerCls}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        {breadcrumb.map((item, idx) => {
          const isLast = idx === lastIdx;
          const labelCls = isLast
            ? 'text-h2 text-primary'
            : 'text-body-regular text-secondary';
          return (
            <Fragment key={idx}>
              {idx > 0 && (
                <ChevronRight aria-hidden size={14} strokeWidth={1.5} className="text-tertiary" />
              )}
              {item.icon && (
                <span className="inline-flex h-5 w-5 items-center justify-center text-secondary">
                  {item.icon}
                </span>
              )}
              {item.label && (
                item.href && !isLast ? (
                  <a href={item.href} className={labelCls}>{item.label}</a>
                ) : (
                  <span className={labelCls}>{item.label}</span>
                )
              )}
            </Fragment>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {navActions && navActions.length > 0 && (
          <div className="flex items-center gap-1">
            {navActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={action.onClick}
                aria-label={action.label}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-default bg-surface text-secondary hover:bg-surface-subtle transition-colors"
              >
                {action.icon}
                {action.badge !== undefined && action.badge !== null && action.badge !== 0 && (
                  <span
                    aria-hidden
                    className="absolute -top-1 -right-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger-text px-1 text-inverse"
                    style={{ fontSize: 10, lineHeight: '14px', fontWeight: 600 }}
                  >
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {user && (
          <>
            <div aria-hidden className="w-px h-6 bg-default mx-1" />
            <button
              type="button"
              onClick={user.onClick}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-surface-subtle transition-colors"
            >
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-inverse text-label-small"
                style={{ backgroundColor: user.avatarColor ?? '#00C68B' }}
              >
                {user.name.charAt(0)}
              </span>
              <span className="flex flex-col items-start">
                <span className="text-body-strong text-primary leading-tight">{user.name}</span>
                {user.email && (
                  <span className="text-label-small text-secondary leading-tight">{user.email}</span>
                )}
              </span>
              <ChevronDown aria-hidden size={14} strokeWidth={1.5} className="text-secondary ml-1" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
