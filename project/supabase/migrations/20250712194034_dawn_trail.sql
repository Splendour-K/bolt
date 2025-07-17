/*
  # Insert sample data for testing

  1. Sample Users
    - Super admin account
    - Demo therapist account
    - Demo client accounts
    - Additional test users

  2. Sample Profiles
    - Therapist profiles with credentials
    - Client profiles with goals

  3. Sample Bookings
    - Various booking statuses
    - Different session types

  4. Sample Notifications
    - Different notification types
    - Various priorities
*/

-- Insert sample users (passwords are hashed versions of the plaintext passwords)
-- Note: In production, use proper password hashing like bcrypt
INSERT INTO users (id, email, password_hash, first_name, last_name, role, phone, bio, profile_complete) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@lanspeech.com', '$2b$10$hash_for_admin123', 'Super', 'Admin', 'admin', '+1-800-LANSPEECH', 'Platform administrator', true),
  ('00000000-0000-0000-0000-000000000002', 'therapist@demo.com', '$2b$10$hash_for_demo123', 'Dr. Sarah', 'Chen', 'therapist', '+1-555-0102', 'Specializes in working with adults and teens who stutter. Uses evidence-based techniques including fluency shaping and stuttering modification.', true),
  ('00000000-0000-0000-0000-000000000003', 'client@demo.com', '$2b$10$hash_for_demo123', 'Alex', 'Thompson', 'client', '+1-555-0103', 'Working on building confidence for workplace presentations and public speaking.', true),
  ('00000000-0000-0000-0000-000000000004', 'alex.thompson@email.com', '$2b$10$hash_for_password123', 'Alex', 'Thompson', 'client', '+1-555-0104', 'Software engineer looking to improve presentation skills', true),
  ('00000000-0000-0000-0000-000000000005', 'dr.sarah.chen@email.com', '$2b$10$hash_for_password123', 'Dr. Sarah', 'Chen', 'therapist', '+1-555-0105', 'Experienced speech-language pathologist', true),
  ('00000000-0000-0000-0000-000000000006', 'maria.santos@email.com', '$2b$10$hash_for_password123', 'Maria', 'Santos', 'client', '+1-555-0106', 'New to the platform, working on phone call confidence', true),
  ('00000000-0000-0000-0000-000000000007', 'dr.michael.rodriguez@email.com', '$2b$10$hash_for_password123', 'Dr. Michael', 'Rodriguez', 'therapist', '+1-555-0107', 'Specializes in public speaking anxiety', false),
  ('00000000-0000-0000-0000-000000000008', 'david.kim@email.com', '$2b$10$hash_for_password123', 'David', 'Kim', 'client', '+1-555-0108', 'Preparing for conference presentations', true);

-- Insert therapist profiles
INSERT INTO therapist_profiles (id, specialty, license_number, experience_years, session_rate, location, credentials, languages, verified, total_sessions, rating, review_count) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Stuttering & Fluency', 'SLP-12345-CA', 12, 120.00, 'Online & NYC', '{"CCC-SLP", "Board Certified Fluency Specialist"}', '{"English", "Mandarin"}', true, 156, 4.9, 127),
  ('00000000-0000-0000-0000-000000000005', 'Stuttering & Fluency', 'SLP-67890-CA', 12, 120.00, 'Online & San Francisco', '{"CCC-SLP", "Board Certified Fluency Specialist"}', '{"English", "Mandarin"}', true, 156, 4.9, 127),
  ('00000000-0000-0000-0000-000000000007', 'Public Speaking Anxiety', 'SLP-54321-TX', 8, 110.00, 'Online & Austin', '{"CCC-SLP", "CBT Certified"}', '{"English", "Spanish"}', false, 0, 0.0, 0);

-- Insert client profiles
INSERT INTO client_profiles (id, goals, practice_streak, total_practice_minutes, total_sessions, improvement_score, last_practice_date) VALUES
  ('00000000-0000-0000-0000-000000000003', '{"Improve presentation skills", "Reduce speaking anxiety", "Build confidence"}', 12, 127, 8, 78.5, '2025-01-19'),
  ('00000000-0000-0000-0000-000000000004', '{"Phone call confidence", "Job interview skills"}', 8, 95, 3, 65.2, '2025-01-18'),
  ('00000000-0000-0000-0000-000000000006', '{"Phone call confidence", "Workplace communication"}', 2, 25, 0, 45.0, '2025-01-17'),
  ('00000000-0000-0000-0000-000000000008', '{"Conference presentations", "Public speaking"}', 15, 180, 7, 82.3, '2025-01-19');

-- Insert sample bookings
INSERT INTO bookings (id, client_id, therapist_id, session_date, session_time, session_type, status, meeting_url, client_concerns, preferred_contact, payment_status, amount) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', '2025-01-20', '10:00:00', 'Follow-up Session', 'confirmed', 'https://meet.google.com/abc-defg-hij', 'Working on presentation skills for upcoming work presentation', 'video', 'paid', 120.00),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', '2025-01-20', '14:00:00', 'Initial Assessment', 'confirmed', 'https://meet.google.com/xyz-uvwx-rst', 'Struggling with phone calls at work, wants to build confidence', 'video', 'paid', 120.00),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000002', '2025-01-21', '11:00:00', 'Intensive Workshop', 'pending', 'https://meet.google.com/lmn-opqr-stu', 'Preparing for conference presentation next month', 'video', 'pending', 120.00);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, priority, action_url) VALUES
  ('00000000-0000-0000-0000-000000000002', 'booking', 'New Booking Request', 'Maria Santos has requested an Initial Assessment session', 'high', '/therapist-dashboard'),
  ('00000000-0000-0000-0000-000000000002', 'progress', 'Client Progress Update', 'Alex Thompson completed a 15-minute practice session', 'medium', '/therapist-dashboard'),
  ('00000000-0000-0000-0000-000000000003', 'booking', 'Session Confirmed', 'Your session with Dr. Sarah Chen is confirmed for tomorrow at 2:00 PM', 'high', '/profile'),
  ('00000000-0000-0000-0000-000000000003', 'reminder', 'Practice Reminder', 'You haven''t practiced today. Start a quick 5-minute session?', 'low', '/practice'),
  ('00000000-0000-0000-0000-000000000006', 'booking', 'Session Confirmed', 'Your session with Dr. Sarah Chen is confirmed for Monday at 2:00 PM', 'high', '/profile'),
  ('00000000-0000-0000-0000-000000000008', 'reminder', 'Upcoming Session', 'You have a session with Dr. Sarah Chen tomorrow at 11:00 AM', 'medium', '/profile');