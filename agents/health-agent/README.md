# health-agent

TypeScript agent logic migrated from the legacy folder at [../../viejo/src](../../viejo/src).

## Structure

- `src/index.ts`: executable demo and requirement checks.
- `src/types/models.ts`: domain types for patients and appointments.
- `src/utils/*.ts`: search, collection filtering, reporting, and validations.

## Run

1. `npm install`
2. `npm run check`
3. `npm run dev`
4. `npm run test`

## Migration notes

- Legacy path `viejo/src/*` was migrated to `agents/health-agent/src/*`.
- Internal imports were kept relative to the new `src/` tree.