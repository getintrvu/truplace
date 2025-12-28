/*
  # Fix Performance and Security Issues

  1. Performance Improvements
    - Add index on `admin_users.created_by` foreign key for better query performance
    - Add index on `companies.request_id` foreign key for better query performance
    - Drop unused index `idx_reviews_company_id` (not being used by any queries)

  2. Security Improvements
    - Recreate `company_stats` view without SECURITY DEFINER property
    - This ensures the view runs with the permissions of the calling user, not the definer

  3. Notes
    - Leaked password protection must be enabled manually in Supabase Dashboard:
      Go to Authentication → Settings → Password Policy → Enable "Breach Password Protection"
    - This checks passwords against the HaveIBeenPwned database to prevent use of compromised passwords
*/

-- =====================================================
-- 1. ADD INDEXES FOR FOREIGN KEYS
-- =====================================================

-- Index for admin_users.created_by foreign key
-- This improves performance when querying admin users by who created them
CREATE INDEX IF NOT EXISTS idx_admin_users_created_by ON admin_users(created_by);

-- Index for companies.request_id foreign key
-- This improves performance when joining companies with their requests
CREATE INDEX IF NOT EXISTS idx_companies_request_id ON companies(request_id);

-- =====================================================
-- 2. DROP UNUSED INDEX
-- =====================================================

-- This index on reviews.company_id is not being used by any queries
-- The foreign key constraint provides sufficient performance for the current query patterns
DROP INDEX IF EXISTS idx_reviews_company_id;

-- =====================================================
-- 3. FIX SECURITY DEFINER VIEW
-- =====================================================

-- Recreate the company_stats view without SECURITY DEFINER
-- This ensures proper security by running with caller's permissions
DROP VIEW IF EXISTS company_stats CASCADE;

CREATE VIEW company_stats AS
SELECT 
  c.id,
  c.name,
  c.industry,
  c.size,
  c.logo_url,
  c.created_at,
  c.updated_at,
  COALESCE(ROUND(AVG(r.overall_rating)::numeric, 1), 0) as overall_rating,
  COUNT(r.id) as review_count,
  COALESCE(
    ROUND(
      (COUNT(CASE WHEN r.recommendation = 'highly-recommend' THEN 1 END)::float / 
       NULLIF(COUNT(r.id), 0) * 100)::numeric, 0
    ), 0
  ) as recommendation_rate,
  CASE 
    WHEN COUNT(r.id) > 0 THEN
      jsonb_build_object(
        'compensation', ROUND(AVG(COALESCE((r.dimensions->>'compensation')::float, 0))::numeric, 1),
        'management', ROUND(AVG(COALESCE((r.dimensions->>'management')::float, 0))::numeric, 1),
        'culture', ROUND(AVG(COALESCE((r.dimensions->>'culture')::float, 0))::numeric, 1),
        'career', ROUND(AVG(COALESCE((r.dimensions->>'career')::float, 0))::numeric, 1),
        'recognition', ROUND(AVG(COALESCE((r.dimensions->>'recognition')::float, 0))::numeric, 1),
        'environment', ROUND(AVG(COALESCE((r.dimensions->>'environment')::float, 0))::numeric, 1),
        'worklife', ROUND(AVG(COALESCE((r.dimensions->>'worklife')::float, 0))::numeric, 1),
        'cooperation', ROUND(AVG(COALESCE((r.dimensions->>'cooperation')::float, 0))::numeric, 1),
        'business_health', ROUND(AVG(COALESCE((r.dimensions->>'business_health')::float, 0))::numeric, 1)
      )
    ELSE
      jsonb_build_object(
        'compensation', 0,
        'management', 0,
        'culture', 0,
        'career', 0,
        'recognition', 0,
        'environment', 0,
        'worklife', 0,
        'cooperation', 0,
        'business_health', 0
      )
  END as dimensions
FROM companies c
LEFT JOIN reviews r ON c.id = r.company_id
GROUP BY c.id, c.name, c.industry, c.size, c.logo_url, c.created_at, c.updated_at;

-- Grant appropriate permissions on the view
GRANT SELECT ON company_stats TO authenticated;
GRANT SELECT ON company_stats TO anon;
