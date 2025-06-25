/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pride and BIPOC inspired color palette
        'pride-purple': '#8B5CF6',
        'pride-pink': '#EC4899',
        'pride-blue': '#3B82F6',
        'pride-teal': '#14B8A6',
        'pride-yellow': '#F59E0B',
        'pride-orange': '#F97316',
        'pride-red': '#EF4444',
        'empowerment-gold': '#D97706',
        'community-green': '#10B981',
        'trust-navy': '#1E40AF',
        'warmth-coral': '#F472B6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
