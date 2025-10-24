# Medie IPTV Platform – Project Overview

## Vision

Deliver a secure, private IPTV distribution platform that supports rich playlist management, multilingual and regional personalization, AI-assisted content tagging, and streamlined deployment on Coolify/Hetzner.

## Architecture at a Glance

- **Backend**: Node.js (Express) with PostgreSQL persistence
- **Ingestion**: IPTV playlist fetchers and validation workers
- **AI Services**: Classification/tagging and voice/video synthesis (future phases)
- **Frontend**: Authenticated dashboards and admin consoles
- **Deployment**: Dockerized workloads orchestrated by Coolify, HTTPS by default

## Phase Roadmap

1. **Phase 1 – Backend**: foundational Express API, playlist ingestion, and DB schema
2. **Phase 2 – AI Tagger**: classify streams by language/category/region automatically
3. **Phase 3 – Dashboard**: authenticated UI for viewers and admins
4. **Phase 4 – AI Synthesizer**: generate highlight clips and voiceovers
5. **Phase 5 – Multilingual & Regional**: granular geo/language access control
6. **Phase 6 – Subscriptions**: billing tiers, entitlements, and renewals
7. **Phase 7 – Discovery Worker**: auto-discover new channels and surface metadata
8. **Deployment Guide**: end-to-end instructions for Coolify/Hetzner and observability

Each phase has its own markdown file in `/docs` describing objectives, tech stack, workflows, and deliverables.
