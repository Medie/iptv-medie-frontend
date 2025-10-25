# Medie IPTV Frontend - Development Roadmap

## Current Status
**Phase 2 (Core Application)** - Authenticated dashboard, category explorer, and account center online; admin analytics + playback tooling in progress.

---

## Development Phases

### ✅ Phase 1 — Foundation & Setup
**Status**: COMPLETED
- [x] Next.js project setup
- [x] TailwindCSS configuration
- [x] Docker configuration
- [x] Environment variables setup

### 🚧 Phase 2 — Core Application
**Status**: CURRENT PHASE
**Goal**: Build the main application with authentication and dashboard

#### Pages
- [x] `/login` - User authentication
- [x] `/dashboard` - Overview of channels and categories
- [x] `/categories/:name` - Filtered channel view
- [x] `/account` - Manage plan, renew subscription
- [x] `/admin` - Manage channels & users (admins only)

#### Features
- [x] JWT login + token persistence
- [x] User session management
- [x] Protected routes
- [x] Unified playlist endpoint integration
- [x] Client-side filtering by group-title
- [x] Enhanced search across channel library
- [x] M3U8 copy functionality (replaced download)
- [x] Responsive TV-style grid layout
- [x] Light/dark theme
- [x] Search functionality
- [x] Region/language filters
- [x] Category organization (Movies, Sports, Kids, News, NSFW)
- [x] Unified card design across all pages
- [x] Navigation from dashboard to category pages

#### Progress (Oct 25, 2025)
- [x] Auth context with JWT storage, protected routing, and login UX refresh
- [x] Unified playlist system with single M3U8 source
- [x] Dashboard filtering by group-title with instant category switching
- [x] Enhanced search across channels, descriptions, and tags
- [x] M3U8 copy functionality for unified playlist (replaced download)
- [x] Category explorer with TV-style grid + region/language controls
- [x] Account screen for plan overview, devices, add-ons, and renewal actions
- [x] Admin table polish with role gating and API fallbacks
- [x] **NEW**: Unified card design across dashboard and category pages
- [x] **NEW**: Navigation from dashboard to dedicated category pages
- [x] **NEW**: Improved mobile layout with consistent button heights
- [x] **NEW**: Toggleable IPTV player recommendations on all devices
- [ ] Remaining: channel playback preview, analytics widgets, admin write actions

### 📋 Phase 3 — Admin Panel
**Status**: PLANNED
**Goal**: Administrative tools for content and user management

#### Features
- [ ] User management interface
- [ ] Playlist management
- [ ] Content moderation tools
- [ ] Analytics dashboard

### 📋 Phase 4 — Multilingual & Regional
**Status**: PLANNED
**Goal**: Multi-language support for global audience

#### Features
- [ ] Auto-detect browser language
- [ ] Translate UI dynamically (i18n)
- [ ] Region filters (Africa, Asia, Europe, Americas)
- [ ] Channel sorting by reliability or popularity
- [ ] AI-tagged content display

### 📋 Phase 5 — Subscription & Payments
**Status**: PLANNED
**Goal**: Integrate payments and plan management

#### Features
- [ ] Display user's current plan, renewal date
- [ ] Payment confirmation page
- [ ] Access control for premium content
- [ ] Plan management interface

### 📋 Phase 6 — Discovery & AI
**Status**: PLANNED
**Goal**: Integrate "Smart Hub" recommendations

#### Features
- [ ] Curated feed from medie-workers
- [ ] AI-driven highlights ("Trending now", "New regional channels")
- [ ] Preview and play streams within browser

### 📋 Phase 7 — Production
**Status**: PLANNED
**Goal**: Production deployment and monitoring

#### Features
- [ ] CI/CD pipeline
- [ ] Error monitoring
- [ ] Security hardening
- [ ] Performance optimization

---

## Next Steps
- [ ] Connect admin actions (user/channel management) to write APIs and audits.
- [ ] Add inline stream preview/player for channels (HLS + poster art).
- [ ] Expand analytics (viewing trends, error budgets) on dashboard/account.

---

*Last Updated: October 25, 2025*
