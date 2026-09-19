/* ==========================================================================
   STUDYSPACE OS — PROTOTYPE MOCK DATA (FOR DESIGN PREVIEW ONLY)
   ========================================================================== */

export const MOCK_USER = {
  name: "Rahul Sharma",
  email: "rahul.s@example.com",
  phone: "+91 98765 43210",
  membership: "Monthly Pro",
  expiresInDays: 18,
  expiryDate: "Oct 06, 2026",
  status: "ACTIVE",
  totalHours: 142.5,
  streakDays: 14,
  kycVerified: true,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
};

export const MOCK_SEATS = [
  { id: "A-01", zone: "Silent Focus", type: "Ergonomic Desk", status: "AVAILABLE", power: true, window: true },
  { id: "A-02", zone: "Silent Focus", type: "Ergonomic Desk", status: "OCCUPIED", occupant: "Priya V.", power: true, window: true },
  { id: "A-03", zone: "Silent Focus", type: "Ergonomic Desk", status: "AVAILABLE", power: true, window: false },
  { id: "A-04", zone: "Silent Focus", type: "Ergonomic Desk", status: "BLOCKED", reason: "Power Outlet Repair", power: false, window: false },
  { id: "A-05", zone: "Silent Focus", type: "Single Cubicle", status: "OCCUPIED", occupant: "Amit K.", power: true, window: false },
  { id: "A-06", zone: "Silent Focus", type: "Single Cubicle", status: "AVAILABLE", power: true, window: false },
  
  { id: "B-01", zone: "Discussion Pod", type: "Shared Pod", status: "AVAILABLE", power: true, window: true },
  { id: "B-02", zone: "Discussion Pod", type: "Shared Pod", status: "OCCUPIED", occupant: "Siddharth N.", power: true, window: true },
  { id: "B-03", zone: "Discussion Pod", type: "Shared Pod", status: "AVAILABLE", power: true, window: false },
  { id: "B-04", zone: "Discussion Pod", type: "Shared Pod", status: "AVAILABLE", power: true, window: false },
  
  { id: "C-01", zone: "Window Desk", type: "Premium View", status: "OCCUPIED", occupant: "Ananya R.", power: true, window: true },
  { id: "C-02", zone: "Window Desk", type: "Premium View", status: "AVAILABLE", power: true, window: true },
  { id: "C-03", zone: "Window Desk", type: "Premium View", status: "AVAILABLE", power: true, window: true },
  { id: "C-04", zone: "Window Desk", type: "Premium View", status: "OCCUPIED", occupant: "Vikram S.", power: true, window: true }
];

export const MOCK_BOOKINGS = [
  {
    id: "BK-9041",
    seat: "A-03",
    zone: "Silent Focus",
    date: "Today, Sep 18",
    slot: "Morning (06:00 - 12:00)",
    status: "CONFIRMED",
    qrToken: "HMAC_TOKEN_PROTOTYPE_A03",
    checkInTime: null
  },
  {
    id: "BK-8820",
    seat: "C-02",
    zone: "Window Desk",
    date: "Yesterday, Sep 17",
    slot: "Afternoon (12:00 - 18:00)",
    status: "COMPLETED",
    checkInTime: "12:04 PM",
    checkOutTime: "05:58 PM",
    duration: "5h 54m"
  },
  {
    id: "BK-8711",
    seat: "B-01",
    zone: "Discussion Pod",
    date: "Sep 15, 2026",
    slot: "Morning (06:00 - 12:00)",
    status: "NO_SHOW",
    checkInTime: null,
    reason: "Grace period expired (Released to Waitlist)"
  }
];

export const MOCK_MEMBERS = [
  { id: "USR-101", name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", plan: "Monthly Pro", expiry: "Oct 06, 2026", status: "ACTIVE", hours: 142.5 },
  { id: "USR-102", name: "Priya Verma", email: "priya.v@example.com", phone: "+91 98123 45678", plan: "Monthly Reserved", expiry: "Sep 20, 2026", status: "EXPIRING_SOON", hours: 210.0 },
  { id: "USR-103", name: "Amit Kumar", email: "amit.k@example.com", phone: "+91 97654 32109", plan: "Weekly Flex", expiry: "Sep 18, 2026", status: "EXPIRING_SOON", hours: 45.0 },
  { id: "USR-104", name: "Siddharth Nair", email: "sid.n@example.com", phone: "+91 99887 76655", plan: "Daily Pass", expiry: "Sep 18, 2026", status: "ACTIVE", hours: 8.5 },
  { id: "USR-105", name: "Ananya Roy", email: "ananya.r@example.com", phone: "+91 91234 56789", plan: "Quarterly Scholar", expiry: "Nov 30, 2026", status: "ACTIVE", hours: 310.2 }
];

export const MOCK_AUTOMATIONS = [
  { id: "AUT-01", name: "Membership Expiring (3 Days)", trigger: "Expiry in 3 Days", channel: "WhatsApp + Email", status: "ACTIVE", sentToday: 18 },
  { id: "AUT-02", name: "Membership Expiring (1 Day)", trigger: "Expiry in 24 Hours", channel: "WhatsApp + Voice Call Queue", status: "ACTIVE", sentToday: 6 },
  { id: "AUT-03", name: "Booking Check-in Reminder", trigger: "30 Mins Before Slot", channel: "WhatsApp Push", status: "ACTIVE", sentToday: 42 },
  { id: "AUT-04", name: "No-Show Seat Liberation", trigger: "Grace Period Expired", channel: "WhatsApp + In-App", status: "ACTIVE", sentToday: 3 }
];

export const MOCK_CALL_QUEUE = [
  { id: "CALL-881", member: "Priya Verma", reason: "Membership Expiring in 2 Days", status: "QUEUED", attempts: 0, scheduledFor: "Today, 10:30 AM" },
  { id: "CALL-880", member: "Amit Kumar", reason: "Membership Expiring Today", status: "ANSWERED", attempts: 1, result: "Promised online renewal by evening" },
  { id: "CALL-879", member: "Neha Gupta", reason: "Membership Expired (t-1 day)", status: "NO_ANSWER", attempts: 2, result: "Re-queued for afternoon" }
];
