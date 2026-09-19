-- ============================================================================
-- STUDYSPACE OS — PRODUCTION DATABASE SCHEMA MIGRATION (01_schema.sql)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types Definition
CREATE TYPE user_role AS ENUM ('STUDENT', 'STAFF', 'ADMIN');
CREATE TYPE membership_status AS ENUM ('PENDING', 'ACTIVE', 'EXPIRING_SOON', 'EXPIRED', 'SUSPENDED', 'CANCELLED');
CREATE TYPE seat_status AS ENUM ('AVAILABLE', 'BOOKED', 'OCCUPIED', 'BLOCKED', 'MAINTENANCE');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW');
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');
CREATE TYPE payment_method AS ENUM ('RAZORPAY_ONLINE', 'CASH_OFFLINE', 'DESK_POS', 'BANK_TRANSFER');
CREATE TYPE call_status AS ENUM ('QUEUED', 'INITIATED', 'RINGING', 'ANSWERED', 'COMPLETED', 'BUSY', 'NO_ANSWER', 'FAILED');

-- 1. Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role user_role NOT NULL DEFAULT 'STUDENT',
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    avatar_url TEXT,
    kyc_verified BOOLEAN DEFAULT FALSE,
    kyc_document_url TEXT,
    emergency_contact VARCHAR(20),
    exam_goal VARCHAR(100),
    notification_preferences JSONB DEFAULT '{"whatsapp": true, "sms": true, "email": true, "voice": true}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Branches Table
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    opening_time TIME NOT NULL DEFAULT '06:00:00',
    closing_time TIME NOT NULL DEFAULT '24:00:00',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Zones Table
CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    noise_level_db INT DEFAULT 35,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Seats Table
CREATE TABLE seats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    seat_number VARCHAR(20) NOT NULL,
    type VARCHAR(50) DEFAULT 'Ergonomic Desk',
    current_status seat_status NOT NULL DEFAULT 'AVAILABLE',
    has_power_outlet BOOLEAN DEFAULT TRUE,
    has_window_view BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (zone_id, seat_number)
);

-- 5. Membership Plans Table
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    duration_days INT NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL,
    daily_slot_limit INT DEFAULT 1,
    advance_booking_days INT DEFAULT 7,
    allowed_zones JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Memberships Table
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    status membership_status NOT NULL DEFAULT 'PENDING',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bookings Table (Core Isolation & Concurrency Table)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    membership_id UUID NOT NULL REFERENCES memberships(id),
    seat_id UUID NOT NULL REFERENCES seats(id),
    booking_date DATE NOT NULL,
    time_slot_start TIME NOT NULL,
    time_slot_end TIME NOT NULL,
    status booking_status NOT NULL DEFAULT 'CONFIRMED',
    grace_period_ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Strictly prevent double-booking the same seat, date, and starting time slot
    UNIQUE (seat_id, booking_date, time_slot_start)
);

-- Index for instant availability queries
CREATE INDEX idx_bookings_date_status ON bookings (booking_date, status);
CREATE INDEX idx_bookings_seat_date ON bookings (seat_id, booking_date);

-- 8. QR Tokens Table (Dynamic Cryptographic Tokens)
CREATE TABLE qr_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    nonce VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qr_tokens_nonce ON qr_tokens (nonce);

-- 9. Attendance Table
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id),
    check_in_time TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT,
    verification_method VARCHAR(50) DEFAULT 'DYNAMIC_QR',
    is_manual_correction BOOLEAN DEFAULT FALSE,
    corrected_by_profile_id UUID REFERENCES profiles(id),
    correction_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id),
    membership_id UUID REFERENCES memberships(id),
    gateway_order_id VARCHAR(100) UNIQUE,
    gateway_payment_id VARCHAR(100) UNIQUE,
    idempotency_key VARCHAR(100) UNIQUE NOT NULL,
    amount_inr NUMERIC(10, 2) NOT NULL,
    method payment_method NOT NULL DEFAULT 'RAZORPAY_ONLINE',
    status payment_status NOT NULL DEFAULT 'PENDING',
    gst_invoice_number VARCHAR(50) UNIQUE,
    invoice_pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Waitlist Table
CREATE TABLE waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id),
    zone_id UUID REFERENCES zones(id),
    requested_date DATE NOT NULL,
    time_slot_start TIME NOT NULL,
    priority_score INT DEFAULT 10,
    offer_sent_at TIMESTAMP WITH TIME ZONE,
    offer_expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'WAITING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Call Jobs Table (Automated Outbound Voice Campaigns)
CREATE TABLE call_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id),
    membership_id UUID REFERENCES memberships(id),
    reason TEXT NOT NULL,
    status call_status NOT NULL DEFAULT 'QUEUED',
    attempt_count INT DEFAULT 0,
    max_attempts INT DEFAULT 2,
    provider_call_id VARCHAR(100),
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE,
    result_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Audit Logs Table (Immutable Action History)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL REFERENCES profiles(id),
    actor_role user_role NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    old_value JSONB,
    new_value JSONB,
    reason TEXT,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
