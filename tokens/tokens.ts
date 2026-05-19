/**
 * Design tokens — single source of truth.
 *
 * Edit this file, then run `npm run build:tokens` to regenerate
 * `tokens.css` and `typography.css`.
 *
 * The Tailwind preset (`tailwind.preset.ts`) imports this file directly,
 * so Tailwind picks up changes automatically — no rebuild needed there.
 *
 * Source: Figma file OddSea7LOiGx5mX4kjKobx (Brim Cloud CMS) —
 *   "Type System Container" (9008:4356) and "Colors System Container" (9008:4428).
 */

export const colors = {
  text: {
    primary:   '#323232',
    secondary: '#697284',
    tertiary:  '#98A1B0',
    inverse:   '#FFFFFF',
  },
  brand: {
    primary: '#00C68B',
  },
  surface: {
    default: '#FFFFFF',
    subtle:  '#F9FAFB',
  },
  border: {
    default: '#E5E5E5',
    subtle:  '#E6E7EB',
    strong:  '#858C9B',
  },
  /** Status colors — scoped to badge/chip components only, not general UI. */
  status: {
    /** Online · Available · Active · Payout · Completed · Paid · Shared */
    success: { bg: '#EAFEF6', border: '#C6EFE0', text: '#00C68B' },
    /** Charging · Open */
    info:    { bg: '#EFF6FF', border: '#BDDBFF', text: '#155DFC' },
    /** Faulted · Unavailable */
    danger:  { bg: '#FEF2F2', border: '#ECC6BF', text: '#F5583D' },
    /** Suspended · Charged */
    warning: { bg: '#FDFBED', border: '#FFE19C', text: '#FFB200' },
    /** Offline · Pending · Preparing · Finishing · Plugged · Unplugged · Unclaimed */
    neutral: { bg: '#FAFAFA', border: '#E5E6EA', text: '#697284' },
    /** Private */
    private: { bg: '#FAF5FF', border: '#EDDDFF', text: '#8A38F5' },
  },
  /** Generic greys, outside the Status system. */
  neutral: {
    medium: '#BDBDBD',
    light:  '#CBCBCB',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
  },
  /** Type ramp — each key becomes a `.text-{key}` utility class. */
  styles: {
    /** Hero numbers (next payout, billing totals). Use sparingly — one per screen. */
    'display-xl':    { fontSize: 40, lineHeight: 44, fontWeight: 600 },
    'display-large': { fontSize: 28, lineHeight: 28, fontWeight: 600 },
    'h1':            { fontSize: 24, lineHeight: 21, fontWeight: 600 },
    'h2':            { fontSize: 20, lineHeight: 24, fontWeight: 600 },
    'label-large':         { fontSize: 16, lineHeight: 21, fontWeight: 500 },
    /** 16/21 at Semi Bold — used by medium buttons and other dense UI affordances. */
    'label-large-strong':  { fontSize: 16, lineHeight: 21, fontWeight: 600 },
    'label-small':         { fontSize: 12, lineHeight: 16, fontWeight: 500 },
    'body-strong':   { fontSize: 14, lineHeight: 20, fontWeight: 600 },
    'body-regular':  { fontSize: 14, lineHeight: 20, fontWeight: 400 },
  },
} as const;

/**
 * Spacing scale — unit is 4px, key is the multiplier.
 * `space.4 = 16px`, `space.6 = 24px`, etc.
 *
 * Use for padding, gaps, and any inset/offset values. Matches Tailwind's
 * default spacing scale, so `p-4` in Tailwind and `var(--space-4)` in CSS
 * resolve to the same 16px value.
 */
export const spacing = {
  0:  0,
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

export const tokens = { colors, typography, spacing } as const;
export type Tokens = typeof tokens;
