# health-agent

Lógica del agente en TypeScript migrada desde la carpeta legacy [../../viejo/src](../../viejo/src).

## Estructura

- `src/index.ts`: demo ejecutable y validación de requisitos.
- `src/types/models.ts`: tipos de dominio para pacientes y citas.
- `src/utils/*.ts`: búsquedas, filtrado de colecciones, reportes y validaciones.

## Ejecutar

1. `npm install`
2. `npm run check`
3. `npm run dev`
4. `npm run test`

## Notas de migración

- La ruta legacy `viejo/src/*` se migró a `agents/health-agent/src/*`.
- Los imports internos se mantuvieron relativos al nuevo árbol `src/`.