# Quillhaven Freight: shipment tracker

> **TRAINING ONLY.** Quillhaven Freight is a made-up company. All data in this repo is fake, and the keys are not real. This repo was built for the "Claude for Security Leaders" hands-on. Do not deploy it.

A small web API the Quillhaven dispatch team uses to track shipments, attach delivery paperwork, and export customer lists for finance.

## Run it

```bash
npm install
npm test
npm start
```

Sign in by sending a demo token in the `x-api-token` header:

| Who | Token |
| --- | --- |
| Dispatcher | `demo-dispatcher-token` |
| Admin | `demo-admin-token` |

## Endpoints

- `GET /health`
- `GET /api/shipments/search?q=...`
- `GET /api/shipments/:id`
- `POST /api/shipments/:id/documents` with `{ "filename": "...", "content": "<base64>" }`
- `GET /api/admin/stats`
- `GET /api/admin/customers`
- `PATCH /api/settings`
