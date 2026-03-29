# AI Assistant Dashboard

Production-ready React + TypeScript + Tailwind prototype for an AI assistant that manages email, calendar, and sheets through a chat interface.

## What it includes

- Routed dashboard pages for `Dashboard`, `AI Assistant`, `Email`, `Calendar`, `Sheets`, `Activity Log`, and `Settings / Integrations`
- Centralized webhook service for n8n integration
- Environment-driven config via `VITE_N8N_WEBHOOK_URL`
- Loading, timeout, retry, and error handling for assistant requests
- Responsive dark SaaS UI with glass panels and glow accents

## Deployment note

The assistant webhook endpoint is read from the environment only. It is not hardcoded in the app.

Set this in your local `.env` file:

```env
VITE_N8N_WEBHOOK_URL=https://your-domain.com/webhook/your-endpoint
```

## Status

This file is intended as a GitHub-visible project overview for the new dashboard build.
