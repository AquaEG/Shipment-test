# AI Assistant Dashboard

A production-ready React + TypeScript + Tailwind dashboard for an AI assistant that manages email, calendar, and sheets through a chat interface. The assistant sends messages to an n8n webhook through a centralized service layer and reads the endpoint from an environment variable only.

## Features

- Routed dashboard with `Dashboard`, `AI Assistant`, `Email`, `Calendar`, `Sheets`, `Activity Log`, and `Settings / Integrations`
- Centralized webhook helper with timeout, retry, and error handling
- Flexible response parsing for different n8n payload shapes
- Responsive dark SaaS UI with glass panels and glow accents
- Mock content for a demo-ready product surface
- Clear UI state when the webhook env variable is missing

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your n8n webhook URL:

```env
VITE_N8N_WEBHOOK_URL=https://your-domain.com/webhook/your-endpoint
```

4. Start the development server:

```bash
npm run dev
```

## Production Preview

```bash
npm run build
npm run preview
```

## Webhook Contract

The AI Assistant page sends a POST request through `src/services/assistantApi.ts`. The request body is modular and includes:

```json
{
  "message": "Review urgent inbox items",
  "conversationId": "agent-ops-demo",
  "channel": "assistant-dashboard",
  "context": {
    "integrations": ["email", "calendar", "sheets"],
    "currentPage": "assistant",
    "workspace": "executive-ops"
  },
  "metadata": {
    "sentAt": "ISO-8601",
    "timezone": "local timezone",
    "locale": "browser locale"
  }
}
```

## Environment Rules

- The webhook URL is read only from `VITE_N8N_WEBHOOK_URL`
- If the variable is missing, the app shows a friendly `Webhook endpoint is not configured` state
- Future auth headers can be added in the service layer without touching the chat UI

## Project Files

- `src/config/env.ts` for environment access and webhook state
- `src/services/assistantApi.ts` for the centralized fetch logic
- `src/pages/` for the dashboard pages
- `src/mock/data.ts` for realistic mock content
- `PROJECT_OVERVIEW.md` for a short GitHub-facing summary

## Deployment

This project is ready for static hosting after `npm run build`. It can be deployed to any Vite-compatible platform or uploaded directly to GitHub as source for later CI/CD setup.
