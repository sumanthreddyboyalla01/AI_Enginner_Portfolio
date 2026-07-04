# ADR 0001: Feature-Based Architecture Migration

## Status
Accepted

## Context
The previous architecture used a flat `src/components/portfolio` directory containing all UI components, logic, and data. As the application grows to 100+ components, this flat structure makes it difficult to maintain separation of concerns, scale the team, and isolate testing.

## Decision
We are migrating to a Feature-Based Architecture:
- `src/features/*`: Domain-specific components (e.g., `portfolio`, `core`).
- `src/components/shared/*`: Reusable UI components.
- `src/components/ui/*`: Radix UI/Shadcn primitives.
- `src/data/*`: Static configuration and data arrays.
- `src/types/*`: Global TypeScript interfaces.
- `src/app/*`: Global providers, routing, and setup.

## Consequences
- **Positive**: Strict separation of concerns (UI vs Data vs Types).
- **Positive**: Reduced cognitive load when navigating the codebase.
- **Positive**: Smaller bundle chunks due to better static analysis by Vite/Rollup.
- **Negative**: Increased complexity for simple components that now require multiple files.
