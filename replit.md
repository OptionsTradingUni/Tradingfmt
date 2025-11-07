# Screenshot Generator Platform

## Overview

This is a web application for generating realistic screenshot mockups of Discord testimonials and trading platform profit/loss statements. Users can customize text, figures, colors, and styling to create authentic-looking screenshots for various purposes. The application provides a live preview and allows users to download generated images.

The platform features two primary generator modes:
1. **Discord Testimonials** - Creates realistic Discord message screenshots with customizable usernames, avatars, messages, reactions, and themes
2. **Trading Screenshots** - Generates various trading platform UI mockups including P&L statements, account summaries, position details, and order confirmations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized builds
- Client-side routing using Wouter (lightweight alternative to React Router)

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives, providing accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme customization supporting light/dark modes
- Custom design system following Material Design principles with Discord/trading platform mimicry for generated outputs

**State Management**
- TanStack Query (React Query) for server state management and API data fetching
- React hooks for local component state
- Form state managed through controlled components

**Image Generation**
- html-to-image library (specifically `toPng`) for converting DOM elements to downloadable PNG images
- Ref-based capture of preview components for screenshot generation

**Layout Strategy**
- Responsive two-column layout (40% controls, 60% preview) on desktop
- Single-column stacked layout on mobile
- Sticky preview panel that follows scroll on desktop viewports

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Node.js runtime with ES modules
- TypeScript for type safety across server code

**Development & Production Setup**
- Vite middleware integration in development for SSR and HMR
- Separate build process for production (client bundled with Vite, server with esbuild)
- Custom logging middleware for API request tracking

**API Structure**
- RESTful API endpoints under `/api` prefix
- Stock price fetcher using Yahoo Finance public API (no authentication required)
- Endpoint: `GET /api/stock/:symbol` returns real-time stock data including price, change, and market cap

### Data Storage Solutions

**Current Implementation**
- In-memory storage using Map data structures (MemStorage class)
- User management with CRUD operations for demonstration/development purposes
- Schema defined with Drizzle ORM for future PostgreSQL integration

**Database Schema (Prepared)**
- Users table with UUID primary keys, username, and password fields
- Drizzle ORM configuration pointing to PostgreSQL
- Migration directory structure ready for schema deployment
- Environment variable `DATABASE_URL` required for database connection

**Rationale**: In-memory storage is used for rapid prototyping and development. The architecture is prepared for PostgreSQL integration with Drizzle ORM when persistence is needed. This allows the application to function immediately while maintaining a clear migration path to production-ready data storage.

### External Dependencies

**Third-Party Services**
- **Yahoo Finance API** - Free, unauthenticated stock price data retrieval
  - Endpoint: `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
  - Provides real-time and historical stock pricing information
  - No API key required

**Database (Configured, Not Active)**
- **PostgreSQL** via Neon Database driver (`@neondatabase/serverless`)
- Connection managed through `DATABASE_URL` environment variable
- Drizzle ORM for schema management and query building

**UI & Component Libraries**
- **Radix UI** - Comprehensive set of accessible, unstyled React components (accordion, dialog, dropdown, select, tabs, toast, etc.)
- **Shadcn/ui** - Pre-styled component layer on top of Radix UI following design system conventions
- **Embla Carousel** - Touch-enabled carousel/slider functionality
- **Lucide React** - Icon library for consistent iconography

**Styling & Design**
- **Tailwind CSS** - Utility-first CSS framework with PostCSS processing
- **class-variance-authority** - Utility for creating variant-based component styles
- **clsx** & **tailwind-merge** - Class name merging and conditional styling

**Form Handling**
- **React Hook Form** - Performant form state management with validation
- **Zod** - Schema validation library
- **@hookform/resolvers** - Validation resolver integration

**Image Processing**
- **html-to-image** - DOM-to-image conversion for screenshot generation

**Deployment & Infrastructure**
- **Railway** deployment configuration with Nixpacks builder
- Auto-restart policy on failure (max 10 retries)
- Environment-based configuration for development vs. production

**Development Tools**
- **Replit-specific plugins** for error overlays, dev banners, and cartographer integration
- Custom Vite plugins for enhanced development experience within Replit environment