# Tech Stack Snapshot — TimeBroker.ai (Delray.services) — 2026-07-04

> Verified by direct file reads on 2026-07-04. Site is a **STATIC HTML site** (no Vite/React), deployed to Firebase Hosting on the shared flagship project `ac-godmode-titan`.

## Identity
- **Live:** `timebroker-ai.web.app` / `timebroker.ai` (canonical) + secondary `delray-services` hosting target.
- **Firebase project:** `ac-godmode-titan` (shared with flagship; this repo hosts only static assets — the Cloud Functions live in the flagship repo).
- **Deploy target:** hosting site `timebroker-ai` (the `delray-services` site is stale/404s — always deploy `--only hosting:timebroker-ai`).
- **Repo:** `H:\SovereignCloud\1-PERSONAL\delray-services\Delray.services` (git; latest commit `c046eda` = rebrand + P0 config fix + secret redaction).
- **Role:** Delray Wannemacher's fractional CAIO consulting front-end. Personal IP holder / TimeBroker.ai DBA (owns the tech IP; licenses to the for-profit). 2026-07-04 rebrand repositioned messaging toward **nonprofits + local businesses** ("give them their time back").

## Frontend — STATIC HTML/CSS/JS (no framework)
- **Styling:** Tailwind via CDN (`https://cdn.tailwindcss.com`, per-page `tailwind.config` inline), FontAwesome CDN, Google Fonts (Montserrat / Playfair Display / Space Grotesk). No build step, no bundler.
- **Pages:**
  - `index.html` — hero + gap-consult funnel, full Organization/Person/WebSite + FAQPage JSON-LD (SEO/GEO). Datacenter-founder positioning (Edge Data Solutions OTC: EDGS, First Look Equities 2015, WTC Atlanta).
  - `apply.html` — multi-step application funnel; generates a local `appId` (`DW-<base36>`); writes lead to Firestore.
  - `audit.html` — proposal/report viewer + e-signer (reads token `?t=`).
  - `audit/index.html`, `audit/vnps-roofing.html`, `audit/driftwood.html` — hosted proposal/report pages.
  - `proposal.html` — thin redirect → `/audit.html` (preserves `?t=` token).
  - `booking-widget.html` — Cal.com booking embed (`cal.com/timebroker/15min`).
  - `admin.html` — CRM / proposal engine (noindex, gated by `tbAdminV1`).
  - Supporting: `config.js`, `ai-chatbot.js`, `viral-engine.js`, LinkedIn toolkit pages, `llms.txt`.
- **Config:** `config.js` → `window.TIMEBROKER_CONFIG` (alias `DELRAY_CONFIG`). Holds firebase endpoints, calendar, chatbot persona, contact (WhatsApp `13366521387`), ecosystem links, GA4 `G-K3J6X1536T`, branding (gold `#d4af37`), Vapi voice (enabled). Viral/urgency/exit-popup/fake-counter flags all **DISABLED** (honesty firewall).

## Backend — Firebase Cloud Functions (flagship-hosted, `us-central1`)
- **Lead capture:** client references `submitLeadV2` + `createLeadV1` (config.js). `ai-chatbot.js` writes **directly to Firestore `leads_v2`** via the web SDK (tagged `source:'timebroker-ai-concierge'`, `property:'timebroker.ai'`, `assignedTo:'delray'`), with a `localStorage` `TB_LEADS` fallback. (Backend `tbCaptureLeadV1` mirrors lead writes to `tb_leads` + `leads_v2`.)
- **Concierge:** `omniConciergeV1`.
- **Proposals (read/sign):** `tbGetProposalV1`, `tbSignProposalV1` (audit.html).
- **Proposals (admin):** `tbAdminV1` (auth), `tbGenerateProposalV1`, `tbUploadProposalV1`, `tbEmailProposalV1` (admin.html).

## AI
- `TimeBrokerConcierge` (`ai-chatbot.js`) → `omniConciergeV1` (Vertex/Gemini, RAG-backed).
- **Payload:** `{ utterance, sessionId, route, context:'timebroker-consulting', conversationHistory }`.
- Persona defined in `config.js` chatbot block (CAIO voice, datacenter-founder lead). Zero client-side AI keys — all inference server-side.

## Email
- `tbEmailProposalV1` sends proposals (Resend / SendGrid dual-path). **SendGrid credits outage** previously noted ("Maximum credits exceeded") — verify active provider before relying on sends.

## CRM
- Leads tagged `property:'timebroker.ai'` land in `leads_v2` (+ `tb_leads`), mirrored into the unified `crm_contacts` layer. GA4 `lead_captured` event fires on capture.

## Firebase config (canonical — P0 fragmentation FIXED 2026-07-04)
Identical across `index.html`, `apply.html`, `booking-widget.html`:
- `apiKey: AIzaSyC88VdW3aeKSmupkYl98V54EpuX-9f53Bw`
- `projectId: ac-godmode-titan`
- `messagingSenderId: 1003983943137`
- `appId: 1:1003983943137:web:a281bfa187f99e1283cea0`

## Legacy purge 2026-07-04 (commit c046eda)
- **REMOVED / CONFIRMED GONE** from the tree: `n8n-*.json`, dead dashboards (`admin-backend.html`, `dashboard.html`, `god-mode-console.html`, `launch-dashboard.html`, `one-click-setup.html`), `google-god-mode.gs`, and stale setup docs. All Bitrix24 + n8n runtime wiring purged.
- **Secrets redacted but STILL NEED ROTATION** (existed in git history): Gemini API key, Bitrix24 webhook token, n8n JWTs.

## Build & Deploy
- No build. Static host: `firebase.json` defines two hosting sites (`delray-services` + `timebroker-ai`), both `public: "."`, SPA rewrite `** → /index.html`.
- **Ship:** `firebase deploy --only hosting:timebroker-ai`.
- Legacy `netlify.toml` + `deploy-to-github.ps1` still present (non-Google, unused — deploy path is Firebase).

## Known items / follow-ups
- Config fragmentation: **FIXED** (canonical across pages).
- **`readme.md` still contains stale Bitrix24 setup instructions incl. a live-looking webhook URL/token** (`b24-9o23fs.bitrix24.com/rest/1/…`) — the purge missed it; rotate token + scrub readme.
- Redacted secrets pending rotation (see purge note).
- SendGrid credits outage — confirm email provider health.
- Consider dropping `netlify.toml` (mandate is 100% Google-native).

[TIMEBROKER_METRIC] Manual Time: 90 min | AI Time: 8 min | Time Saved: 91% | Projected ROI: $250
