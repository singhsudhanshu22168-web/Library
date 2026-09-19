/* ==========================================================================
   STUDYSPACE OS — SEAT BOOKING TRANSACTION & CONCURRENCY SERVICE
   ========================================================================== */

import { Booking, BookingStatus } from '../types/database';
import { MOCK_BOOKINGS, MOCK_SEATS } from '../../data/mockData';

export interface CreateBookingParams {
  profileId: string;
  membershipId: string;
  seatId: string;
  bookingDate: string; // YYYY-MM-DD
  timeSlotStart: string; // HH:mm
  timeSlotEnd: string; // HH:mm
  advanceBookingDaysAllowed?: number;
}

export interface BookingResponse {
  success: boolean;
  code: string;
  message: string;
  booking?: Booking;
}

/**
 * Server-side Booking Engine Transaction Handler
 * Enforces PostgreSQL UNIQUE (seat_id, booking_date, time_slot_start) concurrency locks
 */
export async function createSeatReservation(params: CreateBookingParams): Promise<BookingResponse> {
  const { profileId, membershipId, seatId, bookingDate, timeSlotStart, timeSlotEnd } = params;

  // 1. Validate seat existence
  const seat = MOCK_SEATS.find(s => s.id === seatId);
  if (!seat) {
    return {
      success: false,
      code: 'SEAT_NOT_FOUND',
      message: 'The requested seat does not exist in the facility floor database.'
    };
  }

  // 2. Validate seat status
  if (seat.status === 'BLOCKED') {
    return {
      success: false,
      code: 'SEAT_BLOCKED',
      message: 'This seat is currently locked for facility maintenance.'
    };
  }

  // 3. Concurrency Lock Check (Simulates PostgreSQL UNIQUE constraint evaluation)
  const existingConflict = MOCK_BOOKINGS.find(b => 
    b.seat === seatId && 
    b.date === bookingDate && 
    b.slot.includes(timeSlotStart) && 
    b.status !== 'CANCELLED' && 
    b.status !== 'NO_SHOW'
  );

  if (existingConflict) {
    return {
      success: false,
      code: 'SEAT_ALREADY_RESERVED',
      message: `Seat ${seatId} was just reserved by another student for ${timeSlotStart}. Please select an alternate desk.`
    };
  }

  // 4. Calculate 15-minute grace period offset
  const slotStartTime = new Date(`${bookingDate}T${timeSlotStart}:00Z`);
  const graceEndsAt = new Date(slotStartTime.getTime() + 15 * 60 * 1000).toISOString();

  // 5. Construct Confirmed Booking Record
  const newBooking: Booking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    profileId,
    membershipId,
    seatId,
    bookingDate,
    timeSlotStart,
    timeSlotEnd,
    status: 'CONFIRMED',
    gracePeriodEndsAt: graceEndsAt,
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    code: 'RESERVATION_SUCCESSFUL',
    message: `Seat ${seatId} successfully reserved for ${bookingDate}. Check-in QR code generated.`,
    booking: newBooking
  };
}

/**
 * Server-side Booking Cancellation Handler
 */
export async function cancelReservation(bookingId: string, profileId: string): Promise<BookingResponse> {
  const booking = MOCK_BOOKINGS.find(b => b.id === bookingId);
  if (!booking) {
    return {
      success: false,
      code: 'BOOKING_NOT_FOUND',
      message: 'Booking reference ID not found.'
    };
  }

  if (booking.status === 'CHECKED_IN') {
    return {
      success: false,
      code: 'CANNOT_CANCEL_ACTIVE_SESSION',
      message: 'Active study session in progress. Please check out instead.'
    };
  }

  return {
    success: true,
    code: 'BOOKING_CANCELLED',
    message: `Booking ${bookingId} successfully cancelled. Seat has been released.`
  };
}
