# FORBIDDEN & LEGACY STACK — Always Remove on Sight

> **Standing rule — LOCKED 2026-07-04 by founder (Delray Wannemacher).**
> This ecosystem is **100% Google-native**. The tools below are FORBIDDEN and must be
> **removed wherever found** — in this repo and in *any* legacy project being revived.

## Banned — remove code, config, secrets, AND data
- **Bitrix24** — any `b24-*.bitrix24.com` webhook, `crm.lead.add`, REST inbound tokens.
- **n8n** — workflow JSON exports, webhook URLs, MCP JWTs.
- **Lovable.ai** — `ai.gateway.lovable.dev`, `LOVABLE_API_KEY`, and `/lovable-uploads/` asset paths (migrate the assets out, then delete the folder).
- **HubSpot** — portal IDs, Forms API, tracking snippets.
- **Supabase** — `@supabase/supabase-js`, edge functions, `VITE_SUPABASE_*`.
- **Zapier / Make / any third-party iPaaS.**

## Replace with — Google-native only
- **Firebase**: Firestore, Gen-2 Cloud Functions, Hosting — project `ac-godmode-titan`.
- **Vertex AI / Gemini** for all AI.
- **Sovereign CRM**: leads write to a public-create Firestore collection that is mirrored into `crm_contacts` (e.g. `leads_v2`, `garmn_contact_submissions`, `fle_leads`). Never POST leads to an external CRM.
- **AI chat**: `omniConciergeV1` callable — send `site: window.location.hostname` so the backend resolves the correct domain persona.

## When reviving a legacy project (do this FIRST)
```
grep -riE "bitrix|n8n|hubspot|lovable|supabase|zapier|make" src
```
Remove/rewire every hit before shipping. **A lead form or AI chat pointing at any banned system is a P0** — it silently sends business data outside the sovereign stack.

## Exception
Client audit / proposal deliverables MAY *name* these tools as description or a migration recommendation — that is **content**, not an integration, and stays.

Reference: `[[sovereign-crm-unified-2026-07-04]]` · purge executed 2026-07-04 across garmn2 (live Bitrix footer webhook), delray-services (n8n JSONs + dead dashboards), flagship (dead `src/js`).
