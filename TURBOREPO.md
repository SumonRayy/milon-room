# Milon Room Turborepo Setup

This document explains the structure and setup of the Milon Room monorepo using Turborepo.

## Directory Structure

The monorepo is organized as follows:

```
milon-room/
├── apps/                  # Application code
│   ├── client/            # React TypeScript front-end
│   └── server/            # Node.js TypeScript back-end
├── packages/              # Shared packages
│   └── shared/            # Shared TypeScript types and utilities
├── turbo.json             # Turborepo configuration
├── package.json           # Root package.json for the monorepo
└── .npmrc                 # NPM configuration
```

## Packages

### apps/client

The client application is a React app built with:
- TypeScript
- Vite
- Socket.io client
- PeerJS for WebRTC
- React Router for routing

### apps/server

The server application is a Node.js app built with:
- TypeScript
- Express
- Socket.io
- PeerJS server
- UUID

### packages/shared

A shared package containing common types and utilities used by both the client and server:
- TypeScript interfaces
- Common constants
- Shared utility functions

## Turborepo Configuration

The `turbo.json` file defines the build pipeline and how tasks are executed:

- `build`: Builds all packages and applications
- `dev`: Runs development servers for all apps
- `lint`: Runs linting for all packages and applications
- `clean`: Cleans build artifacts and node_modules

## Scripts

The root `package.json` defines scripts that can be run across the entire monorepo:

- `npm run build`: Builds all packages and applications
- `npm run dev`: Starts development servers for all applications
- `npm run lint`: Lints all code
- `npm run clean`: Cleans all build artifacts

## Dependencies

Dependencies are managed at two levels:

1. **Root-level dependencies**: Dev dependencies used across the monorepo (Turborepo, ESLint, Prettier)
2. **Package-level dependencies**: Dependencies specific to each package or application

## Workspaces

The monorepo uses npm workspaces (defined in the root package.json) to link packages together and enable cross-package development.

## Benefits of this Setup

1. **Code Sharing**: The shared package allows for type-safe sharing of interfaces and utilities
2. **Consistent Development Experience**: All packages use the same tooling and configurations
3. **Efficient Builds**: Turborepo caches build outputs for faster builds
4. **Simplified Deployment**: The apps can be built and deployed independently
5. **Coordinated Changes**: Changes that affect multiple packages can be done in a single PR 