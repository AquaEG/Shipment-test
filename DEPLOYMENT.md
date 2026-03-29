# Deployment Guide

This repository is designed as a frontend prototype for an AI assistant dashboard. It does not require any backend code in the repo to run locally, but it does need an environment variable for the live webhook.

## Required Environment

Create a `.env` file from `.env.example` and set:

```env
VITE_N8N_WEBHOOK_URL=https://your-domain.com/webhook/your-endpoint
```

If this variable is missing, the assistant page will still load, but live chat requests will show a clear configuration error in the UI.

## Local Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Upload Notes

- Do not commit `.env`
- `.env.example` should remain committed so other environments know which variable to define
- The webhook URL must never be hardcoded into component files

## Service Contract

The assistant request is handled by `src/services/assistantApi.ts`. If you later add authentication headers, that file is the right place to extend the request without changing the chat UI.
