# Nyasha Samhembere

**Product engineer — full-stack, product design, technical co-founder.** Johannesburg, South Africa · open to remote and relocation.

Twelve years shipping digital products: the first decade as a product designer and web developer for Toyota, FCB Health New York, Old Mutual and MultiChoice; the last two building and running production systems end to end. I design the flow, build the backend, ship the app and own it in production.

Most of my work is commercial and lives in private repos, so this profile is a map of what I've built rather than a code dump. Happy to walk through any of it, or share code under NDA.

📧 nyashasa@gmail.com · 📱 +27 81 461 6530 · 💼 [linkedin.com/in/nyashasa](https://linkedin.com/in/nyashasa)

---

## What I'm building

### Noeva — fleet compliance SaaS · [fleet.noeva.co.za](https://fleet.noeva.co.za)
*Founder & Technical Architect · 2024 – present · 2,000+ vehicles and devices under management*

A custom router-management system built solo to replace per-device commercial licensing, then extended into full vehicle telematics.

- **Device control plane** — outbound MQTT telemetry, JSON-RPC/UCI control, OTA firmware rollout across 2,000+ devices.
- **Telematics ingestion** — Codec 8/8E TCP listener with a Codec 12 command channel, unifying router and tracker streams into one alert engine.
- **Time-series storage** — TimescaleDB over PostgreSQL, sized for continuous ingest from a fleet that is always moving and frequently offline.
- **Product surface** — telematics, drivers & vehicles, a compliance vault with automated PrDP/NLTAA/roadworthy expiry tracking, workflow automation and reporting.

`TypeScript` `Node.js` `PostgreSQL` `TimescaleDB` `MQTT` `React`

---

### UbuntuNet — passenger WiFi and advertising network · [ubuntunet.africa](https://ubuntunet.africa)
*Co-founder & CTO · 2024 – present*

An advertising and audience-reporting network across transit, retail, hospitality and events. Live with **Golden Arrow Bus Services**, a ~1,300-bus Cape Town operator: 3 routes serving 12,000 passengers, rolling out to 100. Designed and built the full platform solo across three products:

- **UbuntuConnect** — captive portal with WhatsApp-number sign-in and consent-first data capture.
- **UbuntuAds** — a self-serve ads manager for agencies to plan and book transit, retail, hospitality and event inventory, with route-targeted delivery and audience reporting.
- **UbuntuInsights** — real-time operator and sponsor analytics.

Two things I'd call out:

- **Privacy by design under POPIA** — a consent ledger, dual-consent WhatsApp CRM, passenger-network isolation and encrypted device management, built in from the schema up rather than bolted on.
- **Double-entry revenue share** — operator splits computed on real profit, multi-party and auditable, so partners' auditors can verify them independently.

`TypeScript` `Node.js` `React` `PostgreSQL` `TimescaleDB` `MQTT`

---

### Fooba — retail payments wallet [fooba.co.za](https://fooba.co,za)
*CTO (part-time) · 2024 – present*

Ledger and money-movement architecture for a South African retail wallet. Pilot live with Big Save, targeting university students in Pretoria; SASSA and NSFAS disbursement integrations in progress.

- **Double-entry ledger** with a zero-sum invariant enforced on every transaction, and an automated database-to-general-ledger reconciliation bridge into Sage — audit-grade traceability at transaction level.
- **Multi-party fee engine** — platform, gateway and merchant commission, settled to retailers via Paystack Split Payments so the platform never holds merchant funds.
- **Bank rails** — defined the Capitec integration (Connect login, DebiCheck, inherited FICA/KYC) and led PASA audit-readiness.

`TypeScript` `Node.js` `PostgreSQL` `Paystack` `Sage`

---

### Easy Chef — in-home chef marketplace · [easychef.co.za](https://easychef.co.za)
*Co-founder & CTO · 2024 – present*

Currently in launch phase. Built through MVP: customer and cook mobile apps, verification workflows, a booking engine and automated payouts. Defined pricing tiers and unit economics.

`React Native` `TypeScript` `Node.js` `PostgreSQL`

---

## How I work

I ship with AI coding agents daily — Claude Code and Cursor. Generation at speed, with every component and migration reviewed against the design system, accessibility rules and the data model before it merges.

## Stack

**Languages** TypeScript · JavaScript · Python · Java · Dart
**Backend & data** Node.js · REST · event-driven / pub-sub · PostgreSQL · TimescaleDB · schema design · reconciliation pipelines
**Frontend & mobile** React · React Native · Angular · design systems · accessible UI (WCAG)
**IoT & telemetry** MQTT · OTA firmware · JSON-RPC / UCI · Codec 8 / 8E / 12 · real-time ingestion · device-fleet management at 2,000+ scale
**Fintech** Double-entry ledgers · multi-party splits · payment gateways and bank rails · GL reconciliation · audit controls
**Cloud & DevOps** AWS · GCP · Azure · Docker · Linux · Vercel · Supabase
**Product** Service design · usability research · prototyping · design-to-dev handoff

## Before this

Senior Product Designer at Toyota South Africa (KINTO), FCB Health New York, MultiChoice Africa Accelerator, Old Mutual, Afreximbank and Hellocomputer — ten years of UX and front-end work that is why I design the product before I build it.
