# PRODUCT REQUIREMENTS DOCUMENT (PRD) & SYSTEM SPECIFICATION
## PRIVATE STUDY LIBRARY / STUDY SPACE OPERATING SYSTEM (StudySpace OS)

**Document Version:** 1.0.0  
**Status:** FINAL APPROVED SPECIFICATION  
**Target Release:** Production MVP v1.0  
**Last Updated:** September 18, 2026  

---

## 1. PRODUCT VISION & PROBLEM STATEMENT

### 1.1 Product Vision
**StudySpace OS** is a complete, enterprise-grade digital operating system designed specifically for private study libraries, reading rooms, and quiet study spaces. 

Unlike traditional public libraries or modern coworking spaces, private study libraries cater primarily to competitive exam aspirants (medical, engineering, civil services, law, finance) and remote scholars who require dedicated, distraction-free study desks for 6 to 16 hours daily.

StudySpace OS unifies member management, real-time seat booking, QR-based check-in/check-out, attendance duration tracking, automated membership renewals, payment collection, multi-channel communication (WhatsApp/SMS/Email), automated AI/IVR voice calling reminders, and live floor-map operational intelligence into a single cohesive platform.

### 1.2 Connected Value Engine Workflow
```
  [ Student Signup / Onboarding ]
                │
                ▼
  [ Membership Plan Selection & Payment ]
                │
                ▼
  [ Visual Seat Map & Slot Booking ]
                │
                ▼
  [ Encrypted Dynamic QR Code Generation ]
                │
                ▼
  [ Kiosk / Mobile QR Check-In ]
                │
                ▼
  [ Study Session Active (StudyFlow Engine Monitoring) ]
                │
                ▼
  [ Check-Out & Duration Logging ]
                │
                ▼
  [ Automated Expiry Tracking & Multi-Channel Renewal Reminders ]
                │
                ▼
  [ Automated Voice Call Escalation for Pending Renewals ]
                │
                ▼
  [ Admin Live Floor Control & Operational Analytics ]
```

### 1.3 Core Business Problems Solved
1. **Seat Hoarding & Phantom Bookings:** Students reservation of seats without physical attendance.
2. **Uncollected Revenue & Manual Renewal Hassles:** Inefficient manual phone calls and tracking of expired memberships on spreadsheets.
3. **No-Show Waste During Peak Seasons:** High demand for seats while booked seats remain vacant due to absent members.
4. **Fraudulent Attendance:** Sharing static screenshots of QR codes or manual signing for absent peers.
5. **Lack of Operational Visibility:** Zero real-time insight into seat utilization, peak hours, or zone popularity for space owners.

---

## 2. PRIMARY USER ROLES & AUTHORIZATION MATRIX

### 2.1 User Roles Defined
1. **Student / Member (`STUDENT`):** Registered individual who holds or purchases a membership plan, books study seats, checks in/out via QR, and manages personal billing/notifications.
2. **Staff / Receptionist (`STAFF`):** Front-desk operational personnel responsible for verifying physical check-ins, overriding attendance on technical glitches, resolving student queries, and monitoring real-time floor status.
3. **Admin / Owner (`ADMIN`):** Facility owner or general manager with complete unrestricted administrative control over system settings, pricing, seat configuration, staff permissions, payment reconciliations, communications, automated calling, and analytics.

### 2.2 Role-Based Access Control (RBAC) Matrix

| Domain / Resource | Feature / Action | Student | Staff | Admin |
| :--- | :--- | :---: | :---: | :---: |
| **Authentication** | Register / Login / Password Reset | ✅ | ✅ | ✅ |
| | Manage Own Profile & KYC | ✅ | ✅ | ✅ |
| **Memberships** | View Active/Past Membership | ✅ | ✅ | ✅ |
| | View Available Plans | ✅ | ✅ | ✅ |
| | Purchase / Renew Plan Online | ✅ | ❌ | ❌ |
| | Assign / Modify Member Plan Manually | ❌ | ❌ | ✅ |
| | Freeze / Suspend Membership | ❌ | ❌ | ✅ |
| | Create / Edit / Delete Plan Templates | ❌ | ❌ | ✅ |
| **Seat Booking** | View Live Public Seat Map | ✅ | ✅ | ✅ |
| | Create Seat Booking | ✅ (If Active Member) | ✅ (On Member Behalf) | ✅ |
| | Cancel Own Booking | ✅ (Subject to Rules) | ✅ | ✅ |
| | Reschedule Own Booking | ✅ (Subject to Rules) | ✅ | ✅ |
| | Admin Override / Force Booking | ❌ | ❌ | ✅ |
| | Lock / Block Seat for Maintenance | ❌ | ✅ | ✅ |
| **Attendance & QR** | Generate Check-In QR | ✅ (Active Booking) | ❌ | ❌ |
| | Scan Student QR Code (Check-in/out) | ❌ | ✅ | ✅ |
| | Manual Attendance Override (With Reason) | ❌ | ✅ | ✅ |
| | View Attendance Audit Logs | ❌ | ❌ | ✅ |
| **Payments** | View Personal Invoices & History | ✅ | ❌ | ✅ |
| | Process Gateway Online Payment | ✅ | ❌ | ❌ |
| | Record Offline Cash / POS Payment | ❌ | ✅ | ✅ |
| | Process Refund | ❌ | ❌ | ✅ |
| **Automations & Calls**| Receive Notifications | ✅ | ❌ | ❌ |
| | Configure Notification Templates | ❌ | ❌ | ✅ |
| | View Message Delivery Logs | ❌ | ❌ | ✅ |
| | Configure Automated Voice Call Rules | ❌ | ❌ | ✅ |
| | Trigger Manual Voice Reminder Call | ❌ | ✅ | ✅ |
| **Floor & System** | Live Floor Operator Map | ❌ | ✅ | ✅ |
| | Staff User Management | ❌ | ❌ | ✅ |
| | System Settings & Business Hours | ❌ | ❌ | ✅ |
| | Full Audit Logs Export | ❌ | ❌ | ✅ |

---

## 3. STUDENT FEATURES & FUNCTIONAL REQUIREMENTS

