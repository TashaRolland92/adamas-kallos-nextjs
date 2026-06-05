import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				playfair: ["Playfair Display", "serif"],
				lato: ["Lato", "sans-serif"],
			},
			lineHeight: {
				'12': '3.5rem',
				'13': '4rem',
				'14': '4.5rem',
			},
			colors: {
				primaryContent: "#0E4148",
				babyblue: "#e4f4f3",
				aquamarine: "#a1dbf1",
				tiffanyblue: "#71d5e4",
				bluegreen: "#00b6bc",
			},
			transitionProperty: {
				'width': 'width',
			},
		},
	},
	plugins: [
		function ({ addUtilities }: { addUtilities: Function }) {
			const generateFontClass = (fontFamily: string[], weight: number, style = "normal") => ({
				fontFamily: fontFamily.join(", "),
				fontWeight: weight,
				fontStyle: style,
			});

			addUtilities({
				".playfair": generateFontClass(["Playfair Display"], 400),
				".playfair-500": generateFontClass(["Playfair Display"], 500),
				".playfair-600": generateFontClass(["Playfair Display"], 600),
				".playfair-700": generateFontClass(["Playfair Display"], 700),
				".playfair-800": generateFontClass(["Playfair Display"], 800),
				".playfair-900": generateFontClass(["Playfair Display"], 900),
				".playfair-italic-400": generateFontClass(["Playfair Display"], 400, "italic"),
				".playfair-italic-700": generateFontClass(["Playfair Display"], 700, "italic"),
				".playfair-italic-900": generateFontClass(["Playfair Display"], 900, "italic"),
				".lato": generateFontClass(["Lato", "sans-serif"], 400),
				".lato-700": generateFontClass(["Lato", "sans-serif"], 700),
				".lato-italic-400": generateFontClass(["Lato", "sans-serif"], 400, "italic"),
				".lato-italic-700": generateFontClass(["Lato", "sans-serif"], 700, "italic"),
			});
		},
	],
} satisfies Config;
