# insurance-fe Project Context

This is a React frontend application for an insurance management system, built with Vite, TypeScript, and Tailwind CSS. It uses React Router for navigation and Axios for API calls. UI components are built using shadcn/ui components which are styled with Tailwind CSS.

## Project Overview

- **Type**: React/TypeScript frontend application
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Component Library**: shadcn/ui
- **API Client**: Axios
- **Key Pages**: Dashboard, Report, Policies, Login, Add Policy

## Key Files and Directories

- `src/main.tsx`: Entry point, sets up React Router with routes for main pages.
- `src/App.tsx`: Main page component.
- `src/pages/`: Directory containing page components like `Dashboard.tsx`, `Report.tsx`, etc.
- `src/components/`: Directory for reusable UI components, including shadcn/ui components in `ui/`.
- `vite.config.ts`: Vite configuration, includes Tailwind CSS and React SWC plugins, and path aliasing (`@` for `src`).
- `package.json`: Project dependencies and scripts.
- `components.json`: Configuration for shadcn/ui, including aliases for component paths.

## Building and Running

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Lint Code**: `npm run lint`
- **Preview Production Build**: `npm run preview`

## Development Conventions

- Uses TypeScript for type safety.
- Uses Tailwind CSS for styling, with a configuration likely in `tailwind.config.js` (not read but inferred from dependencies and `components.json`).
- Uses shadcn/ui for pre-built, accessible components.
- Uses Axios for making HTTP requests to a backend API (base URL configured in `Dashboard.tsx` as `http://127.0.0.1:8000/`).
- Uses React Router for client-side routing.
- Components are organized under `src/components`, with UI primitives in `src/components/ui`.
- Path alias `@` is configured for `src` directory.