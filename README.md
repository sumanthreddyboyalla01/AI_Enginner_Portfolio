# AI Engineer Hub - Enterprise Frontend Codebase

This project is a React + TypeScript + TanStack Start application, built to Google/Meta Staff Engineer standards.

### Production Infrastructure
- **Feature-Based Architecture**: Separation of concerns (`src/features`, `src/data`, `src/components/ui`)
- **Strict TypeScript & ESLint**: Robust static analysis and type safety
- **Automated Testing**: Vitest (Unit/Integration), React Testing Library, and Playwright (E2E)
- **Security**: Strict Content Security Policy (CSP), anti-clickjacking headers, and XSS protection
- **Observability**: Real-time error tracking (Sentry) and Core Web Vitals monitoring
- **Performance Optimization**: Lazy loading, asset optimization, and rollup bundle visualization
- **CI/CD Pipeline**: GitHub Actions testing, building, and deploying 
- **Accessibility**: 100% WCAG 2.2 AA compliant with automated a11y testing

## Architecture Overview
The application uses a **Feature-Based Architecture**:
- `src/features`: Contains isolated domain logic (`portfolio`, `core`).
- `src/components/shared`: Reusable behaviors (e.g. `LazyMount`, `Tilt3D`).
- `src/components/ui`: Radix UI accessible primitives via Shadcn.
- `src/data`: Static config arrays, completely decoupled from React.
- `src/types`: Strict global TypeScript interfaces (`strict: true`).

## Tech Stack
- **Framework**: React 19 + TanStack Router/Start
- **Build Tool**: Vite 8
- **Language**: TypeScript (Enterprise Strict Mode)
- **Styling**: Tailwind CSS v4 (CSS Variables / Token-driven)
- **Animation**: Motion (Framer Motion)
- **CI/CD**: GitHub Actions

## Setup Instructions
```bash
npm install
npm run dev
```

## Testing Guide
*(Testing stack initialized for Playwright / Vitest)*
```bash
npm run typecheck
npm run lint
npm run build
```

## Performance
- **Lazy Loading**: Implemented via `IntersectionObserver` & `React.Suspense` (`LazyMount`).
- **Asset Optimization**: Code-splitting at the route level via TanStack Router.
- **Rendering**: Heavy components like `Hero` use `React.memo` to prevent redundant re-renders.

## Security
- Strict `tsconfig.json` (`noUncheckedIndexedAccess`).
- CI pipeline blocks merges if typechecks fail.

## Documentation
See `docs/adr` for Architecture Decision Records.
