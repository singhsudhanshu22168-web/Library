# StudySpace Club — Private Study Space Management Platform

StudySpace Club is a private study space management platform engineered for modern quiet study libraries and focus sanctuaries. It combines real-time spatial desk availability, automated seat reservation, dynamic cryptographic QR access control, automated waitlists, Exotel voice reminder integration, and seamless Razorpay membership workflows.

---

## 🌟 Key Features

- **Spatial Desk Availability**: Interactive visual floor map showing real-time desk occupancy, zone types, and availability status.
- **Dynamic Cryptographic QR Check-in**: 30-second TTL dynamic QR tokens with anti-replay nonce validation for reception kiosk scanners.
- **StudyFlow Engine**: Automated 15-minute grace period enforcement liberating unattended desks for waitlisted members.
- **Exotel Telephony Adapter**: Voice call dispatch engine for upcoming booking & renewal reminders with quiet-hours safety rules.
- **Razorpay Payments**: Integrated membership plan subscriptions (Day Pass, Weekly Flex, Monthly Pro, Monthly Reserved).
- **Multi-Portal Architecture**: Dedicated interfaces for Members/Students, Space Administrators, and Reception Staff Kiosk.
- **Atmospheric Visual Design**: Premium architectural background treatment, subtle warm lighting, and restrained typography.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Lucide Icons, CSS Custom Properties Design Tokens
- **Database & Backend**: Supabase PostgreSQL, RLS Policies, Database Triggers & Functions
- **Integrations**: Razorpay Payment Gateway, Exotel Voice API, Dynamic QR Engine
- **Language**: JavaScript (ES Next), TypeScript (Type definitions for services)

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/singhsudhanshu22168-web/Library.git
cd Library
npm install
```

### 3. Environment Setup
Copy the environment template and configure your credentials:
```bash
cp .env.example .env
```

Refer to `.env.example` for required configuration variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
Library/
├── src/
│   ├── assets/          # Atmospheric visual background assets
│   ├── components/      # PublicHomepage, StudentPortal, AdminPortal, StaffPortal, Navbar
│   ├── data/            # Mock spatial seat maps & user state
│   ├── lib/
│   │   ├── services/    # bookingEngine, qrSecurityService, studyFlowGuardian, paymentService, voiceCallService
│   │   └── types/       # TypeScript interface schemas
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   ├── migrations/      # 01_schema.sql, 02_rls.sql
│   └── seed.sql         # Seed data for study desks & plans
├── .env.example         # Environment template
├── .gitignore           # Excluded files list
└── package.json
```

---

## 📄 License

© 2026 StudySpace Club. All rights reserved.

