# CLIENT HANDOVER DOCUMENT — StudySpace Club

**Platform Name:** StudySpace Club (Private Study Space Management Platform)  
**Client Project:** Private Study Space Management Solution  
**Handover Date:** 2026-09-18  

---

## 1. Project Overview

StudySpace Club is an end-to-end, high-performance web platform for managing private study spaces, library memberships, seat reservations, QR check-ins, and administrative operations.

### Key Capabilities:
- **Public Website & Membership Portal:** Live seat occupancy counter, branch amenities, plan comparison, and student onboarding.
- **Interactive Seat Map Engine:** Real-time seat availability map with visual status filters (Silent Zone, Executive Desk, Power Socket, High-Speed Wi-Fi).
- **Student Portal:** Interactive booking management, dynamic QR code generation for check-in/out, membership tracking, and notification history.
- **Admin Command Center:** Real-time live floor plan monitor, member database, shift management, booking audit logs, manual check-in overrides, payment ledger, and system settings.
- **Staff Kiosk Portal:** Dedicated high-contrast QR scanner interface for front-desk attendants to validate entry/exit passes instantly.

---

## 2. Production URLs & Routing Architecture

- **Main Website & Student Portal:** `https://studyspace.club`
- **Admin Command Portal:** Accessible via user account with `admin` role after sign-in.
- **Staff Kiosk Portal:** Accessible via user account with `staff` role after sign-in.

---

## 3. User Flows & Operational Guidelines

### A. Student Onboarding & Membership Flow
1. Student registers/logs in via phone number or email authentication.
2. Selects desired membership tier (e.g. *Standard 12hr*, *Pro 24hr*, *Weekend Special*).
3. Selects preferred branch (e.g. *Central Library*, *North Campus Branch*).
4. Completes checkout via payment gateway.
5. Plan becomes active immediately with automated expiry tracking.

### B. Seat Booking Flow
1. Student navigates to the **Seat Booking** section.
2. Selects date, shift (Morning / Evening / Full Day), and zone filters.
3. Interactive visual map highlights available seats in real-time.
4. Student selects seat (e.g., `Desk A-04`) and confirms reservation.
5. System enforces double-booking lock and stores reservation with unique QR token.

### C. QR Attendance Flow
1. Student opens their **Digital Access Pass** on the mobile/desktop portal.
2. A secure, auto-refreshing QR token (`STUDYSPACE-TOKEN-*`) is displayed.
3. Staff scans the QR code at the library entrance using the Staff Kiosk interface.
4. System validates membership status, active booking window, and seat assignment.
5. Access is GRANTED/DENIED immediately with clear audio-visual feedback on kiosk.

### D. Automated Nudge & StudyFlow Rules
- **Shift Transition Reminder:** Automated WhatsApp/SMS nudge sent 15 minutes before shift end.
- **Overstay Alert:** If student remains checked in 30 minutes past shift, staff interface highlights desk as "Overstay".
- **Quiet Hours Guard:** System suppresses automated voice/telephony alerts between 22:00 and 07:00.

---

## 4. Maintenance & Operations

### A. Environment & Provider Ownership
The client holds primary owner credentials for the following services:
1. **Supabase Cloud Project:** Hosting database, Auth, RLS rules, and storage buckets.
2. **Vercel Web Hosting:** Continuous integration, domain routing, and SSL certificates.
3. **Razorpay Account:** Payment gateway processing and payout webhooks.
4. **WhatsApp Meta Business API:** Message templates and sender verification.
5. **Exotel Telephony Portal:** Telephony trunk line for automated phone alerts.

### B. Database Backups & Recovery
- **Daily Backups:** Supabase automatically creates full database snapshots daily.
- **Retention:** 7-day automated point-in-time recovery (PITR) retention window on production tier.
- **Manual Backups:** Can be initiated from the Supabase Dashboard under *Database -> Backups*.

---

## 5. Known Limitations & Blocked External Providers

| Component | Status | Operational Notes |
|---|---|---|
| **Razorpay Payments** | `BLOCKED — CREDENTIAL REQUIRED` | Platform is ready for live keys. Add `VITE_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Vercel settings. |
| **WhatsApp Notifications** | `BLOCKED — CREDENTIAL REQUIRED` | Requires Meta Cloud API credentials and approved message templates. |
| **Exotel Telephony Voice** | `BLOCKED — CREDENTIAL REQUIRED` | Requires Exotel virtual number and Account SID configuration. |

---

## 6. Support & Contact

For technical escalations, infrastructure updates, or provider credential onboarding:
- **Lead Developer Email:** `admin@studyspace.club`
- **Documentation Repo:** `c:\Users\singh\OneDrive\Desktop\Library`
