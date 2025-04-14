import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	theme: {
		container: {
			center: true
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
				serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
				mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: [typography]
} satisfies Config;
