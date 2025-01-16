import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import preline from 'preline/plugin';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/preline/preline.js'],
	darkMode: 'selector',
	theme: {
		container: {
			center: true
		},
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [typography, preline]
} satisfies Config;