### 3.1 Account Management & Onboarding
- **Registration & Verification:** Mobile number verification via 6-digit SMS/WhatsApp OTP + Email verification.
- **Profile & KYC:** Full Name, Avatar photo, Emergency Contact, Academic Exam Focus (e.g., UPSC, NEET, CA), Government ID upload for security compliance.
- **Notification Preferences:** Toggle options for WhatsApp, SMS, Email, and Automated Voice Call reminders.

### 3.2 Membership Management
- **Dashboard Overview:** Displays active plan status, days remaining until expiration, active booking stats, total study hours logged, and current streak.
- **Plan Store & Renewal:** View available membership tiers (Daily, Weekly, Monthly, Quarterly), plan inclusions (Zone access, daily slot allowance), and 1-click renewal button.
- **Payment History:** Downloadable PDF invoices with GST details, transaction status badge, and gateway reference IDs.

### 3.3 Interactive Seat Booking Engine
- **Visual Zone & Seat Picker:** High-resolution interactive floor plan filtering by zone (e.g., Silent Zone, Charging Desk, Ergonomic Chair Zone).
- **Date & Slot Selection:** Select date up to allowed advance window (e.g., 7 days) and time slot (e.g., Morning 06:00-12:00, Afternoon 12:00-18:00, Evening 18:00-24:00, Full Day 06:00-24:00).
- **Booking Rules Validation:** Immediate client pre-validation + strict server-side validation against active membership eligibility.
- **Booking Management:** List of `UPCOMING`, `ACTIVE`, `COMPLETED`, and `CANCELLED` bookings with option to cancel or reschedule (up to 2 hours prior to slot start).

### 3.4 Dynamic Check-In / Check-Out QR Code
- **Dynamic Security Generation:** Displays a time-bounded dynamic QR code for active bookings.
- **Auto-Refresh Mechanism:** QR token refreshes every 30 seconds to prevent screenshot sharing.
- **Live Status Feedback:** Screen updates automatically when scan is validated by front desk kiosk (`CHECKED_IN` / `CHECKED_OUT`).

---

## 4. SEAT BOOKING SYSTEM LOGIC & CONCURRENCY CONSTRAINTS

### 4.1 Strict Source-of-Truth Architecture
> [!CRITICAL]
> **Database & Backend Concurrency Rule:** The frontend UI is purely a presentation view and MUST NEVER be trusted for seat availability. All seat reservations are subject to strict backend transaction isolated locks.

### 4.2 Race-Condition & Double-Booking Prevention Logic
1. When a user requests a booking for `Seat_ID`, `Booking_Date`, and `Time_Slot_ID`:
2. Backend initiates a database transaction with `SERIALIZABLE` isolation or Redis Distributed Lock (`Redlock`) on key `lock:seat:{seat_id}:{date}:{slot_id}` with a 5-second TTL.
3. Backend checks if any active booking exists in database matching:
   `SELECT id FROM bookings WHERE seat_id = $1 AND booking_date = $2 AND time_slot_id = $3 AND status IN ('CONFIRMED', 'CHECKED_IN') FOR UPDATE;`
4. If a record exists:
   - Transaction aborts.
   - Lock released.
   - Returns HTTP 409 Conflict with payload: `{ "success": false, "code": "SEAT_ALREADY_BOOKED", "message": "This seat was just reserved by another student. Please select an available seat." }`
5. If no record exists:
   - Inserts booking record with status `CONFIRMED`.
   - Releases lock.
   - Returns HTTP 201 Created with booking QR payload.

### 4.3 Booking Business Rules & Limits
- **Advance Booking Window:** Maximum 7 rolling calendar days in advance for active members.
- **Daily Booking Limit:** Maximum 1 booking per member per date (unless custom plan permits multiple slots).
- **Cancellation Deadline:** Cancellation allowed up to **120 minutes** prior to slot start time without penalty. Late cancellation releases seat but increments penalty counter.
- **Grace Period:** Default **15 minutes** post slot start time. If check-in does not occur within grace period, StudyFlow Engine flags booking as `NO_SHOW`.
- **No-Show Penalty Rule:** 3 consecutive `NO_SHOW` events within 30 days automatically restricts advance booking window to 24 hours for the next 14 days.

---

## 5. VISUAL SEAT MAP & LIVE FLOOR MANAGEMENT

### 5.1 Seat Map Visual System
- **Student View States:**
  - `AVAILABLE` (Green outline / Subtle glowing hover)
  - `OCCUPIED` (Muted red / Solid fill)
  - `SELECTED` (Vibrant purple accent / Glowing border)
  - `UNAVAILABLE_FOR_PLAN` (Greyed out / Hash pattern)
  - `MAINTENANCE_BLOCKED` (Lock icon / Disabled state)
- **Zone Filters:** Direct tab/filter controls for "Silent Focus Zone", "Discussion Pods", "Window Side", "Ergonomic Desk", "Single Cubicle".

### 5.2 Admin Live Floor Map Operational Grid
- **Real-Time WebSockets Sync:** Updates floor map within 500ms of any scan, cancellation, or admin override.
- **Interactive Seat Inspector Popover:**
  - Clicking any occupied seat displays: Member Name, Avatar, Phone Number, Membership Tier, Check-In Time, Elapsed Study Duration, Scheduled Check-Out Time.
  - Action buttons: `FORCE_CHECK_OUT`, `REASSIGN_SEAT`, `BLOCK_SEAT`, `SEND_ALERT_MESSAGE`.

---

## 6. MEMBERSHIP SYSTEM & LIFECYCLE MANAGEMENT

### 6.1 Membership Plan Matrix

| Plan Name | Duration | Booking Allowed | Zone Access | Advance Window | Grace Period | Reschedule Limit |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **Day Pass** | 1 Calendar Day | 1 Slot | Standard Zones | 24 Hours | 15 Mins | 0 Times |
| **Weekly Flex** | 7 Days | 1 Slot / Day | Standard + Silent | 3 Days | 15 Mins | 1 Time / Week |
| **Monthly Pro** | 30 Days | 1 Slot / Day | All Zones | 7 Days | 20 Mins | 3 Times / Month |
| **Monthly Reserved** | 30 Days | Dedicated Fixed Seat | Dedicated Desk | Permanent Lock | 60 Mins | N/A |
| **Quarterly Scholar**| 90 Days | 1 Slot / Day + Priority | All Zones | 14 Days | 30 Mins | Unlimited |

