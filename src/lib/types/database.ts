/* ==========================================================================
   STUDYSPACE OS — TYPESCRIPT DATABASE & ENTITY INTERFACES
   ========================================================================== */

export type UserRole = 'STUDENT' | 'STAFF' | 'ADMIN';
export type MembershipStatus = 'PENDING' | 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'SUSPENDED' | 'CANCELLED';
export type SeatStatus = 'AVAILABLE' | 'BOOKED' | 'OCCUPIED' | 'BLOCKED' | 'MAINTENANCE';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED' | 'NO_SHOW';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'RAZORPAY_ONLINE' | 'CASH_OFFLINE' | 'DESK_POS' | 'BANK_TRANSFER';
export type CallStatus = 'QUEUED' | 'INITIATED' | 'RINGING' | 'ANSWERED' | 'COMPLETED' | 'BUSY' | 'NO_ANSWER' | 'FAILED';

export interface Profile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  kycVerified: boolean;
  kycDocumentUrl?: string;
  emergencyContact?: string;
  examGoal?: string;
  notificationPreferences: {
    whatsapp: boolean;
    sms: boolean;
    email: boolean;
    voice: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  openingTime: string;
  closingTime: string;
  createdAt: string;
}

export interface Zone {
  id: string;
  branchId: string;
  name: string;
  description?: string;
  noiseLevelDb: number;
  createdAt: string;
}

export interface Seat {
  id: string;
  zoneId: string;
  seatNumber: string;
  type: string;
  currentStatus: SeatStatus;
  hasPowerOutlet: boolean;
  hasWindowView: boolean;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  durationDays: number;
  priceInr: number;
  dailySlotLimit: number;
  advanceBookingDays: number;
  allowedZones?: string[];
  createdAt: string;
}

export interface Membership {
  id: string;
  profileId: string;
  planId: string;
  status: MembershipStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  profileId: string;
  membershipId: string;
  seatId: string;
  bookingDate: string;
  timeSlotStart: string;
  timeSlotEnd: string;
  status: BookingStatus;
  gracePeriodEndsAt: string;
  createdAt: string;
}

export interface QrTokenPayload {
  bookingId: string;
  profileId: string;
  seatNumber: string;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
  signature: string;
}

export interface AttendanceRecord {
  id: string;
  bookingId: string;
  profileId: string;
  checkInTime: string;
  checkOutTime?: string;
  durationMinutes?: number;
  verificationMethod: string;
  isManualCorrection: boolean;
  correctedByProfileId?: string;
  correctionReason?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  profileId: string;
  membershipId?: string;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  idempotencyKey: string;
  amountInr: number;
  method: PaymentMethod;
  status: PaymentStatus;
  gstInvoiceNumber?: string;
  invoicePdfUrl?: string;
  createdAt: string;
}

export interface CallJob {
  id: string;
  profileId: string;
  membershipId?: string;
  reason: string;
  status: CallStatus;
  attemptCount: number;
  maxAttempts: number;
  providerCallId?: string;
  scheduledFor: string;
  executedAt?: string;
  resultSummary?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorRole: UserRole;
  actionType: string;
  entityType: string;
  entityId: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  reason?: string;
  ipAddress: string;
  createdAt: string;
}
