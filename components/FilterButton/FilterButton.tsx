import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

/** Mirrors the "Filter Button" component set in Figma (file n1Gg49TiP5wpNTyMxUQSph).
 *  Two variants:
 *    - `dropdown`     → trailing ChevronDown, for triggers that open a dropdown menu
 *    - `leading-icon` → user-provided icon on the left, for actions (Sort / Filter / Export) */
export type FilterButtonVariant = 'dropdown' | 'leading-icon';

export interface FilterButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  variant?: FilterButtonVariant;
  /** Leading icon (typically a Lucide icon component). Required for `leading-icon` variant. */
  icon?: ReactNode;
  children: ReactNode;
}

const base = [
  'inline-flex items-center justify-center',
  'h-[38px] gap-2 rounded-lg border border-default bg-surface',
  'text-body-regular text-secondary',
  'cursor-pointer select-none',
  'transition-colors duration-150 ease-out',
  'enabled:hover:bg-surface-subtle enabled:active:bg-[#F1F2F4]',
  'disabled:cursor-not-allowed disabled:opacity-60',
].join(' ');

const paddingByVariant: Record<FilterButtonVariant, string> = {
  'dropdown':     'px-3',  // 12px each side
  'leading-icon': 'px-4',  // 16px each side
};

export function FilterButton({
  variant = 'dropdown',
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: FilterButtonProps) {
  const cls = [base, paddingByVariant[variant], className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} {...rest}>
      {variant === 'leading-icon' && icon}
      <span>{children}</span>
      {variant === 'dropdown' && (
        <ChevronDown aria-hidden size={14} strokeWidth={2} />
      )}
    </button>
  );
}