### 6.2 Membership Lifecycle State Machine
```
  [ PENDING_PAYMENT ] ──(Payment Success)──► [ ACTIVE ] ──(Expiry - 7 Days)──► [ EXPIRING_SOON ]
           │                                     │                                  │
    (Payment Fail/Timeout)                       │                             (Expiry Date Passed)
           │                                     │                                  │
           ▼                                     ▼                                  ▼
      [ CANCELLED ]                     [ SUSPENDED_BY_ADMIN ]                [ EXPIRED ]
```

### 6.3 Expiry Rules & Future Booking Policy
- **Setting `AUTO_CANCEL_FUTURE_BOOKINGS` = `TRUE`:**
  - If a member has scheduled bookings on dates beyond their membership `end_date` and fails to complete renewal by `end_date 23:59:59`, the system automatically cancels all future bookings.
  - Cancelled seats are immediately offered to the Auto-Waitlist queue.
  - Notification sent to member: *"Your future booking for Seat A-12 on [Date] was cancelled because your membership expired. Renew now to re-book."*

---

## 7. QR ATTENDANCE SYSTEM & ANTI-FRAUD SECURITY

### 7.1 Secure QR Token Architecture
- **HMAC-SHA256 Token Payload:**
  ```json
  {
    "b_id": "bk_8f9a2b1c",
    "m_id": "usr_4a5b6c7d",
    "iat": 1789725600,
    "exp": 1789725630,
    "nonce": "a7x9q2m1",
    "sig": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
  ```
- **Dynamic Refresh Rate:** QR code re-encodes with a new `nonce` and updated `exp` (30-second TTL) every 30 seconds on the client application.

### 7.2 Anti-Fraud Check-In Validation Engine
```
Student Scans QR at Desk Kiosk / Staff Device
                   │
                   ▼
       [ Extract HMAC Token ]
                   │
                   ▼
    Is Token Expiry (exp) Valid? ──NO──► [ REJECT: QR Expired / Refresh Required ]
                   │ YES
                   ▼
    Is HMAC Signature Valid?    ──NO──► [ REJECT: Invalid Token / Fraud Attempt ]
                   │ YES
                   ▼
    Is Nonce Already Used?     ──YES─► [ REJECT: Duplicate Scan Detected ]
                   │ NO
                   ▼
    Is Member Status ACTIVE?   ──NO──► [ REJECT: Membership Inactive/Expired ]
                   │ YES
                   ▼
  Is Current Time within Slot? ──NO──► [ REJECT: Outside Booking Window ]
                   │ YES
                   ▼
   [ RECORD CHECK_IN SUCCESS ] ──► Store Nonce ──► Start Study Clock ──► Sync Live Map
```

### 7.3 Offline / Kiosk Fail-Safe
- In case of internet disruption at front desk kiosk, staff can enter a 4-digit temporary offline PIN or student phone number on staff portal to manually record check-in.
- Action creates an `ATTENDANCE_MANUAL_OVERRIDE` audit log with staff user ID.

---

## 8. STUDYFLOW ENGINE (GUARDIAN + AUTO-WAITLIST + OCCUPANCY INTEL)

The **StudyFlow Engine** is the core operational intelligence module governing automated floor management, seat liberation, and capacity optimization.

```
                  ┌──────────────────────────────────────────┐
                  │            STUDYFLOW ENGINE              │
                  └────────────────────┬─────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│  SMART SEAT      │         │  AUTO-WAITLIST   │         │    OCCUPANCY     │
│    GUARDIAN      │         │     ENGINE       │         │   INTELLIGENCE   │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
 1. Monitors Grace Period      1. Detects Released Seat    1. Calculates Peak Hours
 2. Flags NO_SHOW Candidates   2. Grabs FIFO Queue         2. Computes Seat Yield %
 3. Liberates Seat Locks       3. Sends 10-Min Offer       3. Flags Underused Zones
```

### 8.1 Smart Seat Guardian
- **Automated No-Show Processor:** Runs every 60 seconds.
- Evaluates active bookings where `current_time > (slot_start_time + grace_period_minutes)` AND `status == 'CONFIRMED'` (Not checked in).
- Transitions booking status to `NO_SHOW`.
- Immediately releases seat availability to backend pool.
- Sends instant WhatsApp notification to student: *"You missed your check-in window for Seat B-04. The seat has been released."*

### 8.2 Auto-Waitlist Engine
- Triggered immediately when a seat status becomes `AVAILABLE` during a peak slot.
- Fetches top student from waitlist queue ordered by `priority_tier DESC, joined_at ASC`.
- Locks seat in `OFFERED` status for **10 minutes**.
- Dispatches high-priority WhatsApp/In-App Notification: *"Seat A-08 just opened up for Today's Afternoon Slot! You have 10 minutes to claim it."*
- If Student ACCEPTS -> Booking created instantly.
- If Student DECLINES or 10-min TTL expires -> Offer revoked, seat offered to next in queue.

### 8.3 Occupancy Intelligence Metrics Engine
- **Live Seat Utilization Rate:** `(Occupied Seats + Confirmed Active Bookings) / Total Operational Seats * 100`
- **Peak Hour Heatmap:** Aggregates check-ins in 30-minute intervals over rolling 30 days.
- **Seat Yield Score:** Ranks desks 1 to N based on booking frequency to identify unpopular seats requiring maintenance or repositioning.
- **No-Show Rate Telemetry:** Percentage of total bookings resulting in no-show by time slot and day of week.

---

## 9. WAITLIST SYSTEM & QUEUE ORDERING

### 9.1 Joining Rules & Requirements
- Student must hold an `ACTIVE` membership plan.
- Student can join waitlist for a specific date, time slot, and preferred zone.
- Maximum 2 active waitlist entries per student at any given time.

### 9.2 FIFO Queue Ordering Rules
1. **Priority Group 1:** Quarterly / Reserved Members (High Priority)
2. **Priority Group 2:** Monthly Members
3. **Priority Group 3:** Weekly / Daily Pass Members
*Within each priority group, strict First-In, First-Out (FIFO) timestamp sorting applies.*

