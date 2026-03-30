# Market Minds AI Shipment Tracking System

A production-ready shipment tracking web app built with React, Vite, TypeScript, and Tailwind CSS. It is designed for the Market Minds AI brand, sends tracking numbers to a configurable webhook through environment variables, normalizes flexible response data, and renders a polished SaaS-style dashboard.

## Features

- Responsive shipment tracking experience with a modern dashboard UI
- Configurable webhook integration for n8n or any backend automation flow
- Mock mode for local testing before connecting a real endpoint
- Safe response normalization for flexible webhook payloads
- Loading, error, success, idle, and no-results states
- Shipment history timeline with progress steps
- Copy tracking number and refresh actions

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

## Webhook Environment Setup

The webhook is environment-based already. It is not hardcoded inside the React components.

Set the webhook URL in your `.env` file:

```env
VITE_TRACKING_USE_MOCK=false
VITE_TRACKING_WEBHOOK_URL=https://your-domain.com/webhook/shipment-tracking
```

The integration settings are read from:

- `src/config/tracking.ts`

That file reads:

- `VITE_TRACKING_USE_MOCK`
- `VITE_TRACKING_WEBHOOK_URL`

This lets you deploy different webhook endpoints for local, staging, and production environments without editing the UI code.

## Request Payload

The frontend sends this POST body to your webhook:

```json
{
  "tracking_number": "TRK123456789"
}
```

## Expected Response

The app is built to accept flexible response shapes. It works best with fields like:

- `tracking_number`
- `shipment_status`
- `current_location`
- `last_update`
- `estimated_delivery`
- `carrier_name`
- `recipient_name`
- `shipment_history`

It also attempts to normalize alternative keys such as `status`, `carrier`, `history`, `timeline`, `events`, and nested objects under `data`, `result`, or `shipment`.

## Mock Mode

Mock mode is enabled by default through `.env.example`:

```env
VITE_TRACKING_USE_MOCK=true
```

This lets you test the UI without a live backend. When you are ready to connect n8n, switch it to `false` and add your webhook URL.

## Notes For Integration

- `src/services/trackingService.ts` contains the webhook request logic.
- `src/lib/normalizeShipment.ts` contains the response normalization logic.
- `src/lib/mockShipment.ts` contains the fallback mock shipment payload.
- If your webhook returns a slightly different schema later, update the normalization keys instead of rewriting UI components.

## Deployment

This app is compatible with standard Vite deployments, including:

- Vercel static hosting
- Netlify
- Cloudflare Pages
- Any static file hosting after `npm run build`
