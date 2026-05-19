import type { ReactNode, AnchorHTMLAttributes } from 'react';
import { LogOut } from 'lucide-react';

/** Mirrors the cloud-portal sidebar from Figma file n1Gg49TiP5wpNTyMxUQSph.
 *  Driven by a `sections` array — each section optionally has a label
 *  (e.g. "ADMIN") and a list of items with icon + label + active state. */
export interface SidebarItem {
  label: string;
  /** Lucide icon (or any 20×20 ReactNode). Inherits colour from parent via currentColor. */
  icon: ReactNode;
  /** Pass to render the item as an `<a>` link. */
  href?: string;
  /** Pass to render as a button-like element. */
  onClick?: () => void;
  active?: boolean;
}

export interface SidebarSection {
  /** Optional uppercase section header (e.g. "ADMIN"). */
  label?: string;
  items: SidebarItem[];
}

export interface SidebarUser {
  name: string;
  /** Sub-label (e.g. "Operator", "Admin"). */
  role?: string;
  /** Hex value for the avatar background. Defaults to brand green. */
  avatarColor?: string;
  /** Show a sign-out button when provided. */
  onSignOut?: () => void;
}

export interface SidebarProps {
  /** Brand text shown at the top of the sidebar (e.g. "Brim"). */
  brandLabel?: string;
  sections: SidebarSection[];
  /** Footer area extra content (e.g. notification + settings icon buttons). */
  actions?: ReactNode;
  /** Footer user profile. If both `actions` and `user` are provided, actions render above user. */
  user?: SidebarUser;
  className?: string;
}

const itemBase = [
  'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer',
  'transition-colors duration-150 ease-out',
].join(' ');

function SidebarLink({ item }: { item: SidebarItem }) {
  const cls = [
    itemBase,
    item.active
      ? 'bg-success-bg text-brand-primary text-body-strong'
      : 'text-secondary hover:bg-surface-subtle text-body-regular',
  ].join(' ');

  const content = (
    <>
      <span className="inline-flex h-5 w-5 items-center justify-center">{item.icon}</span>
      <span>{item.label}</span>
    </>
  );

  if (item.href) {
    return <a href={item.href} className={cls}>{content}</a>;
  }
  return <button type="button" onClick={item.onClick} className={cls + ' w-full text-left'}>{content}</button>;
}

export function Sidebar({ brandLabel = 'Brim', sections, actions, user, className }: SidebarProps) {
  const containerCls = [
    'flex flex-col h-full w-[268px] p-4 gap-1',
    'bg-surface border-r border-default',
    className,
  ].filter(Boolean).join(' ');

  return (
    <aside className={containerCls}>
      {/* Brand */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-default">
        <span className="text-label-large-strong text-primary">{brandLabel}</span>
        <span aria-hidden className="block h-2 w-2 rounded-full bg-brand-primary" />
      </div>

      {/* Sections */}
      {sections.map((sec, sIdx) => (
        <div key={sIdx} className="flex flex-col gap-1">
          {sec.label && (
            <div className="px-3 pt-6 pb-2 text-label-small text-tertiary uppercase tracking-wider">
              {sec.label}
            </div>
          )}
          {!sec.label && sIdx > 0 && <div className="h-2" />}
          {sec.items.map((item, iIdx) => (
            <SidebarLink key={iIdx} item={item} />
          ))}
        </div>
      ))}

      {/* Footer: actions + user */}
      <div className="mt-auto flex flex-col gap-3 pt-4">
        {actions && <div className="flex items-center gap-2 px-3">{actions}</div>}
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 border-t border-default pt-3">
            <span
              aria-hidden
              className="h-8 w-8 rounded-full inline-flex items-center justify-center text-inverse text-label-small"
              style={{ backgroundColor: user.avatarColor ?? '#00C68B' }}
            >
              {user.name.charAt(0)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-body-strong text-primary truncate">{user.name}</div>
              {user.role && <div className="text-label-small text-secondary truncate">{user.role}</div>}
            </div>
            {user.onSignOut && (
              <button
                type="button"
                onClick={user.onSignOut}
                aria-label="Sign out"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-secondary hover:bg-surface-subtle"
              >
                <LogOut size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