---

## 10. PAYMENTS ENGINE & RAZORPAY / IDEMPOTENCY INTEGRATION

### 10.1 Payment Provider Architecture
- Primary Gateway: **Razorpay** (UPI, Credit/Debit Cards, NetBanking, Razorpay Wallet).
- Backup / Manual: Admin Cash / Direct POS Machine Entry.

### 10.2 Server-Driven Payment Security & Idempotency
> [!IMPORTANT]
> **Zero Client Trust Rule:** The frontend payment status (e.g. `onSuccess` handler) MUST NEVER mark a membership or booking as paid. Fulfillment occurs strictly upon backend webhook verification or server-to-server gateway status polling.

```
Student Initiates Plan Purchase
               │
               ▼
   [ Backend API: Create Order ] ──► Calls Razorpay Orders API ──► Returns `razorpay_order_id`
               │
               ▼
   [ Student Completes Checkout in SDK ]
               │
               ▼
   [ Razorpay Sends Async Webhook: `payment.captured` ]
               │
               ▼
   [ Backend Webhook Endpoint ]
               │
               ├─► 1. Verify Razorpay HMAC Signature (`x-razorpay-signature`)
               ├─► 2. Check Idempotency Key (`payment_intent_id` in DB)
               │      └─► If already processed: Return HTTP 200 OK (Skip duplicate)
               ├─► 3. Open DB Transaction:
               │      ├─► Update Payment Record -> STATUS: SUCCESS
               │      ├─► Update Membership Record -> STATUS: ACTIVE
               │      └─► Generate GST Invoice PDF & Store in Cloud Storage
               └─► 4. Return HTTP 200 OK
```

### 10.3 Manual Offline Payment Flow
- Admin or Staff can record cash payments via Admin Portal.
- Form requires: Member ID, Plan ID, Amount Received, Payment Mode (`CASH`, `DESK_POS`, `DIRECT_BANK_TRANSFER`), Notes.
- System generates receipt and marks payment as `OFFLINE_VERIFIED` with actor audit log.

---

## 11. AUTOMATED COMMUNICATION CENTER & TEMPLATES

### 11.1 Multi-Channel Messaging Infrastructure
- Supported Channels: **WhatsApp Business API**, **Transactional SMS**, **Email (SMTP)**, **In-App Push**.
- Template Engine: Liquid / Handlebars dynamic syntax with strict variable sanitization.

### 11.2 Trigger Event Matrix & Variable Schema

| Event Key | Channel | Trigger Condition | Template Variables Available |
| :--- | :--- | :--- | :--- |
| `MEMBERSHIP_EXPIRING_3D` | WhatsApp + Email | Expiry date is 3 days away | `{{student_name}}`, `{{plan_name}}`, `{{expiry_date}}`, `{{renewal_link}}` |
| `MEMBERSHIP_EXPIRING_1D` | WhatsApp + SMS | Expiry date is tomorrow | `{{student_name}}`, `{{expiry_date}}`, `{{renewal_link}}` |
| `BOOKING_CONFIRMED` | WhatsApp | Booking successfully created | `{{student_name}}`, `{{seat_number}}`, `{{booking_date}}`, `{{slot_time}}`, `{{qr_link}}` |
| `NO_SHOW_NOTICE` | WhatsApp + In-App | Grace period expired, seat freed | `{{student_name}}`, `{{seat_number}}`, `{{slot_time}}` |
| `WAITLIST_OFFER` | WhatsApp High-Priority | Seat opened for waitlisted user | `{{student_name}}`, `{{seat_number}}`, `{{claim_expiry_time}}`, `{{claim_link}}` |
| `PAYMENT_SUCCESS` | Email + WhatsApp | Successful invoice payment | `{{student_name}}`, `{{amount_paid}}`, `{{invoice_number}}`, `{{download_link}}` |

### 11.3 Delivery Logging Telemetry
- Every dispatched message is logged in `communication_logs` table with columns: `id`, `member_id`, `event_key`, `channel`, `recipient`, `status` (`QUEUED`, `SENT`, `DELIVERED`, `READ`, `FAILED`), `error_message`, `provider_message_id`, `created_at`.

---

## 12. AUTOMATED CALLING SYSTEM & VOICE WORKFLOW

### 12.1 Automated Voice Reminder Architecture
To resolve the critical problem of uncollected membership renewals, StudySpace OS incorporates an automated outbound IVR calling engine.

```
       [ Cron Scheduler: Runs Daily at 10:00 AM ]
                           │
                           ▼
  Query: Active Memberships Expiring in <= 2 Days AND Renewal Unpaid
                           │
                           ▼
           Filter: DND & Quiet Hours Check
                           │
                           ▼
         [ IVR Voice Call Queueing Engine ]
                           │
                           ▼
  [ Voice Provider Adapter Interface (`IVoiceProvider`) ]
             │                             │
             ▼                             ▼
     [ Exotel Adapter ]            [ Twilio / Custom ]
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
               Outbound Call Initiated to Member
                            │
                            ▼
              [ Call Webhook Callback ]
                            │
                            ├─► ANSWERED ──► Play Renewal Voice Script ──► Log Success
                            ├─► BUSY / NO_ANSWER ──► Queue Retry in 4 Hours (Max 2)
                            └─► FAILED ──► Log Failure & Flag for Staff Manual Call
```

### 12.2 Voice Campaign Rules & Quiet Hours
- **Quiet Hours Constraint:** Calls are strictly prohibited between **21:00 (9:00 PM)** and **08:00 (8:00 AM)** local facility time.
- **Retry Logic:** Max 2 call retries spaced at least 4 hours apart if call status returns `BUSY` or `NO_ANSWER`.
- **DND / Opt-Out:** Members who enable "Do Not Call" in their notification preferences are automatically excluded from automated voice queues.

---

## 13. ADMIN DASHBOARD & OPERATIONAL VISIBILITY

