/*
  # Fix Profile Loading Policies

  This migration fixes the "Failed to load user profile" error by ensuring proper RLS policies
  for profile loading during authentication.

  ## Changes Made
  1. Fix users table policies for profile loading
  2. Ensure therapist_profiles and client_profiles have proper read policies
  3. Add policies for authenticated users to read their own profile data
  4. Fix any policy conflicts that prevent profile loading
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Therapists can read own profile" ON therapist_profiles;
DROP POLICY IF EXISTS "Clients can read own profile" ON client_profiles;

-- Create proper policies for profile loading
CREATE POLICY "Authenticated users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Therapists can read own profile data"
  ON therapist_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Clients can read own profile data"
  ON client_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Ensure service role can read all data (for admin functions)
CREATE POLICY "Service role can read all users"
  ON users
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can read all therapist profiles"
  ON therapist_profiles
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can read all client profiles"
  ON client_profiles
  FOR SELECT
  TO service_role
  USING (true);

-- Add policies for anonymous users to read basic user info (needed for authentication)
CREATE POLICY "Anonymous can read users for auth"
  ON users
  FOR SELECT
  TO anon
  USING (true);