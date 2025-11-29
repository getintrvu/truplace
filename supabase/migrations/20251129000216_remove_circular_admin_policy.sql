/*
  # Remove Circular Admin Policy

  ## Problem
  The "Admins can view all admin users" policy creates infinite recursion:
  - To check if user is admin, query admin_users
  - Policy asks: "Is this user in admin_users?"
  - To check that, it queries admin_users again
  - Infinite loop → 500 Internal Server Error

  ## Solution
  Remove the recursive policy entirely. The "Users can check their own admin status"
  policy is sufficient for authentication because the isAdmin() function only needs
  to check if the current user exists in admin_users table.

  ## Changes
  1. Drop the "Admins can view all admin users" policy (causes recursion)
  2. Keep only "Users can check their own admin status" policy (safe, no recursion)
  3. This allows each user to check if they are an admin without triggering infinite loops

  ## Note
  If admins need to view other admin users in the future, we'll need to implement
  this through a SECURITY DEFINER function or a separate approach that doesn't
  create circular dependencies.
*/

-- Drop the policy causing infinite recursion and 500 errors
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;

-- Verify the safe policy still exists (it should from previous migration)
-- This policy allows users to check their own admin status without recursion
-- Policy: "Users can check their own admin status"
-- USING (user_id = auth.uid())
