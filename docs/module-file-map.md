# Module file map

## Backend

`backend/src/modules/<story>/` contains:

- `controller.ts`: NestJS HTTP boundary.
- `service.ts`: business logic boundary.
- `module.ts`: NestJS dependency module.
- `dto.ts`: story input contract.
- `index.ts`: public barrel export.
- `README.md`: branch/story scope.

## Frontend

`frontend/src/features/<story>/` contains:

- `screen.tsx`: React screen entry.
- `api.ts`: typed API boundary.
- `types.ts`: form/state contracts.
- `feature.config.ts`: story and branch metadata.
- `index.ts`: public barrel export.
- `README.md`: branch/story scope.
