-- ============================================================================
-- STUDYSPACE OS — DEVELOPMENT SEED DATA (seed.sql)
-- ============================================================================

-- Seed Branch
INSERT INTO branches (id, name, code, address, city, opening_time, closing_time)
VALUES ('a1b2c3d4-0000-0000-0000-000000000001', 'Central Study Space', 'BRANCH-01', '102 Connaught Place, Block B', 'New Delhi', '06:00:00', '24:00:00')
ON CONFLICT (code) DO NOTHING;

-- Seed Zones
INSERT INTO zones (id, branch_id, name, description, noise_level_db)
VALUES 
  ('b1b2c3d4-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', 'Silent Focus Zone', 'Strict quiet reading room with carpet dampening', 35),
  ('b1b2c3d4-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', 'Discussion Pods', 'Semi-private pods for peer learning', 45),
  ('b1b2c3d4-0000-0000-0000-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001', 'Window Desks', 'Natural lighting with city skyline view', 38)
ON CONFLICT DO NOTHING;

-- Seed Seats
INSERT INTO seats (id, zone_id, seat_number, type, current_status, has_power_outlet, has_window_view)
VALUES
  ('c1b2c3d4-0000-0000-0000-000000000001', 'b1b2c3d4-0000-0000-0000-000000000001', 'A-01', 'Ergonomic Desk', 'AVAILABLE', true, false),
  ('c1b2c3d4-0000-0000-0000-000000000002', 'b1b2c3d4-0000-0000-0000-000000000001', 'A-02', 'Ergonomic Desk', 'OCCUPIED', true, false),
  ('c1b2c3d4-0000-0000-0000-000000000003', 'b1b2c3d4-0000-0000-0000-000000000001', 'A-03', 'Ergonomic Desk', 'AVAILABLE', true, false),
  ('c1b2c3d4-0000-0000-0000-000000000004', 'b1b2c3d4-0000-0000-0000-000000000001', 'A-04', 'Ergonomic Desk', 'BLOCKED', false, false),
  ('c1b2c3d4-0000-0000-0000-000000000005', 'b1b2c3d4-0000-0000-0000-000000000003', 'C-01', 'Window Desk', 'AVAILABLE', true, true),
  ('c1b2c3d4-0000-0000-0000-000000000006', 'b1b2c3d4-0000-0000-0000-000000000003', 'C-02', 'Window Desk', 'AVAILABLE', true, true)
ON CONFLICT DO NOTHING;

-- Seed Plans
INSERT INTO plans (id, name, duration_days, price_inr, daily_slot_limit, advance_booking_days)
VALUES
  ('d1b2c3d4-0000-0000-0000-000000000001', 'Day Pass', 1, 299.00, 1, 1),
  ('d1b2c3d4-0000-0000-0000-000000000002', 'Weekly Flex', 7, 1499.00, 1, 3),
  ('d1b2c3d4-0000-0000-0000-000000000003', 'Monthly Pro', 30, 4999.00, 1, 7),
  ('d1b2c3d4-0000-0000-0000-000000000004', 'Monthly Reserved', 30, 6999.00, 1, 30)
ON CONFLICT DO NOTHING;
