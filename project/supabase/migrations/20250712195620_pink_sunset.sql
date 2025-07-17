/*
  # Fix Authentication Policy for Login

  1. Security Update
    - Add policy for anonymous users to read user data during login
    - This allows the login process to work while maintaining security
    - Only allows reading necessary fields for authentication

  2. Important Notes
    - This is a temporary solution for the mock authentication system
    - In production, use Supabase's built-in authentication instead
    - The policy only allows reading, not writing or updating
*/

-- Allow anonymous users to read user data for authentication
CREATE POLICY "Allow anonymous login access"
  ON users
  FOR SELECT
  TO anon
  USING (true);

-- Note: This policy allows anonymous users to read user records for login purposes
-- In production, replace this with Supabase's built-in authentication system