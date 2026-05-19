import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Mirrors the "Backend Button" component set in Figma (file n1Gg49TiP5wpNTyMxUQSph).
 *  - Variant names match the Figma `Property 1` values exactly so designers and
 *    engineers refer to the same labels in handoff. */
export type ButtonVariant = 'green' | 'red' | 'white' | 'grey' | 'ghost';
export type ButtonSize = 'medium' | 'small';

const base = [
  'inline-flex items-center justify-center',
  'rounded-lg border',
  'font-sans font-semibold',
  'cursor-pointer select-none',
  'transition-colors duration-150 ease-out',
  'disabled:cursor-not-allowed disabled:opacity-60',
].join(' ');

const sizeStyles: Record<ButtonSize, string> = {
  medium: 'h-[38px] px-3 text-base gap-2',  // 16/Semi Bold, 38h, 12 px-pad, 8 icon-gap
  small:  'h-[28px] px-3 text-sm gap-1',    // 14/Semi Bold, 28h, 12 px-pad, 4 icon-gap
};

const variantStyles: Record<ButtonVariant, string> = {
  green: 'bg-brand-primary border-brand-primary text-inverse enabled:hover:opacity-90 enabled:active:opacity-80',
  red:   'bg-danger-text border-danger-text text-inverse enabled:hover:opacity-90 enabled:active:opacity-80',
  white: 'bg-surface border-default text-secondary enabled:hover:bg-surface-subtle',
  // Grey uses border/default (#E5E5E5) as fill — same value, different role.
  grey:  'bg-[#E5E5E5] border-[#E5E5E5] text-primary enabled:hover:bg-[#D9D9D9]',
  // Ghost intended for dark surfaces (e.g. navbars). Text stays white.
  ghost: 'bg-transparent border-transparent text-inverse enabled:hover:bg-white/10',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = 'green',
  size = 'medium',
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [base, sizeStyles[size], variantStyles[variant], className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
