# PRODUCTION OPERATIONS & DEPLOYMENT RUNBOOK — StudySpace Club

**Platform Name:** StudySpace Club  
**Target Architecture:** Vercel (Frontend & Serverless) + Supabase (PostgreSQL & Auth)  
**Last Updated:** 2026-09-18  

---

## 1. Deployment Process

### A. Prerequisites
1. Installed Node.js (v18+) and npm.
2. Access to Vercel production project.
3. Access to Supabase production project.

### B. Command Sequence
```bash
# 1. Clone repository & install dependencies
git clone <repository-url>
cd studyspace-club
npm ci

# 2. Run quality checks
npm run lint
npm run build

# 3. Deploy to Vercel Production
npx vercel --prod
```

---

## 2. Environment Variables Configuration

Set these variables in the Vercel Project Settings (*Settings -> Environment Variables*).

### A. Client-Side Variables (Exposed to Browser)
- `VITE_SUPABASE_URL`: Production Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: Production Supabase anonymous API key.
- `VITE_RAZORPAY_KEY_ID`: Production Razorpay Key ID (begins with `rzp_live_`).
- `VITE_APP_URL`: Production application URL (`https://studyspace.club`).

### B. Server-Only Secrets (NEVER expose to browser)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase administrative key for backend bypass.
- `RAZORPAY_KEY_SECRET`: Production Razorpay API Secret key.
- `RAZORPAY_WEBHOOK_SECRET`: Webhook secret key generated in Razorpay Dashboard.
- `WHATSAPP_API_KEY`: Meta Cloud API / WhatsApp Gateway secret key.
- `TELEPHONY_API_TOKEN`: Exotel / Telephony API authentication token.

---

## 3. Database Migration Process

Migrations are managed via SQL files in `supabase/migrations/`.

### Migration Order:
1. `supabase/migrations/01_schema.sql` (Creates custom types, tables, functions, indexes, triggers).
2. `supabase/migrations/02_rls.sql` (Applies Row-Level Security policies to all tables).
3. `supabase/seed.sql` (Initial branch, zone, seat layout, and operational plan configuration).

### Migration Execution:
Execute via Supabase CLI or Supabase Web Console (*SQL Editor*):
```bash
# Using Supabase CLI
supabase db push --linked
```

> [!CAUTION]
> **Database Safety Rule:** Never run `DROP TABLE` or `TRUNCATE` operations on production database without explicit administrative authorization and a verified snapshot backup.

---

## 4. Webhook Configuration

### A. Razorpay Payment Webhook
- **Webhook Endpoint URL:** `https://studyspace.club/api/webhooks/razorpay`
- **Active Events:**
  - `payment.captured`
  - `payment.failed`
  - `order.paid`
- **Security Validation:** HMAC-SHA256 signature calculated against request body using `RAZORPAY_WEBHOOK_SECRET`. Unsigned or failed signature requests MUST return `401 Unauthorized`.

---

## 5. Monitoring & Logging Strategy

- **Application Logs:** Available via Vercel Runtime Logs console.
- **Database Logs & Performance:** Available via Supabase Dashboard (*Reports -> API & Logs*).
- **Authentication Audit:** Tracked in `auth.audit_log_entries` in Supabase.
- **Payment Exceptions:** Logged in `payment_logs` table with transaction reference IDs.

---

## 6. Common Failures & Troubleshooting

| Symptom | Probable Cause | Resolution |
|---|---|---|
| **Auth Sign-in Fails** | Supabase Site URL mismatch | Add production domain to Supabase Auth *Redirect URLs*. |
| **Seat Booking Conflict** | Concurrent booking lock | Ensure `select_seat_with_lock` SQL function is invoked. |
| **Payment Verification Fails** | Webhook secret mismatch | Verify `RAZORPAY_WEBHOOK_SECRET` matches Razorpay Dashboard. |
| **QR Code Denied at Kiosk** | Expired/Used token | Regenerate pass in Student Portal or check active booking window. |

---

## 7. Rollback Procedure

If a critical fault occurs post-deployment:

1. **Vercel Instant Rollback:**
   - Go to Vercel Dashboard -> *Deployments*.
   - Locate the previous successful deployment.
   - Click `...` -> **Promote to Production**.

2. **Database State Rollback:**
   - Access Supabase Dashboard -> *Database* -> *Backups*.
   - Select point-in-time snapshot prior to bad migration.
   - Initiate database restore.
