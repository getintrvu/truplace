/*
  # Fix Company Stats View - Default Dimension Values

  1. Changes
    - Update company_stats view to return complete dimension object with default values
    - Instead of returning empty JSONB object '{}', return all 9 dimensions set to 0
    - This prevents undefined property access errors in the frontend
  
  2. Impact
    - Companies with no reviews will show 0.0 for all dimensions instead of causing errors
    - Frontend code can safely access dimension properties without null checks
    - Improves user experience by preventing blank screen crashes
*/

-- Drop and recreate the company_stats view with proper default dimension values
CREATE OR REPLACE VIEW company_stats AS
SELECT 
  c.id,
  c.name,
  c.industry,
  c.size,
  c.logo_url,
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
  END as dimensions,
  c.created_at,
  c.updated_at
FROM companies c
LEFT JOIN reviews r ON c.id = r.company_id
GROUP BY c.id, c.name, c.industry, c.size, c.logo_url, c.created_at, c.updated_at;
