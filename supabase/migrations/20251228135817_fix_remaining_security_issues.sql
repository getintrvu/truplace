/*
  # Fix Remaining Security Issues

  1. Performance Improvements
    - Add index on `reviews.company_id` foreign key for better query performance
    - Drop unused indexes: `idx_admin_users_created_by` and `idx_companies_request_id`

  2. Security Improvements
    - Properly recreate `company_stats` view without SECURITY DEFINER property
    - Use explicit DROP and CREATE (not CREATE OR REPLACE) to ensure clean recreation

  3. Notes
    - Leaked password protection must be enabled manually in Supabase Dashboard
    - Go to Authentication > Policies > Password Policy > Enable "Check for breached passwords"
*/

-- =====================================================
-- 1. ADD MISSING INDEX FOR REVIEWS.COMPANY_ID
-- =====================================================

-- This foreign key is heavily used in joins and should be indexed
CREATE INDEX IF NOT EXISTS idx_reviews_company_id ON reviews(company_id);

-- =====================================================
-- 2. DROP UNUSED INDEXES
-- =====================================================

-- These indexes were created but are not being used by any queries
DROP INDEX IF EXISTS idx_admin_users_created_by;
DROP INDEX IF EXISTS idx_companies_request_id;

-- =====================================================
-- 3. FIX SECURITY DEFINER VIEW
-- =====================================================

-- Drop the view completely and recreate it without any SECURITY DEFINER property
-- Using DROP then CREATE (not CREATE OR REPLACE) ensures clean recreation
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
