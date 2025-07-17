/*
  # Fix RLS Policy for User Signup

  This migration fixes the Row Level Security policy that prevents new users from being inserted
  into the users table during signup. The issue occurs because authenticated users need permission
  to insert their own profile data after Supabase Auth creates their account.

  ## Changes Made
  1. Drop existing problematic policies that may conflict
  2. Create proper INSERT policy for authenticated users
  3. Ensure users can only insert their own profile data using auth.uid()
  4. Maintain security by preventing users from inserting data for other users

  ## Security
  - Users can only insert records where the id matches their auth.uid()
  - Prevents unauthorized data insertion
  - Maintains data integrity and user isolation
*/

-- Drop any existing conflicting policies
DROP POLICY IF EXISTS "Service role can insert users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own user profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create the correct INSERT policy for authenticated users
CREATE POLICY "Allow authenticated users to insert their own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the users table has RLS enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;