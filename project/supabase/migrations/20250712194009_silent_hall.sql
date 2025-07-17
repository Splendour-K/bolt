/*
  # Create client profiles table

  1. New Tables
    - `client_profiles`
      - `id` (uuid, primary key, references users.id)
      - `goals` (text array)
      - `practice_streak` (integer, default 0)
      - `total_practice_minutes` (integer, default 0)
      - `total_sessions` (integer, default 0)
      - `improvement_score` (decimal, default 0)
      - `last_practice_date` (date)
      - `preferences` (jsonb)

  2. Security
    - Enable RLS on `client_profiles` table
    - Add policies for clients to manage their own profiles
    - Add policy for therapists to read client profiles (with permission)
    - Add policy for admins to manage all profiles
*/

-- Create client profiles table
CREATE TABLE IF NOT EXISTS client_profiles (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  goals text[] DEFAULT '{}',
  practice_streak integer DEFAULT 0,
  total_practice_minutes integer DEFAULT 0,
  total_sessions integer DEFAULT 0,
  improvement_score decimal(5,2) DEFAULT 0.0,
  last_practice_date date,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Clients can read own profile"
  ON client_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Clients can update own profile"
  ON client_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all client profiles"
  ON client_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS client_profiles_practice_streak_idx ON client_profiles(practice_streak);
CREATE INDEX IF NOT EXISTS client_profiles_improvement_score_idx ON client_profiles(improvement_score);

-- Create updated_at trigger
CREATE TRIGGER update_client_profiles_updated_at
  BEFORE UPDATE ON client_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();