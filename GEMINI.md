# GEMINI.md

## Project Overview

This is a frontend web application for an insurance service. It is built using **React** and **TypeScript**, with **Vite** as the build tool. The UI is constructed with **shadcn/ui** components, which leverages **Tailwind CSS** for styling.

The application includes basic user authentication flow with a Login page and a main Dashboard page.

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Linting**: ESLint
- **Package Manager**: npm

The main application entry point is `src/main.tsx`, which renders the `App` component. The `App.tsx` handles the routing logic between the `Login` and `Dashboard` pages.

## Building and Running

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Development

To run the local development server with hot-reloading:

```bash
npm run dev
```

### Build

To build the application for production:

```bash
npm run build
```

This command first runs the TypeScript compiler (`tsc`) and then creates a production-ready build in the `dist/` directory.

### Linting

To check the code for any linting errors:

```bash
npm run lint
```

### Preview Production Build

To serve the production build locally for previewing:

```bash
npm run preview
```

## Development Conventions

- **Component-Based Architecture**: The application follows a component-based structure. Reusable UI components are located in `src/components/ui`, while larger page components are in `src/pages`.
- **Styling**: Styling is done using Tailwind CSS utility classes. The `tailwind-merge` and `clsx` libraries are used for conditional and intelligent class name management.
- **Path Aliases**: The project is configured with a path alias `@` that points to the `src` directory for cleaner import statements.
- **State Management**: The root `App` component currently manages the login state. For more complex applications, a dedicated state management library might be needed.
