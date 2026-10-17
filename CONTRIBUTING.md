# Contributing

## Branch strategy

The default branch is `master`. Create focused branches named `feat/...`, `fix/...`, `docs/...` or `chore/...`.

## Local workflow

1. Run `npm ci` with Node.js 22.13+.
2. Make a focused change and keep TypeScript types explicit.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
4. Open a pull request against `master` and document testing and risks.
5. Wait for CI and review before merging.

## Quality expectations

- Keep domain and presentation responsibilities separate.
- Handle loading, empty and error states for asynchronous UI.
- Avoid real patient data, credentials and tokens in the repository.
- Prefer accessible controls, keyboard navigation and semantic HTML.
- Document any validation you could not perform.
- Add automated tests when the test infrastructure is available; do not mark unexecuted tests as passed.
