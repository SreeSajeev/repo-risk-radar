# BusFactor - Developer Risk Analysis Platform

## Overview

BusFactor is a web application that analyzes repository contributor patterns to assess project sustainability and predict developer churn. The application uses commit data analysis to calculate "bus factor" scores - a metric representing how many key contributors a project would lose before becoming unsustainable.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with a custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: React Router for client-side navigation
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations
- **Development Storage**: In-memory storage implementation for rapid development
- **Production Ready**: Configured for Neon Database (@neondatabase/serverless)

## Key Components

### Frontend Components
1. **Navigation System**: Fixed navbar with responsive design and route awareness
2. **Hero Section**: Animated landing page with interactive dashboard mockup
3. **Feature Grid**: Showcase of core functionality with intersection observer animations
4. **Dashboard Pages**: 
   - Repository insights and contributor analysis
   - Multi-repository comparison interface
   - Churn prediction visualization
   - Documentation system

### Backend Components
1. **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
2. **User Management**: Basic user schema with authentication-ready structure
3. **Route Registration**: Express middleware setup with logging and error handling
4. **Development Server**: Vite integration for hot module replacement

### Shared Components
1. **Schema Definitions**: Centralized database schemas using Drizzle ORM
2. **Type Safety**: Shared TypeScript types between frontend and backend
3. **Validation**: Zod schemas for runtime type checking

## Data Flow

1. **Client Requests**: React frontend makes API calls to Express backend
2. **Route Processing**: Express middleware handles request logging and validation
3. **Storage Operations**: Abstract storage interface performs CRUD operations
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: TanStack Query caches and synchronizes server state
6. **UI Updates**: React components re-render based on state changes

## External Dependencies

### UI/UX Libraries
- Radix UI for accessible component primitives
- Lucide React for consistent iconography
- Embla Carousel for interactive carousels
- Sonner for toast notifications

### Development Tools
- Vite plugins for Replit integration and runtime error overlay
- Cartographer for development environment mapping
- PostCSS with Autoprefixer for CSS processing

### Database & Validation
- Drizzle ORM for type-safe database operations
- Zod for schema validation and type inference
- @neondatabase/serverless for PostgreSQL connectivity

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **Database**: In-memory storage for rapid iteration
- **Port Configuration**: Development server on port 5000
- **Environment**: NODE_ENV=development with tsx execution

### Production Environment
- **Build Process**: Vite builds frontend, esbuild bundles server
- **Database**: PostgreSQL via Neon Database connection
- **Port Configuration**: External port 80 mapping
- **Environment**: NODE_ENV=production with optimized builds
- **Deployment Target**: Replit autoscale infrastructure

### Build Configuration
- Frontend assets compiled to `dist/public`
- Server code bundled to `dist/index.js`
- Static file serving in production mode
- Environment variable configuration for database connectivity

## Changelog

Changelog:
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.