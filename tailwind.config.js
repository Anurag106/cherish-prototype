/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffef5',
          100: '#fffde8',
          200: '#fffa75',
          300: '#fff54d',
          400: '#fff024',
          500: '#fbbf24',
          600: '#f59e0b',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
        },
        cherish: {
          yellow: '#ffd700', // More vivid gold
          'yellow-light': '#fffbf0', // Warmer light background
          'yellow-mono': '#ffb800', // Vibrant yellow for coins
          'yellow-dark': '#cc9900', // Darker yellow for depth
          dark: '#1a1a2e',
          'dark-light': '#16213e',
          purple: '#f9ca24', // Light yellow instead of purple
          'purple-light': '#f0932b', // Orange-yellow instead of purple-light
          orange: '#fd79a8', // Vibrant pink-orange
          'orange-light': '#fdcb6e',
          green: '#00b894', // Modern teal-green
          'green-light': '#55efc4',
          red: '#e84393', // Modern pink-red
          'red-light': '#fd79a8',
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        },
        sidebar: {
          bg: '#1a1a2e',
          text: '#94a3b8',
          active: '#f9ca24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
