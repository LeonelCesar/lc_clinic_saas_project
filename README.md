# Clinic SaaS — Clinic Management Dashboard

A React and TypeScript clinic-management frontend, developed as a portfolio project with production-oriented engineering practices.

> **Demo application:** Uses a simulated data layer and browser storage. **Not intended for real patient information or clinical use.**

## Features

- Dashboard with clinic activity metrics and charts
- Patient management: search, filters, sorting, pagination and CRUD workflows
- Doctor management and visual statistics
- Appointment scheduling and status management
- Authentication UI and protected application routes
- Loading, error and empty states

## Technology

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS 4, Lucide |
| Routing | React Router 7 |
| Server-state patterns | TanStack Query |
| Client state | Zustand |
| Forms | React Hook Form, Zod |
| Visualization | Recharts |
| Mocking | Browser storage, MSW |

## Getting started

**Requirements:** Node.js 22.13+ (or a compatible newer LTS) and npm.

```bash
git clone https://github.com/leonel-cesar-developer/lc_clinic_saas_project.git
cd lc_clinic_saas_project
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

These checks run automatically on pull requests and pushes to the default branch. Automated unit and integration tests are a planned improvement; no test suite is claimed here.

## Architecture overview

- `src/app` — application routing and route protection
- `src/components` — reusable and feature-level UI
- `src/hooks` — UI orchestration and data-access hooks
- `src/providers` — shared providers and query-client configuration
- `src/stores` — authentication and client state
- `src/pages` and/or `src/page` — route-level screens
- `src/types` — domain contracts and mock data setup

The application is a **frontend demonstration**. Browser storage is not a secure database, and client-side route protection is not a substitute for server-side authorization. Do not enter real medical or personal information.

## Engineering workflow

1. Create a focused branch from `master`.
2. Implement the change with type safety and relevant checks.
3. Open a pull request with a summary and verification notes.
4. Review CI results and code changes before merging.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contributor workflow and [.github/pull_request_template.md](.github/pull_request_template.md) for the review checklist.

## Roadmap

- Automated unit and integration tests
- Accessibility and responsive-behavior audit
- Stronger validation and error boundaries
- Backend authentication and authorization for any future real-world deployment
- Screenshots and a public demo URL after deployment verification

## License

No license is currently declared. All rights remain with the repository owner unless a license is added.
