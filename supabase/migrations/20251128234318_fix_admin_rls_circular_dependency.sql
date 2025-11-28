/*
  # Fix Admin RLS Circular Dependency

  ## Problem
  The current RLS policy on `admin_users` creates a circular dependency:
  - To check if you're an admin, you need to query `admin_users`
  - But the policy requires you to already be an admin to query `admin_users`
  - Result: First-time authentication fails with "Access Denied"

  ## Solution
  Replace the circular policy with a simpler one that allows any authenticated
  user to check if they themselves are an admin by querying their own record.

  ## Changes
  1. Drop the existing circular "Admins can view admin users" policy
  2. Create a new policy allowing users to view their own admin record
  3. Create a separate policy allowing existing admins to view all admin records
*/

-- Drop the problematic circular dependency policy
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Allow any authenticated user to check if they are an admin (view their own record)
CREATE POLICY "Users can check their own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Allow existing admins to view all admin records
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
