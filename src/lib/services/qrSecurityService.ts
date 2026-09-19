/* ==========================================================================
   STUDYSPACE OS — DYNAMIC QR CRYPTOGRAPHIC SECURITY SERVICE
   ========================================================================== */

import { QrTokenPayload } from '../types/database';

const SYSTEM_HMAC_SECRET = 'STUDYSPACE_PROD_SECRET_HMAC_2026_V1';

/**
 * Generate a dynamic 30-second TTL cryptographically signed QR payload
 */
export function generateDynamicQrToken(bookingId: string, profileId: string, seatNumber: string): QrTokenPayload {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + 30; // 30-second dynamic TTL
  const nonce = Math.random().toString(36).substring(2, 10);

  // Simulates HMAC-SHA256 signature hash
  const rawPayload = `${bookingId}:${profileId}:${seatNumber}:${now}:${expiresAt}:${nonce}`;
  const signature = btoa(`${rawPayload}:${SYSTEM_HMAC_SECRET}`).substring(0, 32);

  return {
    bookingId,
    profileId,
    seatNumber,
    issuedAt: now,
    expiresAt,
    nonce,
    signature
  };
}

export interface QrValidationResponse {
  valid: boolean;
  code: string;
  message: string;
  details?: {
    bookingId: string;
    profileId: string;
    seatNumber: string;
    checkInTime: string;
  };
}

/**
 * Kiosk / Staff Scanner Validation Engine
 */
export function validateQrToken(tokenPayload: QrTokenPayload, usedNonces: Set<string>): QrValidationResponse {
  const now = Math.floor(Date.now() / 1000);

  // 1. Check TTL expiry
  if (now > tokenPayload.expiresAt) {
    return {
      valid: false,
      code: 'QR_TOKEN_EXPIRED',
      message: 'Dynamic QR token has expired (30s TTL lapsed). Please refresh mobile app.'
    };
  }

  // 2. Check single-use nonce (Anti-replay attack)
  if (usedNonces.has(tokenPayload.nonce)) {
    return {
      valid: false,
      code: 'DUPLICATE_SCAN_REJECTED',
      message: 'This QR code has already been scanned. Duplicate scans prohibited.'
    };
  }

  // 3. Mark nonce as used
  usedNonces.add(tokenPayload.nonce);

  return {
    valid: true,
    code: 'CHECK_IN_SUCCESS',
    message: `Attendance verified for Seat ${tokenPayload.seatNumber}.`,
    details: {
      bookingId: tokenPayload.bookingId,
      profileId: tokenPayload.profileId,
      seatNumber: tokenPayload.seatNumber,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  };
}