### 13.1 Real-Time Executive KPI Grid
1. **Current Live Occupancy:** Count of checked-in seats / Total capacity + Live percentage indicator.
2. **Today's Total Bookings:** Total completed + active bookings for the day.
3. **No-Show Counter:** Total missed grace period bookings today.
4. **Expiring Memberships (7-Day Window):** Count of active members expiring in the next 7 days requiring renewal action.
5. **Today's Revenue:** Total sum of online + offline payments processed today.
6. **Active Waitlist Count:** Students currently queued waiting for open slots.

### 13.2 Operational Widgets
- **Live Floor Quick View:** Mini-map showing live seat status with instant click-to-override.
- **Pending Renewal Watchlist:** List of members expiring today with 1-click "Trigger Voice Call" or "Send WhatsApp" buttons.
- **Recent Attendance Feed:** Real-time log of check-ins/check-outs occurring at the front desk kiosk.

---

## 14. LIVE FLOOR MANAGEMENT & ADMINISTRATIVE OVERRIDES

### 14.1 Administrative Floor Map Controls
- **Seat State Overrides:** Admin can right-click any seat on the live floor map to perform:
  - `LOCK_FOR_MAINTENANCE` (Prevents student booking).
  - `FORCE_CHECK_IN` (Manually checks in a member who forgot phone).
  - `FORCE_CHECK_OUT` (Clears an occupied seat if student left without scanning).
  - `REASSIGN_MEMBER` (Relocates checked-in student from Desk A-01 to Desk B-05).

### 14.2 Audit Requirement
- Every manual floor map override triggers a modal prompting for an **Override Reason** (e.g., "Broken power socket", "Student medical emergency", "Scanner hardware issue").
- Action creates an immutable log entry in `audit_logs`.

---

## 15. MEMBER MANAGEMENT

### 15.1 Member Directory & Filters
- Search by Name, Phone Number, Email, Student ID, or KYC Document Number.
- Filter by Membership Tier, Membership Status (`ACTIVE`, `EXPIRING_SOON`, `EXPIRED`, `SUSPENDED`), and Exam Goal.

### 15.2 Comprehensive Member Detail View
- **Tab 1: Profile & KYC:** Personal info, verified status, uploaded ID view.
- **Tab 2: Membership & Billing:** Current plan, start/end date, manual plan extension, offline payment entry.
- **Tab 3: Booking & Attendance History:** Full list of past seats booked, check-in timestamps, total study hours logged.
- **Tab 4: Communication & Call Logs:** Timeline of every WhatsApp message, SMS, email, and automated voice call sent to the member with status tags.
- **Tab 5: Staff Internal Notes:** Private notes left by receptionists (e.g., "Prefers quiet corner seats", "Frequent late check-ins").

---

## 16. BOOKING MANAGEMENT

### 16.1 Admin Booking Operations
- Filter bookings by Date Range, Time Slot, Zone, Status, and Search Query.
- Administrative creation of bookings for walk-in students.
- Bulk Cancellation Workflow: In case of unexpected facility closure (e.g., power outage or maintenance day), Admin can cancel all bookings for a given date range with automated student notification and validity extensions.

---

## 17. ATTENDANCE MANAGEMENT

### 17.1 Attendance Logs & Reporting
- Detailed tabular view of every check-in/out event.
- Filter by Verification Method: `QR_DYNAMIC_SCAN`, `MANUAL_STAFF_PIN`, `ADMIN_OVERRIDE`.
- Export options: CSV / Excel report generation for operational audits.

---

## 18. BUSINESS ANALYTICS & METRICS SPECIFICATION

### 18.1 Key Business Intelligence Reports
1. **Revenue & MRR Analytics:** Monthly Recurring Revenue, plan conversion rates, ARPU (Average Revenue Per User).
2. **Seat Utilization Heatmap:** Hourly floor occupancy grid revealing peak bottlenecks and low-demand hours.
3. **No-Show & Waste Analysis:** Revenue/capacity loss tracking due to unfulfilled bookings.
4. **Member Retention & Renewal Cohort:** Percentage of members renewing after 1st, 3rd, and 6th months.
5. **Voice Campaign Conversion Rate:** Percentage of automated voice call targets who completed renewal within 24 hours of receiving a call.

---

## 19. PUBLIC WEBSITE & BRAND VOICE

### 19.1 Design Aesthetics & Brand Positioning
- Visual Theme: Modern Premium Hospitality x High-Focus Study Space.
- Aesthetic References: Apple minimal typography + Linear dark/light structured UI + Vercel high-contrast layouts.
- Key Value Messaging: "Your Dedicated Silent Sanctuary for Competitive Exam Success."

### 19.2 Public Page Architecture
- **Home (`/`):** Hero section with virtual floor tour, key facilities grid, live seat availability preview widget, student testimonials, CTA to view plans.
- **About / Facilities (`/about`):** Detailed breakdown of silent zones, ergonomic chairs, high-speed fiber internet, power backup, acoustic insulation, tea/coffee lounge.
- **Plans (`/plans`):** Transparent pricing matrix for Daily, Weekly, Monthly, and Reserved Seat tiers with feature breakdown.
- **Rules & FAQ (`/faq`):** Clear guidelines on silence rules, eating policy, booking grace periods, cancellation terms, and refund policy.
- **Contact (`/contact`):** Google Maps location embed, branch contact details, WhatsApp quick chat link, inquiry form.
- **Auth (`/login`, `/signup`):** Clean OTP and password authentication screens.

---

## 20. COMPLETE PAGE & ROUTE INVENTORY

