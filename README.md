# Cherish - SaaS Employee Recognition Platform

A modern, responsive SaaS dashboard built with Next.js, TypeScript, and Tailwind CSS for employee recognition and engagement.

## Features

- **Modern Design**: Clean, minimalist interface following best UX practices
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Account Settings Dashboard**: Comprehensive settings management with 4 main sections:
  - Display Settings (Company name, logo, language)
  - Interface Customization (User controls and admin features)
  - Email Customization (Welcome/invite templates and communication settings)
  - Security & Login Methods (MFA, SSO, allowed domains, security logs)

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Components**: Headless UI
- **State Management**: React hooks

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── company/
│   │   └── account-settings/     # Account settings page
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── tabs/                    # Tab components
│   │   ├── DisplaySettings.tsx
│   │   ├── InterfaceCustomization.tsx
│   │   ├── EmailCustomization.tsx
│   │   └── SecurityLogin.tsx
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── Toggle.tsx               # Toggle switch component
│   └── Tooltip.tsx              # Tooltip component
└── ...
```

## Key Components

### Sidebar Navigation
- Collapsible menu items
- Active state indicators
- Company submenu with all account settings

### Account Settings Tabs
1. **Display Settings**: Company branding and localization
2. **Interface Customization**: User permissions and admin controls
3. **Email Customization**: Email templates and communication preferences
4. **Security & Login**: Authentication methods, MFA, SSO, and security logs

### Interactive Elements
- Toggle switches with proper accessibility
- Tooltips with helpful information
- Form validation and state management
- Responsive design for all screen sizes

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Primary: Yellow/amber accent colors
- Sidebar: Dark gray theme
- Content: Light background with white panels

### Components
All components are modular and reusable. Key utility classes are defined in `globals.css` for consistent styling.

## Development

To extend functionality:
1. Add new tab components in `components/tabs/`
2. Update the tabs array in `account-settings/page.tsx`
3. Use existing components like `Toggle` and `Tooltip` for consistency
4. Follow the established design patterns and naming conventions

## Production Build

```bash
npm run build
npm start
```

## License

This project is for demonstration purposes.
