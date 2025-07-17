/*
  # Create therapist profiles table

  1. New Tables
    - `therapist_profiles`
      - `id` (uuid, primary key, references users.id)
      - `specialty` (text)
      - `license_number` (text)
      - `experience_years` (integer)
      - `session_rate` (decimal)
      - `location` (text)
      - `credentials` (text array)
      - `languages` (text array)
      - `verified` (boolean, default false)
      - `verification_documents` (jsonb)
      - `availability` (jsonb)
      - `total_sessions` (integer, default 0)
      - `rating` (decimal, default 0)
      - `review_count` (integer, default 0)

  2. Security
    - Enable RLS on `therapist_profiles` table
    - Add policies for therapists to manage their own profiles
    - Add policy for admins to manage all profiles
    - Add policy for clients to read verified therapist profiles
*/

-- Create therapist profiles table
CREATE TABLE IF NOT EXISTS therapist_profiles (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  specialty text,
  license_number text,
  experience_years integer,
  session_rate decimal(10,2) DEFAULT 120.00,
  location text DEFAULT 'Online',
  credentials text[] DEFAULT '{}',
  languages text[] DEFAULT '{"English"}',
  verified boolean DEFAULT false,
  verification_documents jsonb DEFAULT '{}',
  availability jsonb DEFAULT '{}',
  total_sessions integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0.0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE therapist_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Therapists can read own profile"
  ON therapist_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Therapists can update own profile"
  ON therapist_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Clients can read verified therapist profiles"
  ON therapist_profiles
  FOR SELECT
  TO authenticated
  USING (
    verified = true AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('client', 'admin')
    )
  );

CREATE POLICY "Admins can manage all therapist profiles"
  ON therapist_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS therapist_profiles_specialty_idx ON therapist_profiles(specialty);
CREATE INDEX IF NOT EXISTS therapist_profiles_verified_idx ON therapist_profiles(verified);
CREATE INDEX IF NOT EXISTS therapist_profiles_rating_idx ON therapist_profiles(rating);

-- Create updated_at trigger
CREATE TRIGGER update_therapist_profiles_updated_at
  BEFORE UPDATE ON therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();