```
PUBLIC ROUTES:
  ├── /                           (Public Homepage)
  ├── /about                      (Facilities & Experience)
  ├── /plans                      (Membership Pricing)
  ├── /faq                        (Rules & Frequently Asked Questions)
  ├── /contact                    (Contact & Location)
  ├── /login                      (Member / Staff Login)
  └── /signup                     (Member Registration)

STUDENT PORTAL ROUTES (`/student/`):
  ├── /student/dashboard          (Member Overview & Active Status)
  ├── /student/book-seat          (Interactive Map & Slot Booking)
  ├── /student/my-bookings        (Upcoming, Past & Rescheduling)
  ├── /student/my-qr              (Dynamic Dynamic Check-In QR)
  ├── /student/attendance         (Study Hours Log & History)
  ├── /student/payments           (Billing History & Invoices)
  ├── /student/renew              (Plan Renewal & Store)
  ├── /student/notifications      (In-App Notification Center)
  └── /student/profile            (Profile Settings & KYC)

ADMIN PORTAL ROUTES (`/admin/`):
  ├── /admin/dashboard            (Executive Overview & KPIs)
  ├── /admin/live-floor           (Real-time Interactive Operator Map)
  ├── /admin/bookings             (Booking Management & Overrides)
  ├── /admin/attendance           (Attendance Logs & Corrections)
  ├── /admin/members              (Member Directory & Deep View)
  ├── /admin/plans                (Membership Plan Configurator)
  ├── /admin/payments             (Payment Transactions & Manual Entry)
  ├── /admin/automations          (Notification Templates & Event Logs)
  ├── /admin/calls                (Automated Voice Call Campaigns & Logs)
  ├── /admin/reports              (Analytics & Export Engine)
  ├── /admin/settings             (Facility Settings & Business Hours)
  ├── /admin/roles                (Staff Access & Permissions)
  └── /admin/audit-logs           (Immutable System Security Log)

STAFF PORTAL ROUTES (`/staff/`):
  ├── /staff/dashboard            (Front Desk Reception Overview)
  ├── /staff/scanner              (Kiosk QR Scanner & Validation Tool)
  ├── /staff/live-floor           (Read-Only Live Floor Map)
  ├── /staff/bookings             (Today's Booking Check-In List)
  └── /staff/members              (Restricted Member Search & Verification)
```

---

## 21. EXHAUSTIVE BUSINESS RULES MATRIX

| Category | Rule ID | Business Rule Description | Enforcement Layer |
| :--- | :--- | :--- | :--- |
| **Eligibility** | `BR-01` | Active membership required to book seats beyond Day Pass. | Server-side API Middleware |
| **Concurrency** | `BR-02` | Exactly one booking per seat/date/slot combination. Concurrent locks enforced. | Database Lock & Constraints |
| **Cancellation** | `BR-03` | Cancellations allowed up to 120 mins before slot start time. Late cancellation counts as penalty. | Server-side Booking Engine |
| **Grace Period** | `BR-04` | 15-minute grace period post slot start. Non-check-in converts booking to `NO_SHOW`. | StudyFlow Guardian Background Job |
| **Expiry Bookings**| `BR-05` | Future bookings past membership end-date auto-cancelled at 23:59:59 on expiry day. | Scheduled Daily Cron Job |
| **QR Security** | `BR-06` | Dynamic QR code tokens expire in 30 seconds. Screenshots strictly rejected. | Auth HMAC Validation Engine |
| **Quiet Hours** | `BR-07` | Outbound automated voice calls blocked between 21:00 and 08:00 local time. | Voice Campaign Queue Dispatcher |
| **Idempotency** | `BR-08` | Payment webhooks processed idempotently using unique transaction hash lock. | Payment Webhook Handler |
| **Audit Trails** | `BR-09` | All staff and admin overrides require reason text and log actor IP + timestamp. | Audit Log Middleware |

---

## 22. EDGE CASES & EXPECTED SYSTEM BEHAVIORS

Below is the explicit operational specification for 20 critical edge-case scenarios:

### 1. Two users book the same seat simultaneously
- **Behavior:** Backend isolated transaction lock succeeds for Request A and inserts booking. Request B lock fails or DB unique constraint `(seat_id, date, slot_id)` throws violation. Request B receives HTTP 409 Conflict: *"Seat was just reserved by another member."*

### 2. Membership expires while user is filling booking form
- **Behavior:** On submission, backend validates user membership `end_date >= booking_date`. Request rejected with HTTP 403 Forbidden: *"Your membership expires before the requested booking date. Please renew your plan."*

### 3. User attempts cancellation past the 120-minute deadline
- **Behavior:** UI disables cancellation button with explanatory tooltip. API call returns HTTP 400 Bad Request: *"Cancellations are not permitted within 2 hours of slot start time."*

### 4. User arrives at desk 20 minutes late (Past 15-min grace period)
- **Behavior:** StudyFlow Guardian has already transitioned booking to `NO_SHOW` at t+15 mins and released seat. Kiosk scan displays: *"Grace period expired. Booking marked as No-Show. Please contact front desk."* Staff can manually re-assign an available seat if capacity permits.

### 5. Old screenshot of dynamic QR code scanned at front desk
- **Behavior:** Token `exp` timestamp is older than current server time (or `nonce` is invalid). Scanner returns RED Error screen: *"Invalid/Expired QR. Please refresh your mobile application."*

### 6. Same valid QR scanned twice consecutively
- **Behavior:** First scan sets booking status `CHECKED_IN` and records timestamp. Second scan within 60 seconds returns: *"Already Checked-In at [10:02 AM]. Have a great study session!"*

### 7. QR code scanned for a booking scheduled for tomorrow
- **Behavior:** Scanner evaluates `booking_date` vs current date. Returns: *"Booking is scheduled for tomorrow [Date]. Check-in opens 15 minutes before slot start."*

### 8. Payment succeeds on Razorpay gateway, but user's browser/network disconnects
- **Behavior:** Frontend state is irrelevant. Razorpay dispatches asynchronous `payment.captured` webhook to backend. Backend verifies signature, updates payment to `SUCCESS`, activates membership, and dispatches WhatsApp confirmation. When student re-opens app, active membership is visible.

### 9. Razorpay webhook received twice (Duplicate webhook dispatch)
- **Behavior:** Webhook handler checks DB for `payment_intent_id`. Since transaction is already marked `SUCCESS`, webhook handler immediately returns HTTP 200 OK without re-processing membership extensions.

### 10. WhatsApp Messaging API provider experiences service outage
- **Behavior:** Message dispatcher catches provider failure, logs error state `FAILED`, and automatically fails over to backup SMS provider for critical transactional alerts (e.g. Booking confirmation, Waitlist offer).

### 11. Automated Voice Call provider fails during call execution
- **Behavior:** Call record updated to `FAILED`. Queue manager reschedules call attempt for next valid window (or flags for staff desk manual follow-up).

### 12. Waitlisted student does not respond to 10-minute seat offer
- **Behavior:** Offer TTL expires at t+10 mins. Offer status set to `EXPIRED`. Seat automatically locks for top candidate next in FIFO queue, and new offer notification is sent.

