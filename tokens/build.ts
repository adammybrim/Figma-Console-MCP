/**
 * Regenerates tokens.css and typography.css from tokens.ts.
 * Run via: npm run build:tokens
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { colors, typography, spacing } from './tokens.ts';

const here = dirname(fileURLToPath(import.meta.url));

const HEADER =
  '/* AUTO-GENERATED from tokens.ts. Do not edit by hand.\n' +
  '   Run "npm run build:tokens" to regenerate. */\n\n';

type ModeColor = { light: string; dark: string };

function isModeColor(v: unknown): v is ModeColor {
  return (
    typeof v === 'object' && v !== null &&
    typeof (v as { light?: unknown }).light === 'string' &&
    typeof (v as { dark?: unknown }).dark === 'string'
  );
}

function flatten(obj: Record<string, unknown>, prefix: string[] = []): Array<[string, ModeColor]> {
  const out: Array<[string, ModeColor]> = [];
  for (const [k, v] of Object.entries(obj)) {
    if (isModeColor(v)) {
      out.push([[...prefix, k].join('-'), v]);
    } else if (v && typeof v === 'object') {
      out.push(...flatten(v as Record<string, unknown>, [...prefix, k]));
    }
  }
  return out;
}

const flatColors = flatten(colors as unknown as Record<string, unknown>);

const lightVars = flatColors
  .map(([name, { light }]) => `  --${name}: ${light};`)
  .join('\n');

const darkVars = flatColors
  .filter(([, { light, dark }]) => light !== dark)
  .map(([name, { dark }]) => `  --${name}: ${dark};`)
  .join('\n');

const spacingVars = Object.entries(spacing)
  .map(([k, v]) => `  --space-${k}: ${v}px;`)
  .join('\n');

const tokensCss = `${HEADER}:root {
  --font-sans: ${typography.fontFamily.sans};

${lightVars}

${spacingVars}
}

[data-theme="dark"] {
${darkVars}
}
`;

writeFileSync(resolve(here, 'tokens.css'), tokensCss);
console.log('✓ tokens/tokens.css');

const typographyCss = HEADER + Object.entries(typography.styles)
  .map(([name, spec]) => `.text-${name} {
  font-family: var(--font-sans);
  font-size: ${spec.fontSize}px;
  line-height: ${spec.lineHeight}px;
  font-weight: ${spec.fontWeight};
}`)
  .join('\n\n') + '\n';

writeFileSync(resolve(here, 'typography.css'), typographyCss);
console.log('✓ tokens/typography.css');
