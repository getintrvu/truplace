/*
  # Fix Security Issues

  1. Performance Improvements
    - Add index on `admin_users.created_by` foreign key
    - Add index on `companies.request_id` foreign key
    - Drop unused index `idx_reviews_company_id`

  2. Security Improvements
    - Fix RLS policy on `admin_users` to use `(select auth.uid())` for better performance
    - Recreate `company_stats` view without SECURITY DEFINER

  3. Notes
    - Leaked password protection must be enabled manually in Supabase Dashboard
    - Go to Authentication > Policies > Password Policy > Enable "Check for breached passwords"
*/

-- Add missing indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_admin_users_created_by ON admin_users(created_by);
CREATE INDEX IF NOT EXISTS idx_companies_request_id ON companies(request_id);

-- Drop unused index
DROP INDEX IF EXISTS idx_reviews_company_id;

-- Fix RLS policy on admin_users to use (select auth.uid()) for better performance
DROP POLICY IF EXISTS "Users can check their own admin status" ON admin_users;

CREATE POLICY "Users can check their own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Recreate company_stats view without SECURITY DEFINER
DROP VIEW IF EXISTS company_stats;

CREATE VIEW company_stats AS
SELECT 
  c.id,
  c.name,
  c.industry,
  c.size,
  c.logo_url,
  c.created_at,
  c.updated_at,
  COALESCE(AVG(r.overall_rating), 0) as overall_rating,
  COUNT(r.id) as review_count,
  COALESCE(
    (COUNT(CASE WHEN r.recommendation = 'highly-recommend' THEN 1 END)::float / 
    NULLIF(COUNT(r.id), 0) * 100), 
    0
  ) as recommendation_rate,
  jsonb_build_object(
    'compensation', COALESCE(AVG((r.dimensions->>'compensation')::numeric), 0),
    'management', COALESCE(AVG((r.dimensions->>'management')::numeric), 0),
    'culture', COALESCE(AVG((r.dimensions->>'culture')::numeric), 0),
    'career', COALESCE(AVG((r.dimensions->>'career')::numeric), 0),
    'recognition', COALESCE(AVG((r.dimensions->>'recognition')::numeric), 0),
    'environment', COALESCE(AVG((r.dimensions->>'environment')::numeric), 0),
    'worklife', COALESCE(AVG((r.dimensions->>'worklife')::numeric), 0),
    'cooperation', COALESCE(AVG((r.dimensions->>'cooperation')::numeric), 0),
    'business_health', COALESCE(AVG((r.dimensions->>'business_health')::numeric), 0)
  ) as dimensions
FROM companies c
LEFT JOIN reviews r ON c.id = r.company_id
GROUP BY c.id, c.name, c.industry, c.size, c.logo_url, c.created_at, c.updated_at;
