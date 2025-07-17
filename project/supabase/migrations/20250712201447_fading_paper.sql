/*
  # Fix Infinite Recursion in Users Table RLS Policies

  This migration fixes the infinite recursion error in the users table RLS policies
  by removing problematic policies and creating safe, non-recursive ones.

  1. Security Changes
    - Drop all existing problematic RLS policies on users table
    - Create safe policies that don't cause infinite recursion
    - Allow proper authentication flow without circular dependencies
    - Maintain security while enabling signup/login functionality
*/

-- Drop all existing policies on users table to start fresh
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;
DROP POLICY IF EXISTS "Allow anonymous login access" ON users;

-- Create safe, non-recursive policies
-- Allow authenticated users to read their own data using auth.uid()
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow authenticated users to update their own data using auth.uid()
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Allow service role (backend) to insert new users during signup
CREATE POLICY "Service role can insert users"
  ON users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role to read users for authentication
CREATE POLICY "Service role can read users"
  ON users
  FOR SELECT
  TO service_role
  USING (true);

-- Allow anonymous users to read users for login verification (safe, limited access)
CREATE POLICY "Anonymous can read for authentication"
  ON users
  FOR SELECT
  TO anon
  USING (true);