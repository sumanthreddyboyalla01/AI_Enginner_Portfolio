# ADR 0002: Testing Strategy and QA

## Status

Accepted

## Context

As part of the final production hardening, the codebase lacked a comprehensive testing strategy. A robust safety net is required to prevent regressions as the application scales.

## Decision

We chose the following testing stack:

1. **Vitest + JSDOM**: For unit testing and component testing. It provides native TypeScript support and is extremely fast as it's built on Vite.
2. **React Testing Library (RTL)**: For behavior-driven component testing. We prioritize testing user interactions over implementation details.
3. **Playwright**: For End-to-End (E2E) testing. It allows testing the full integrated application across different browsers in a real environment.

## Consequences

- Requires developers to maintain tests alongside features.
- CI pipeline execution time will increase slightly, but confidence in releases will increase significantly.
