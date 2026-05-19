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

function flatten(obj: Record<string, unknown>, prefix: string[] = []): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      out.push([[...prefix, k].join('-'), v]);
    } else if (v && typeof v === 'object') {
      out.push(...flatten(v as Record<string, unknown>, [...prefix, k]));
    }
  }
  return out;
}

const colorVars = flatten(colors as unknown as Record<string, unknown>)
  .map(([name, value]) => `  --${name}: ${value};`)
  .join('\n');

const spacingVars = Object.entries(spacing)
  .map(([k, v]) => `  --space-${k}: ${v}px;`)
  .join('\n');

const tokensCss = `${HEADER}:root {
  --font-sans: ${typography.fontFamily.sans};

${colorVars}

${spacingVars}
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
