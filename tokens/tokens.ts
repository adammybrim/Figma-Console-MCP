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
 *
 * Each colour is a `{ light, dark }` pair matching the Figma `Colors` collection's
 * two modes. `build.ts` emits the light values on `:root` and the dark overrides
 * on `[data-theme="dark"]`.
 */

/** A colour token with both Light and Dark mode values. */
export type ModeColor = { light: string; dark: string };

export const colors = {
  text: {
    primary:   { light: '#323232', dark: '#BDBDBD' },
    secondary: { light: '#697284', dark: '#7C8392' },
    tertiary:  { light: '#98A1B0', dark: '#58606D' },
    inverse:   { light: '#FFFFFF', dark: '#FFFFFF' },
  },
  brand: {
    primary: { light: '#00C68B', dark: '#43EAB8' },
    /** 20% tint of brand/primary — use as a transparent overlay (e.g. icon haloes). */
    'primary-tint-20': { light: 'rgba(0, 198, 139, 0.2)', dark: 'rgba(0, 198, 139, 0.2)' },
  },
  surface: {
    default: { light: '#FFFFFF', dark: '#1A1A1A' },
    subtle:  { light: '#F9FAFB', dark: '#191E22' },
  },
  border: {
    default: { light: '#E5E5E5', dark: '#2E2E2E' },
    subtle:  { light: '#E6E7EB', dark: '#28292F' },
    strong:  { light: '#858C9B', dark: '#696F7B' },
  },
  /** Status colors — scoped to badge/chip components only, not general UI.
   *  `text-dark` variants are darker readables for use on the matching `bg`
   *  (e.g. alert-notification body text on the same-status tinted card). */
  status: {
    /** Online · Available · Active · Payout · Completed · Paid · Shared */
    success: {
      bg:          { light: '#EAFEF6', dark: '#093B27' },
      border:      { light: '#C6EFE0', dark: '#1E4F3D' },
      text:        { light: '#00C68B', dark: '#43EAB8' },
      'text-dark': { light: '#009966', dark: '#63EEBF' },
    },
    /** Charging · Open */
    info: {
      bg:          { light: '#EFF6FF', dark: '#082447' },
      border:      { light: '#BDDBFF', dark: '#0A305D' },
      text:        { light: '#155DFC', dark: '#1A55D6' },
      'text-dark': { light: '#1E40AF', dark: '#5773D0' },
    },
    /** Faulted · Unavailable */
    danger: {
      bg:          { light: '#FEF2F2', dark: '#340A0A' },
      border:      { light: '#ECC6BF', dark: '#542921' },
      text:        { light: '#F5583D', dark: '#B8351E' },
      'text-dark': { light: '#991B1B', dark: '#D46767' },
    },
    /** Suspended · Charged */
    warning: {
      bg:          { light: '#FDFBED', dark: '#37320C' },
      border:      { light: '#FFE19C', dark: '#75560D' },
      text:        { light: '#FFB200', dark: '#E5A81A' },
      'text-dark': { light: '#A1621C', dark: '#D39D61' },
    },
    /** Offline · Pending · Preparing · Finishing · Plugged · Unplugged · Unclaimed */
    neutral: {
      bg:     { light: '#FAFAFA', dark: '#1E1E1E' },
      border: { light: '#E5E6EA', dark: '#292A30' },
      text:   { light: '#697284', dark: '#7C8392' },
    },
    /** Private */
    private: {
      bg:     { light: '#FAF5FF', dark: '#340C5B' },
      border: { light: '#EDDDFF', dark: '#4C158A' },
      text:   { light: '#8A38F5', dark: '#9118EE' },
    },
  },
  /** Generic greys, outside the Status system. */
  neutral: {
    medium: { light: '#BDBDBD', dark: '#4E4E4E' },
    light:  { light: '#CBCBCB', dark: '#434343' },
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