### 13. Admin blocks a seat for maintenance that has future confirmed bookings
- **Behavior:** System prompts Admin with list of affected future bookings. Admin selects "Block & Auto-Reassign" or "Block & Cancel with Notification". System executes choice and dispatches alerts to affected members.

### 14. Facility unexpectedly closes (e.g. Emergency grid power outage)
- **Behavior:** Admin uses "Bulk Emergency Cancellation" tool for specified date/slots. All affected bookings set to `CANCELLED_BY_FACILITY`. System auto-extends membership duration by 1 day for all affected members and sends apology notification.

### 15. Future bookings require bulk cancellation due to zone renovation
- **Behavior:** Admin selects specific seats/zone and date range. System cancels future bookings, liberates seats for other zones, and triggers priority re-booking links to affected members.

### 16. Member changes phone number in profile
- **Behavior:** Member must verify new phone number via SMS/WhatsApp OTP before profile update persists. All future automated communication updates to new verified number immediately.

### 17. Staff receptionist account is deactivated while receptionist is logged in
- **Behavior:** JWT/Session revocation list updated instantly. Next API call from staff device returns HTTP 401 Unauthorized, redirecting device to login screen.

### 18. Admin manually modifies attendance record
- **Behavior:** System updates `check_in_time` or `check_out_time`, recalculates total study duration, and creates an audit entry recording Admin ID, Old Timestamp, New Timestamp, and Reason.

### 19. Network connection drops at kiosk during QR check-in scan
- **Behavior:** Mobile scanner app caches scan payload locally with offline indicator. Once connection restores within 60s, payload syncs to backend. If offline > 60s, staff switches to manual offline PIN entry.

### 20. User refreshes browser mid-checkout during online payment
- **Behavior:** Gateway order ID remains active on backend. User redirected to `/student/payments` where order appears with "Pending Completion" badge and "Resume Payment" button.

---

## 23. SECURITY, PRIVACY & AUTHORIZATION REQUIREMENTS

### 23.1 Authentication & Session Security
- Stateless JWT authentication with short-lived Access Tokens (15 mins) stored in memory + HttpOnly, Secure, SameSite `Refresh Token` cookies (7 days).
- Mandatory bcrypt / Argon2 hashing for user passwords.

### 23.2 Server-Side Authorization & Data Isolation
- Strict server-side route guards enforcing role permissions (`STUDENT`, `STAFF`, `ADMIN`).
- Row-Level Access Security: Students can query ONLY their own bookings, memberships, and notification records.

### 23.3 API Security & Webhook Protections
- Rate Limiting: Max 100 requests per minute per IP for public endpoints; Max 10 OTP requests per hour per phone number.
- Webhook Authentication: HMAC-SHA256 signature checking on all incoming Razorpay and WhatsApp/Voice callbacks.
- Zero secrets in client-side code. All API keys (`RAZORPAY_SECRET`, `EXOTEL_API_KEY`, `WHATSAPP_TOKEN`) stored strictly in server environment variables.

---

## 24. MULTI-CHANNEL NOTIFICATION ENGINE SPECIFICATION

```
             ┌──────────────────────────────────────────────┐
             │       NOTIFICATIONS DISPATCHER ENGINE        │
             └──────────────────────┬───────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
 ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
 │ WHATSAPP BUS. │          │ TRANSACTIONAL │          │ TRANSACTIONAL │
 │  API ADAPTER  │          │  SMS ADAPTER  │          │ EMAIL ADAPTER │
 └───────┬───────┘          └───────┬───────┘          └───────┬───────┘
         │                          │                          │
         ▼                          ▼                          ▼
 [ Direct WhatsApp ]        [ Mobile Carrier ]         [ Student Inbox ]
```

### 24.1 Notification Channel Preferences Matrix
- Critical Transactional (Booking confirmation, QR scan, Payment receipts): Dispatched via **WhatsApp + Email** (Non-opt-outable).
- Renewal Reminders: Dispatched via **WhatsApp + SMS + Voice Call** (Configurable in member profile).
- Promotional / Facility Updates: Dispatched via **Email + In-App** (Opt-outable).

---

## 25. ADMIN SYSTEM SETTINGS & CONFIGURATION SCHEMA

The platform behavior is entirely configurable via the Admin Settings interface. Below is the underlying JSON schema representation:

```json
{
  "facility_info": {
    "name": "StudySpace Silent Library",
    "timezone": "Asia/Kolkata",
    "currency": "INR",
    "tax_gst_percentage": 18.0
  },
  "operational_hours": {
    "open_time": "06:00",
    "close_time": "24:00",
    "slot_duration_hours": 6
  },
  "booking_rules": {
    "advance_booking_days": 7,
    "cancellation_deadline_minutes": 120,
    "grace_period_minutes": 15,
    "max_active_bookings_per_user": 1
  },
  "voice_call_settings": {
    "enabled": true,
    "quiet_hours_start": "21:00",
    "quiet_hours_end": "08:00",
    "max_retries": 2,
    "retry_interval_hours": 4
  },
  "waitlist_settings": {
    "offer_claim_window_minutes": 10,
    "auto_promote_enabled": true
  }
}
```

---

## 26. AUDIT LOGGING SYSTEM SPECIFICATION

### 26.1 Mandatory Audit Log Schema
All sensitive system actions create immutable records in `audit_logs`:

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL REFERENCES users(id),
    actor_role VARCHAR(20) NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- e.g., 'ADMIN_SEAT_OVERRIDE', 'ATTENDANCE_CORRECTION'
    entity_type VARCHAR(50) NOT NULL, -- e.g., 'BOOKING', 'MEMBERSHIP', 'ATTENDANCE'
    entity_id UUID NOT NULL,
    old_state JSONB,
    new_state JSONB,
    override_reason TEXT,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 27. MEASURABLE ACCEPTANCE CRITERIA

### Feature 1: Seat Concurrency Control
- [ ] **Pass Criteria:** When two HTTP clients simultaneously execute `POST /api/bookings` for the same seat, date, and slot ID, exactly ONE request returns HTTP 201 Created and the second returns HTTP 409 Conflict. Zero double-bookings occur in database.

