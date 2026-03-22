import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SITE_NAME } from './constants';

const interRegular = readFileSync(
  join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff')
);
const serifExtrabold = readFileSync(
  join(
    process.cwd(),
    'node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-800-normal.woff'
  )
);
const monoSemibold = readFileSync(
  join(
    process.cwd(),
    'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff'
  )
);

const WIDTH = 1200;
const HEIGHT = 630;

// Colors from app.css (light theme for OG — always light for consistency)
const COLORS = {
  primary: '#000000',
  accent: '#4361ee',
  muted: '#8e8e8e',
  background: '#f6f6f6',
};

// Dotted pattern as a data URI SVG (5x5 grid)
const DOT_COLOR = 'rgba(142,142,142,0.2)';
const dotPatternSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5"><circle cx="1" cy="1" r="0.8" fill="${DOT_COLOR}"/></svg>`;
const dotPatternDataUri = `data:image/svg+xml,${encodeURIComponent(dotPatternSvg)}`;

interface OgOptions {
  prefix?: string; // e.g. "## blog"
  title: string;
  subtitle?: string;
}

export async function generateOgImage({ prefix, title, subtitle }: OgOptions): Promise<Response> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.background,
          position: 'relative',
        },
        children: [
          // Dotted background layer
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url("${dotPatternDataUri}")`,
                backgroundSize: '5px 5px',
                maskImage:
                  'radial-gradient(ellipse 70% 70% at center, transparent 30%, black 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 70% 70% at center, transparent 30%, black 100%)',
              },
            },
          },
          // Content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 10%',
              },
              children: [
                // ## prefix
                ...(prefix
                  ? [
                      {
                        type: 'p',
                        props: {
                          style: {
                            fontFamily: 'JetBrains Mono',
                            fontSize: 20,
                            fontWeight: 600,
                            color: COLORS.accent,
                            letterSpacing: '-0.02em',
                            margin: 0,
                          },
                          children: prefix,
                        },
                      },
                    ]
                  : []),
                // Title
                {
                  type: 'p',
                  props: {
                    style: {
                      fontFamily: 'Source Serif 4',
                      fontSize: title.length > 30 ? 72 : 88,
                      fontWeight: 800,
                      lineHeight: 1.05,
                      color: COLORS.primary,
                      margin: 0,
                      marginTop: prefix ? 12 : 0,
                    },
                    children: title,
                  },
                },
                // Subtitle
                {
                  type: 'p',
                  props: {
                    style: {
                      fontFamily: 'Inter',
                      fontSize: 18,
                      color: COLORS.muted,
                      margin: 0,
                      marginTop: 24,
                    },
                    children: subtitle || `${SITE_NAME} · devleo.ch`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Source Serif 4', data: serifExtrabold, weight: 800, style: 'normal' },
        { name: 'JetBrains Mono', data: monoSemibold, weight: 600, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  });
  const pngData = resvg.render().asPng();

  return new Response(pngData.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
