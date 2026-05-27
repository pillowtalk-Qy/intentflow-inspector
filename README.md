# IntentFlow Inspector

A lightweight LI.FI Intents developer education demo for the LI.FI Builders mini challenge.

The demo shows how a cross-chain desired outcome becomes a LI.FI Intents quote, how developers can inspect the quote response, and how the order lifecycle moves through solver delivery and settlement.

## Live Demo

- Demo: https://intentflow-inspector.intentflow-inspector.workers.dev/
- Repository: https://github.com/pillowtalk-Qy/intentflow-inspector

## What This Demonstrates

- How to structure a `POST https://order.li.fi/quote/request` payload.
- How `exact-input` and `exact-output` intents differ.
- Why `quoteId`, `validUntil`, `preview.outputs`, `exclusiveFor`, `partialFill`, and `failureHandling` matter.
- How the flow moves from `Intent` to `Quote` to `Signed` to `Delivered` to `Settled`.
- How solver standing quotes and inventory affect route availability.
- How to export a thread-ready explanation after a quote is received.
- How to teach no-quote states such as route unavailability, thin solver inventory, and quote expiry.
- How the high-level architecture connects user intent, order server, solver fill, verification, and settlement.

## Demo Story

The main scenario is a merchant invoice settlement flow:

> A buyer pays a 10 USDC invoice from Base. The merchant wants the received funds on Arbitrum for treasury and payout operations. Instead of asking the buyer to choose a bridge route, the app asks LI.FI Intents for an outcome-based quote and lets solvers compete to deliver the result.

Two additional scenarios are included:

- Exact repayment: source chain payment, exact destination amount.
- Treasury refill: stablecoin inventory movement with a solver-oriented explanation.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

The production build writes to `dist/`.

## Deploy to Vercel

This project is a static Vite app and can be deployed directly on Vercel.

Recommended Vercel settings:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

The same settings are also captured in `vercel.json`.

Deployment flow:

1. Push this project to a GitHub repository.
2. Open Vercel and import the repository.
3. Keep the Vite defaults, or confirm the settings above.
4. Deploy and use the generated Vercel URL as the public demo link.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

After pushing to GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`, or run the workflow manually from the `Actions` tab.

The deployed demo will be available from the Pages URL shown by GitHub.

## Deploy to Cloudflare Workers

To get a URL like `https://intentflow-inspector.<your-subdomain>.workers.dev`, deploy the Vite build as Cloudflare Workers static assets.

Recommended flow:

```bash
npm install
npm run build
npx wrangler login
npm run deploy:worker
```

The Worker config is in `wrangler.jsonc`:

- Worker name: `intentflow-inspector`
- Static assets directory: `dist`
- SPA fallback: `single-page-application`

After deployment, Wrangler prints the public `workers.dev` URL.

## Live Quote and Fallback Mode

The app attempts to call:

```text
POST https://order.li.fi/quote/request
```

If the live order server, network, or route is unavailable, the demo switches to fallback quote data. This keeps the walkthrough reliable for reviewers while making it clear when data is not live.

## Demo Sections

- Scenario Builder: choose a realistic builder use case and swap type.
- Quote Request: inspect the generated LI.FI Intents request body.
- Quote Inspector: request a live quote, inspect the best quote, and understand key fields.
- Export Explanation: turn a quote into thread-ready teaching copy.
- Lifecycle Timeline: simulate the intent flow from quote to settlement.
- Solver Lens: compare live quote solver signals with illustrative mock solver cards for fees, inventory, and availability.
- Failure Lab: teach the no-quote path instead of hiding it.
- Architecture Map: connect the user, order server, solver, verification, and settlement stages.
- Builder Handoff: copy `curl` and TypeScript integration snippets.

## Technical Notes

- The request preview uses EIP-7930 interoperable address formatting for users, receivers, and assets.
- The default integration type is `oif-escrow-v0`.
- The best quote is shown from `quotes[0]`.
- The live quote request has an 8 second timeout so the UI never hangs during judging.
- The fallback quote is intentionally labeled so reviewers can distinguish live API output from demo data.
- Solver Lens cards are illustrative mock data; live quote source, `exclusiveFor`, and `validUntil` are shown separately when a quote is available.
- The demo does not submit or sign an order. It focuses on education around quote construction, response inspection, lifecycle states, and solver matching.

## Submission Checklist

- Deploy the app or publish the repo.
- Record a short walkthrough after the launch post is available.
- Quote the LI.FI Intents launch post on X during the submission window.
- Include the demo link, repo link, and video link in the quote post or submission form.
- Submit an EVM payout address that supports Arbitrum.

## Suggested Video Walkthrough

Keep the screen recording around 2-3 minutes.

1. Show the merchant invoice scenario.
2. Explain that the app describes the merchant's destination outcome instead of asking the buyer to choose a bridge.
3. Open the generated quote request body.
4. Request a quote and inspect the best quote at index `0`.
5. Point out `quoteId`, expiry, output preview, selected solver metadata, partial fill, and failure handling.
6. Run the lifecycle simulation: `Intent -> Quote -> Signed -> Delivered -> Settled`.
7. Use Solver Lens to compare the live quote signal with illustrative solver inventory and explain what can be filled.

## X Thread Draft

1. I built IntentFlow Inspector for the LI.FI Intents launch: a small builder demo that turns a merchant invoice outcome into a live LI.FI Intents quote.
2. Scenario: a buyer pays 10 USDC from Base, while the merchant wants settlement on Arbitrum. The UI builds an exact-input intent instead of asking the buyer to choose a bridge route.
3. The inspector shows the request body, best quote at `quotes[0]`, `quoteId`, `validUntil`, output preview, exclusive solver signal, partial fills, and failure handling.
4. I also added a lifecycle view, no-quote failure lab, illustrative solver lens, and copyable `curl` / TypeScript snippets so other builders can reuse the integration shape.
5. Demo: https://intentflow-inspector.intentflow-inspector.workers.dev/
6. Repo: https://github.com/pillowtalk-Qy/intentflow-inspector
7. Walkthrough video: add your recording link here before posting.

## Official Resources

- LI.FI Intents docs: https://docs.li.fi/lifi-intents/introduction
- Request a Quote: https://docs.li.fi/lifi-intents/intents-api/request-quote
- Track Status: https://docs.li.fi/lifi-intents/intents-api/track-status
