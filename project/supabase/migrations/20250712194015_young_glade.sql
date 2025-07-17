/*
  # Create bookings table for therapy sessions

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references users.id)
      - `therapist_id` (uuid, references users.id)
      - `session_date` (date)
      - `session_time` (time)
      - `duration_minutes` (integer, default 50)
      - `session_type` (text)
      - `status` (enum: pending, confirmed, cancelled, completed)
      - `meeting_url` (text)
      - `meeting_id` (text)
      - `client_concerns` (text)
      - `preferred_contact` (enum: video, phone)
      - `payment_status` (enum: pending, paid, refunded)
      - `payment_reference` (text)
      - `amount` (decimal)
      - `notes` (text)

  2. Security
    - Enable RLS on `bookings` table
    - Add policies for clients and therapists to manage their bookings
    - Add policy for admins to manage all bookings
*/

-- Create enums
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE contact_preference AS ENUM ('video', 'phone');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  therapist_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_date date NOT NULL,
  session_time time NOT NULL,
  duration_minutes integer DEFAULT 50,
  session_type text NOT NULL,
  status booking_status DEFAULT 'pending',
  meeting_url text,
  meeting_id text,
  client_concerns text,
  preferred_contact contact_preference DEFAULT 'video',
  payment_status payment_status DEFAULT 'pending',
  payment_reference text,
  amount decimal(10,2),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Clients can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Therapists can read their bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = therapist_id);

CREATE POLICY "Clients can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Therapists can update their bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = therapist_id);

CREATE POLICY "Clients can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Admins can manage all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS bookings_client_id_idx ON bookings(client_id);
CREATE INDEX IF NOT EXISTS bookings_therapist_id_idx ON bookings(therapist_id);
CREATE INDEX IF NOT EXISTS bookings_session_date_idx ON bookings(session_date);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);

-- Create updated_at trigger
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();