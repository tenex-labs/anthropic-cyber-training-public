# Quillhaven Freight: shipment tracker (training app)

> [!WARNING]
> **This is a fake app built for security training. It is full of security problems on purpose.**
>
> - Quillhaven Freight is not a real company. Every customer, shipment, person, email, and phone number here is made up.
> - The keys and passwords in this code are fake. They don't unlock anything.
> - It isn't connected to any real system, and it never was.
> - **Do not deploy it, and do not copy its code into a real project.**
>
> It's used in the "Claude for Security Leaders" hands-on, where people practice finding and fixing flaws with Claude. Tenex runs the workshop.

## About this repo

During a workshop, attendees fork this repo, fix flaws on their own fork, and open a pull request back here. A security check reviews every pull request. **Nothing is ever merged.** The hosts close all workshop pull requests after each event.

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
