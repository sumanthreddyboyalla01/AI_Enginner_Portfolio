# ADR 0004: Performance Validation & Bundle Optimization

## Status

Accepted

## Context

A production application requires strict control over bundle sizes to ensure fast load times and a perfect Lighthouse score, especially on mobile networks.

## Decision

1. **Bundle Analysis**: Added `rollup-plugin-visualizer` to the Vite configuration to automatically generate bundle size analysis.
2. **Code Splitting & Lazy Loading**: Enforced through TanStack Router's built-in lazy loading and code splitting.
3. **Core Web Vitals**: Actively monitored during CI and production via the `web-vitals` library.

## Consequences

- Developers can easily identify large dependencies via visual bundle outputs before merging changes.
- Ensures the application sustains a 100/100 Lighthouse performance score.
