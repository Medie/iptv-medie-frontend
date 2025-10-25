# 💻 Medie Frontend — IPTV + AI Dashboard

**Repository:** `Iptv/medie-frontend`  
**Purpose:** Next.js-based dashboard for users and admins to browse, filter, and manage AI-tagged IPTV and media content.

---

## 🎯 Vision

Deliver a secure, private IPTV distribution platform that supports rich playlist management, multilingual and regional personalization, AI-assisted content tagging, and streamlined deployment on Coolify/Hetzner.

---

## 🏗️ Architecture at a Glance

- **Backend**: Node.js (Express) with PostgreSQL persistence
- **Ingestion**: IPTV playlist fetchers and validation workers
- **AI Services**: Classification/tagging and voice/video synthesis (future phases)
- **Frontend**: Authenticated dashboards and admin consoles
- **Deployment**: Dockerized workloads orchestrated by Coolify, HTTPS by default

---

## ⚙️ Tech Stack
- Next.js (React)
- TailwindCSS
- SWR (React Query alternative)
- Axios (API communication)
- Coolify deployment ready

---

## 🧩 Features
- User login / session management
- Dashboard with search + region/language filters
- AI-tagged content view
- Playlist integration (Movies, Sports, Kids, News, NSFW, etc.)
- Multilingual & regional content filtering

---

## 🧱 Folder Structure

```
/frontend
  /components
  /pages
  /lib
  /styles
  Dockerfile
  .env.example
```

---

## 🔑 Environment Variables

```
NEXT_PUBLIC_API_URL=https://api.medie.vip
```

---

## 🚀 Development

```bash
git clone git@github.com:Iptv/medie-frontend.git
cd medie-frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend will run at `http://localhost:3001`.

---

## 🧠 Deployment (Coolify)

| Service   | URL                     | Notes                |
|-----------|-------------------------|----------------------|
| Frontend  | https://medie.vip       | Public UI            |
| API       | https://api.medie.vip   | Connects to backend  |

---

## 📊 Development Status

**Current Phase**: Phase 2 (Core Application) - Authenticated dashboard, category explorer, and account center online; admin analytics + playback tooling in progress.

### Completed Features
- JWT login + token persistence
- User session management
- Protected routes
- Fetch channels via backend API
- Responsive TV-style grid layout
- Light/dark theme
- Search functionality
- Region/language filters
- Category organization (Movies, Sports, Kids, News, NSFW)

### Upcoming Features
- Channel playback preview
- Analytics widgets
- Admin write actions
- User management interface
- Playlist management
- Content moderation tools
- Analytics dashboard
- Multi-language support (i18n)
- Region filters (Africa, Asia, Europe, Americas)
- AI-driven recommendations
- Payment integration
- Production deployment and monitoring

---

## 🔐 Authentication Without Database

The application supports login without a database connection through mock authentication:

**Demo Accounts**:
- Username: `demo@medie.vip` (Admin - Global Access)
- Username: `sport@medie.vip` (Sports - UK/India/SA/Japan)
- Username: `kids@medie.vip` (Kids - Spain/Mexico/Kenya/China)
- Username: `africa@medie.vip` (Africa - Nigeria/SA/Kenya/Egypt/Senegal)
- Username: `asia@medie.vip` (Asia - India/China/Japan/Singapore)

**Password**: `demo` (for all accounts)

When the API is unavailable, the application falls back to mock authentication, allowing users to log in and explore the interface with pre-defined demo data. Each account has access to different regions, languages, and content categories to showcase the platform's multilingual and regional capabilities.

---

## 🧑‍💻 Contributors

- Medie Team — UI / UX Design & Frontend Development
- AI Workers — Provide metadata and media tagging
