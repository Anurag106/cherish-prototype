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
        // Minimalist Cyan/Black Theme
        primary: {
          50: '#f8fafc',   // Lightest background (near white)
          100: '#f1f5f9',  // Very light background
          200: '#e2e8f0',  // Light background
          300: '#cbd5e1',  // Light border/text
          400: '#94a3b8',  // Medium text
          500: '#64748b',  // Main text (slate)
          600: '#475569',  // Dark text
          700: '#334155',  // Darker text
          800: '#1e293b',  // Very dark
          900: '#0f172a',  // Darkest (black)
        },
        
        // Custom green shades for points
        'points-green': '#10b981',
        'points-green-light': '#d1fae5',
        
        // Modern Brand Accent - Cyan System
        brand: {
          50: '#ecfeff',   // Lightest cyan tint
          100: '#cffafe',  // Very light cyan
          200: '#a5f3fc',  // Light cyan
          300: '#67e8f9',  // Medium light cyan
          400: '#22d3ee',  // Medium cyan
          500: '#06b6d4',  // Main brand color (cyan)
          600: '#0891b2',  // Darker cyan
          700: '#0e7490',  // Dark cyan
          800: '#155e75',  // Very dark cyan
          900: '#164e63',  // Darkest cyan
        },
        
        // Secondary colors (black/gray scale)
        secondary: {
          50: '#f8fafc',   // Near white
          100: '#f1f5f9',  // Very light gray
          200: '#e2e8f0',  // Light gray
          300: '#cbd5e1',  // Medium gray
          400: '#94a3b8',  // Darker gray
          500: '#64748b',  // Gray
          600: '#475569',  // Dark gray
          700: '#334155',  // Darker gray
          800: '#1e293b',  // Very dark gray
          900: '#0f172a',  // Black
        },
        
        // Success, Warning, Error System (monochrome with cyan accents)
        semantic: {
          success: {
            50: '#ecfeff',   // Light cyan background
            100: '#cffafe',  // Light cyan
            500: '#06b6d4',  // Cyan (success uses brand color)
            600: '#0891b2',  // Darker cyan
            700: '#0e7490',  // Dark cyan
          },
          warning: {
            50: '#f8fafc',   // Light background
            100: '#f1f5f9',  // Light gray
            500: '#64748b',  // Gray
            600: '#475569',  // Dark gray
            700: '#334155',  // Darker gray
          },
          error: {
            50: '#f8fafc',   // Light background
            100: '#f1f5f9',  // Light gray
            500: '#1e293b',  // Dark gray for errors
            600: '#0f172a',  // Black
            700: '#000000',  // Pure black
          },
          info: {
            50: '#ecfeff',   // Light cyan background
            100: '#cffafe',  // Light cyan
            500: '#06b6d4',  // Cyan
            600: '#0891b2',  // Darker cyan
            700: '#0e7490',  // Dark cyan
          },
        },
        
        // Accent colors (cyan and black)
        accent: {
          success: '#06b6d4',  // Cyan
          warning: '#64748b',  // Gray
          error: '#1e293b',    // Dark gray
          info: '#06b6d4',     // Cyan
        },
        
        // Modern Sidebar System
        sidebar: {
          bg: '#0f172a',        // Black background
          text: '#f8fafc',      // Near white text
          active: '#06b6d4',    // Active item background (cyan)
          hover: '#1e293b',     // Hover state (dark gray)
          border: '#334155',    // Border color (gray)
        },
        
        // Avatar Colors - Vibrant and Modern
        avatar: {
          red: '#ef4444',
          'red-light': '#fecaca',
          green: '#22c55e',
          'green-light': '#bbf7d0',
          blue: '#3b82f6',
          'blue-light': '#bfdbfe',
          purple: '#8b5cf6',
          'purple-light': '#ddd6fe',
          orange: '#f97316',
          'orange-light': '#fed7aa',
          pink: '#ec4899',
          'pink-light': '#fbcfe8',
          indigo: '#6366f1',
          'indigo-light': '#c7d2fe',
          teal: '#14b8a6',
          'teal-light': '#99f6e4',
          yellow: '#eab308',
          'yellow-light': '#fef3c7',
        },
        
        // Points Colors - Lighter Green
        points: {
          green: '#10b981',     // Lighter green for points
          'green-light': '#d1fae5',
        },
        
        // Legacy support (mapped to new cyan/black palette)
        cherish: {
          yellow: '#06b6d4',        // Cyan
          'yellow-light': '#ecfeff', // Light cyan
          'yellow-mono': '#0891b2',  // Darker cyan
          'yellow-dark': '#0e7490',  // Dark cyan
          dark: '#0f172a',           // Black
          'dark-light': '#1e293b',   // Dark gray
          red: '#06b6d4',            // Cyan (mapped)
          'red-light': '#ecfeff',    // Light cyan
          green: '#06b6d4',          // Cyan (mapped)
          'green-light': '#ecfeff',  // Light cyan
          blue: '#06b6d4',           // Cyan (mapped)
          'blue-light': '#ecfeff',   // Light cyan
          purple: '#0891b2',         // Darker cyan (mapped)
          'purple-light': '#ecfeff', // Light cyan
          orange: '#06b6d4',         // Cyan (mapped)
          'orange-light': '#ecfeff', // Light cyan
          gray: {
            50: '#f8fafc',   // Near white
            100: '#f1f5f9',  // Very light gray
            200: '#e2e8f0',  // Light gray
            300: '#cbd5e1',  // Medium gray
            400: '#94a3b8',  // Darker gray
            500: '#64748b',  // Gray
            600: '#475569',  // Dark gray
            700: '#334155',  // Darker gray
            800: '#1e293b',  // Very dark gray
            900: '#0f172a',  // Black
          }
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
