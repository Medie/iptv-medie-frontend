# 💻 Medie Frontend — IPTV + AI Dashboard

**Repository:** `Iptv/medie-frontend`  
**Purpose:** Next.js-based dashboard for users and admins to browse, filter, and manage AI-tagged IPTV and media content.

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

## 📄 Documentation

Refer to:

- `docs/00_Project_Overview.md`
- `docs/Phase-3_Dashboard.md`

---

## 🧑‍💻 Contributors

- Medie Team — UI / UX Design & Frontend Development
- AI Workers — Provide metadata and media tagging
