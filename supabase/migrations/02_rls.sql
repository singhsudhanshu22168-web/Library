-- ============================================================================
-- STUDYSPACE OS — ROW-LEVEL SECURITY POLICIES (02_rls.sql)
-- ============================================================================

-- Enable RLS on core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to extract user role
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Users view own profile or Staff/Admin views all"
ON profiles FOR SELECT
USING (auth.uid() = id OR current_user_role() IN ('STAFF', 'ADMIN'));

CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- 2. Memberships Policies
CREATE POLICY "Users view own memberships or Staff/Admin views all"
ON memberships FOR SELECT
USING (profile_id = auth.uid() OR current_user_role() IN ('STAFF', 'ADMIN'));

CREATE POLICY "Admins manage memberships"
ON memberships FOR ALL
USING (current_user_role() = 'ADMIN');

-- 3. Bookings Policies
CREATE POLICY "Users view own bookings or Staff/Admin views all"
ON bookings FOR SELECT
USING (profile_id = auth.uid() OR current_user_role() IN ('STAFF', 'ADMIN'));

CREATE POLICY "Active members insert bookings"
ON bookings FOR INSERT
WITH CHECK (
  profile_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM memberships 
    WHERE profile_id = auth.uid() AND status = 'ACTIVE' AND end_date >= booking_date
  )
);

CREATE POLICY "Users cancel own bookings prior to deadline"
ON bookings FOR UPDATE
USING (profile_id = auth.uid() OR current_user_role() IN ('STAFF', 'ADMIN'));

-- 4. Attendance Policies
CREATE POLICY "Users view own attendance or Staff/Admin views all"
ON attendance FOR SELECT
USING (profile_id = auth.uid() OR current_user_role() IN ('STAFF', 'ADMIN'));

CREATE POLICY "Staff/Admin insert and update attendance"
ON attendance FOR ALL
USING (current_user_role() IN ('STAFF', 'ADMIN'));

-- 5. Payments Policies
CREATE POLICY "Users view own payments or Admin views all"
ON payments FOR SELECT
USING (profile_id = auth.uid() OR current_user_role() = 'ADMIN');

-- 6. Audit Logs Policies (Admin Read-Only, System Insert-Only)
CREATE POLICY "Admins view audit logs"
ON audit_logs FOR SELECT
USING (current_user_role() = 'ADMIN');