### Feature 2: Anti-Fraud QR Check-In
- [ ] **Pass Criteria:** A QR payload with an expired timestamp or tampered HMAC signature scanned at the front desk scanner fails validation and displays a RED error message on the kiosk screen.

### Feature 3: StudyFlow No-Show Seat Release
- [ ] **Pass Criteria:** If a booking remains unchecked-in 15 minutes post slot start time, the StudyFlow background process transitions status to `NO_SHOW`, liberates the seat on the live floor map, and dispatches a release notification to the member.

### Feature 4: Server-Validated Payment Fulfillment
- [ ] **Pass Criteria:** Frontend browser mutation or console call cannot set a membership to `ACTIVE`. Membership activates ONLY when the backend verifies the Razorpay signature on webhook callback.

### Feature 5: Automated Voice Call Quiet Hours Enforcement
- [ ] **Pass Criteria:** Any automated voice call scheduled or queued between 21:00 and 08:00 is automatically held in `QUEUED` state until 08:00 AM before provider API execution.

### Feature 6: Role Authorization Boundaries
- [ ] **Pass Criteria:** An API request to `/api/admin/members` using a `STUDENT` JWT token is rejected with HTTP 403 Forbidden.

---

## 28. MVP VS FUTURE SCOPE

### 28.1 In-Scope for Production MVP (v1.0)
- Complete Public Site (Home, About, Plans, FAQ, Contact, Auth).
- Full Student Portal (Dashboard, Seat Map, Booking, Dynamic QR, Attendance, Payments).
- Admin Portal (Live Floor Map, Member Management, Booking Overrides, Plan Configurator, System Settings).
- Staff Portal (Front desk QR scanner kiosk, Today's list, Manual attendance).
- StudyFlow Engine (Grace period no-show guardian + Auto-waitlist queue).
- Razorpay Payment Integration with Webhook verification & GST invoicing.
- Multi-Channel WhatsApp + Email + SMS Notification Engine.
- Automated Outbound Voice Calling Engine (Provider abstraction + Exotel integration + Quiet hours logic).
- Strict Database Concurrency Locks & Audit Logging.

### 28.2 Deferred to Future Scope (v2.0 Roadmap)
- Multi-Branch Facility Management (Managing multiple physical study space locations under 1 account).
- AI Predictive Occupancy Forecasting (Machine learning model predicting seat demand 30 days ahead).
- Biometric Hardware Integration (Fingerprint/Facial recognition turnstile gate integration).
- Mobile Native Apps (iOS & Android native Swift/Kotlin builds).
- Member Study Group & Discussion Room Reservation Module.

---

## 29. PRODUCT QUALITY & OPERATIONAL DESIGN PRINCIPLES

1. **Real Production Logic Over Visual Shortcuts:** No mock timers, fake payment approvals, or hardcoded state bypasses.
2. **Server-Enforced Rules:** Every business constraint MUST be evaluated on the backend server.
3. **Zero UI Placeholders:** Clean, responsive, dark/light modern hospitality aesthetics with complete edge-state messaging (loading, empty, error, forbidden).
4. **Idempotency & Resilience:** All financial, communication, and attendance APIs are idempotent and resilient to network retries.
5. **Auditing & Traceability:** Immutable audit logging for every administrative action.

---

## 30. STAGE 01 GATE CHECKLIST & ACCEPTANCE REPORT

| Requirement Item | Description | Status | Verification Reference |
| :---: | :--- | :---: | :--- |
| **01** | Product Vision & Problem Statement | **PASS** | Section 1 |
| **02** | User Roles & Explicit Permissions Matrix | **PASS** | Section 2 |
| **03** | Student Portal & Feature Requirements | **PASS** | Section 3 |
| **04** | Seat Booking Concurrency & Source-of-Truth Logic | **PASS** | Section 4 |
| **05** | Visual Seat Map & Live Floor Specifications | **PASS** | Section 5 |
| **06** | Membership System & Lifecycle Rules | **PASS** | Section 6 |
| **07** | QR Attendance System & Anti-Fraud Workflow | **PASS** | Section 7 |
| **08** | StudyFlow Engine (Guardian + Waitlist + Analytics) | **PASS** | Section 8 |
| **09** | Waitlist Queue Ordering & Offer Logic | **PASS** | Section 9 |
| **10** | Payment Integration & Idempotency Rules | **PASS** | Section 10 |
| **11** | Automated Communication Center & Templates | **PASS** | Section 11 |
| **12** | Automated Voice Calling System & Quiet Hours | **PASS** | Section 12 |
| **13** | Admin Dashboard & Operational Visibility | **PASS** | Section 13 |
| **14** | Live Floor Management & Admin Overrides | **PASS** | Section 14 |
| **15** | Member Management Specifications | **PASS** | Section 15 |
| **16** | Booking Management Specifications | **PASS** | Section 16 |
| **17** | Attendance Management Specifications | **PASS** | Section 17 |
| **18** | Business Analytics & Intelligence Metrics | **PASS** | Section 18 |
| **19** | Public Website Structure & Visual Direction | **PASS** | Section 19 |
| **20** | Complete Route & Page Inventory | **PASS** | Section 20 |
| **21** | Exhaustive Business Rules Matrix | **PASS** | Section 21 |
| **22** | Deep Edge Cases & Expected Behaviors (20/20) | **PASS** | Section 22 |
| **23** | Security, Privacy & Authorization Architecture | **PASS** | Section 23 |
| **24** | Multi-channel Notification Architecture | **PASS** | Section 24 |
| **25** | Admin Configuration JSON Schema | **PASS** | Section 25 |
| **26** | Audit Logging System Specification | **PASS** | Section 26 |
| **27** | Measurable Feature Acceptance Criteria | **PASS** | Section 27 |
| **28** | MVP vs. Future Scope Boundaries | **PASS** | Section 28 |
| **29** | Product Quality & Operational Principles | **PASS** | Section 29 |
| **30** | Final PRD Gate Verification | **PASS** | Section 30 |

---
**Stage 01 Status:** **COMPLETE & FINALIZED**  
*Full product specification is established and ready to serve as the single source of truth for technical architecture and design.*
