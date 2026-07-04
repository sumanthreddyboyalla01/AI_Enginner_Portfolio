# ADR 0003: Security and Observability Implementation

## Status
Accepted

## Context
To achieve production-grade maturity, the application required standard security headers and observability to monitor performance and runtime errors.

## Decision
1. **Security (CSP)**: Added strict Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers to the application root to prevent XSS, clickjacking, and mime-sniffing attacks.
2. **Observability (Sentry + Web Vitals)**: Integrated `@sentry/react` for robust runtime error capturing and session replay, combined with `web-vitals` to track Core Web Vitals (CLS, INP, LCP). 

## Consequences
- Inline scripts and evals are restricted by CSP, forcing better security practices.
- Production debugging will be significantly easier due to Sentry trace linking and crash reporting.
