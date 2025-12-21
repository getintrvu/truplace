# Truplace - Product Requirements Document (PRD)

**Version:** 1.0
**Last Updated:** December 21, 2025
**Status:** In Production

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision & Goals](#product-vision--goals)
3. [Target Users](#target-users)
4. [Core Features](#core-features)
5. [User Journeys](#user-journeys)
6. [Technical Architecture](#technical-architecture)
7. [Data Models](#data-models)
8. [Security & Privacy](#security--privacy)
9. [Success Metrics](#success-metrics)
10. [Future Roadmap](#future-roadmap)

---

## Executive Summary

### Product Overview

**Truplace** is a comprehensive workplace review platform that empowers professionals to share anonymous, authentic reviews about their employers. The platform creates transparency in the job market by allowing current and former employees to rate companies across 9 key dimensions, helping job seekers make informed career decisions.

### Core Value Proposition

**"Anonymous Reviews. Real Insights."**

Truplace bridges the information gap between job seekers and employers by providing:
- 100% anonymous reviews with verified authenticity
- 9-dimensional rating system beyond single scores
- Community-driven company database expansion
- Transparent insights into company culture, management, and work environment

### Key Differentiators

1. **Comprehensive Rating System** - 9 dimensions vs. single overall score
2. **True Anonymity** - Complete privacy with email verification
3. **Verified Authenticity** - Email verification prevents spam without restricting access
4. **User-Driven Database** - Community can request new companies
5. **Clean, Modern UI** - Professional, production-ready design
6. **Open Database** - No paywalls for basic features

---

## Product Vision & Goals

### Vision Statement

To become the most trusted and comprehensive workplace review platform that empowers job seekers with authentic, multi-dimensional insights into company culture, management, and work environment.

### Product Goals

1. **Transparency** - Provide honest, unfiltered workplace insights
2. **Anonymity** - Protect reviewer identity while ensuring authenticity
3. **Comprehensiveness** - Cover all aspects of workplace experience through 9 dimensions
4. **Accessibility** - Free access to all reviews and company information
5. **Community Growth** - Enable users to expand the company database organically
6. **Data Quality** - Maintain high-quality, verified reviews

### Success Criteria

- 1,000+ companies in database within 6 months
- 10,000+ verified reviews within first year
- 80%+ user satisfaction with review comprehensiveness
- <5% duplicate company requests
- 90%+ of company requests processed within 48 hours

---

## Target Users

### Primary User Personas

#### 1. Job Seekers
**Description:** Professionals researching potential employers before accepting offers

**Needs:**
- Authentic workplace insights
- Detailed information beyond job descriptions
- Comparison across multiple companies
- Understanding of company culture and management

**Behaviors:**
- Browse multiple company profiles
- Read reviews across all dimensions
- Filter by industry and company size
- Make informed career decisions

---

#### 2. Current Employees
**Description:** Workers wanting to share workplace experiences anonymously

**Needs:**
- Safe platform for honest feedback
- Complete anonymity protection
- Easy review submission process
- Contribution to community knowledge

**Behaviors:**
- Submit reviews for current/former employers
- Provide detailed feedback across dimensions
- Share advice with fellow professionals
- Request companies not in database

---

#### 3. Career Switchers
**Description:** Individuals comparing companies and industries

**Needs:**
- Cross-company comparisons
- Industry-specific insights
- Understanding of work culture differences
- Career growth opportunities

**Behaviors:**
- Filter by multiple industries
- Compare ratings across companies
- Read dimensional breakdowns
- Evaluate work-life balance metrics

---

### Secondary User Personas

#### 4. HR Professionals
**Description:** Teams seeking competitive intelligence and employer branding insights

**Use Cases:**
- Monitor company reputation
- Understand employee sentiment
- Benchmark against competitors
- Identify improvement areas

---

#### 5. Recruiters
**Description:** Understanding candidate concerns about specific employers

**Use Cases:**
- Address candidate questions proactively
- Understand why candidates decline offers
- Provide honest workplace information
- Build trust with candidates

---

### System User Personas

#### 6. Platform Administrators
**Description:** Team members who manage content and user requests

**Responsibilities:**
- Review and approve company addition requests
- Moderate content quality
- Manage company information
- Respond to user inquiries
- Monitor platform health

**Access Levels:**
- Admin: Standard administrative access
- Moderator: Content moderation (future)
- Super Admin: Full system access + admin management

---

## Core Features

### 1. Anonymous Review System

#### Overview
Secure, authenticated, but fully anonymous review submission system that protects user identity while ensuring authenticity.

#### Key Capabilities

**Authentication:**
- Passwordless magic link authentication
- Email verification required
- Session-based access control
- No personal information stored with reviews

**Anonymity Protection:**
- Reviews linked to user IDs internally only
- No public association with user accounts
- Complete privacy from employers
- No username or profile display

**Review Constraints:**
- One review per user per company (enforced)
- All dimensional ratings required
- Optional text feedback (max 500 characters per dimension)
- Overall recommendation required

---

### 2. Nine-Dimensional Rating System

#### Dimensional Breakdown

Each review evaluates companies across 9 critical dimensions (1-5 star rating each):

**1. Compensation & Benefits**
- Salary competitiveness
- Bonus structure
- Health insurance
- Retirement benefits
- Additional perks

**2. Management Quality**
- Leadership effectiveness
- Managerial support
- Communication clarity
- Decision-making transparency
- Management accessibility

**3. Culture, Values & Inclusion**
- Company values alignment
- Diversity and inclusion
- Cultural fit
- Ethical practices
- Community involvement

**4. Career Opportunities & Development**
- Growth potential
- Learning opportunities
- Skill development
- Promotion paths
- Career advancement support

**5. Recognition & Appreciation**
- Acknowledgment of contributions
- Reward systems
- Performance feedback
- Public recognition
- Achievement celebration

**6. Working Environment**
- Office space quality
- Tools and equipment
- Remote work options
- Physical workspace
- Technology infrastructure

**7. Work-Life Balance**
- Flexible hours
- Vacation policy
- Overtime expectations
- Stress levels
- Time off respect

**8. Cooperation & Relationships**
- Teamwork quality
- Colleague relationships
- Cross-functional collaboration
- Team dynamics
- Social atmosphere

**9. Business Health & Outlook**
- Company stability
- Financial health
- Future prospects
- Industry position
- Growth trajectory

#### Rating Display

**Company Profile Shows:**
- Overall average rating (1-5 stars)
- Average for each dimension
- Visual charts and graphs
- Rating distribution histograms
- Comparison tables
- Trend analysis over time

---

### 3. Comprehensive Company Search & Discovery

#### Search Capabilities

**Global Search:**
- Real-time search with auto-suggestions
- Search by company name
- Instant results display
- "No results" handling with suggestion to request

**Browse All Companies:**
- Paginated grid view
- Responsive cards with key metrics
- Lazy loading for performance
- Mobile-optimized layout

#### Filtering System

**Filter By:**
- Industry (11 categories)
  - Technology
  - Finance
  - Healthcare
  - Consulting
  - E-commerce
  - Entertainment
  - Automotive
  - Retail
  - Food & Beverage
  - Education
  - Media/Government/Non-profit/Other

- Company Size (4 ranges)
  - 1-50 employees (Startup/Small)
  - 51-200 employees (Medium)
  - 201-1000 employees (Large)
  - 1000+ employees (Enterprise)

**Sort By:**
- Most Reviewed
- Highest Rated
- Alphabetical (A-Z)
- Recently Updated

#### Popular Companies Section

**Features:**
- Homepage showcase
- Top 6 most-reviewed companies
- Quick access cards
- Visual appeal for discovery

---

### 4. Detailed Company Profiles

#### Profile Components

**Header Section:**
- Company name and logo
- Industry and size
- Overall rating with stars
- Total review count
- Recommendation rate percentage

**Statistics Dashboard:**
- Visual charts (Recharts integration)
- Pie chart: Recommendation distribution
  - Highly Recommend (green)
  - Maybe (yellow)
  - Not Recommended (red)
- Bar charts: Dimensional ratings
- Rating distribution histogram
- Comparison tables

**Reviews Section:**
- Individual review cards
- Anonymous reviewer display
- Role/department (if provided)
- Quarter/year timestamp
- All 9 dimensional ratings
- Text feedback for each dimension
- Overall recommendation badge
- "Advice for friends" section
- Helpful count (future voting)

**Filter & Sort Reviews:**
- Filter by rating (1-5 stars)
- Filter by recommendation type
- Sort by:
  - Most Recent
  - Rating (High to Low)
  - Rating (Low to High)
  - Most Helpful (future)

---

### 5. Review Submission Flow

#### Multi-Step Process

**Step 1: Company Selection**
- Search for company
- Select from dropdown
- Clear visual feedback
- "Company not found?" link to request

**Step 2: Company Information**
- Auto-populated industry and size
- Editable if incorrect
- Visual confirmation

**Step 3: Role Entry**
- Job title/department input
- Optional but recommended
- Character limit: 100

**Step 4: Dimensional Ratings**
- 9 star rating inputs
- Expandable text feedback (optional)
- Character counter (500 max per dimension)
- Visual validation of completion
- Clear labels and descriptions

**Step 5: Overall Recommendation**
- Three-option selector:
  - ✅ Highly Recommend
  - 🤔 Maybe
  - ❌ Not Recommended
- Required field
- Visual selection state

**Step 6: Friend Advice**
- Optional text area
- "What would you tell a friend considering this company?"
- Character counter (500 max)
- Placeholder guidance

**Step 7: Review Preview**
- Modal overlay
- Full review display as it will appear
- Edit option returns to form
- Confirmation button

**Step 8: Submission**
- Loading state during save
- Success message
- Auto-redirect to company profile
- Toast notification

#### Advanced Form Features

**Progress Tracking:**
- Visual progress bar
- Step indicators
- Percentage completion

**Auto-Save:**
- Saves to localStorage every 2 seconds
- "Saving..." indicator
- Prevents data loss on accidental navigation
- Restores on return

**Validation:**
- Real-time field validation
- Clear error messages
- Disabled submit until complete
- Visual feedback for errors

**User Experience:**
- Smooth scrolling between sections
- Keyboard navigation support
- Mobile-optimized inputs
- Responsive layout

---

### 6. Company Request System

#### Request Workflow

**Step 1: Access**
- Available from navigation menu
- "Can't find your company?" prompts
- Search page suggests requesting

**Step 2: Authentication Check**
- Verify user is logged in
- If not, show email verification modal
- Magic link sent to email
- Session established on click

**Step 3: Request Form**

**Required Fields:**
- Company Name (2-100 characters)
- Company Website (URL format, auto-https)
- Industry (dropdown selection)
- Email Domains (array, comma-separated)
- Company Size (radio selection)

**Optional Fields:**
- Company Description (500 characters max)
- Reason for Addition (300 characters max)

**Smart Features:**
- Auto-population of email domain from user's verified email
- Website domain suggested for email domains
- Real-time validation
- Character counters
- Progressive disclosure

**Step 4: Duplicate Detection**

**Algorithm:**
- Levenshtein distance calculation
- Similarity threshold: 0.6+
- Real-time checking (800ms debounce)
- PostgreSQL pg_trgm extension

**User Experience:**
- Warning modal if duplicates found
- Shows top 5 similar companies
- Three options:
  1. Use existing company (navigate to profile)
  2. Continue anyway (justified additions)
  3. Dismiss and edit form

**Step 5: Submission**
- Save to database with status 'pending'
- Generate unique request ID
- Hash requester email for privacy
- Store actual email for notifications

**Step 6: Confirmation**
- Success page with reference ID
- Timeline expectation (24-48 hours)
- What happens next explanation
- Link to notification page (future access)

---

### 7. Notification System

#### Architecture

**Token-Based Access:**
- UUID token for each notification
- No authentication required
- 7-day expiration window
- Secure, one-time links

**Notification Types:**

**1. Company Approved**
- Notification type: `company_approved`
- Data includes:
  - Company ID
  - Company name
  - Request ID
- Success page with celebration
- Direct link to submit review

**2. Company Rejected**
- Notification type: `company_rejected`
- Data includes:
  - Rejection reason
  - Request ID
- Clear explanation of why
- Alternative actions:
  - Request another company
  - Search existing companies
  - Contact support (future)

#### User Experience

**Email Notification:**
- Sent immediately on admin action
- Subject line indicates approval/rejection
- Contains unique notification link
- Clear call-to-action

**Notification Page:**
- Clean, focused layout
- Status clearly displayed
- Next steps prominently shown
- Action buttons for follow-up
- Mark as read functionality

**Security:**
- Token validation on access
- Expiration check (7 days)
- Single-use recommended (future)
- Hashed recipient identification

---

### 8. Admin Dashboard

#### Access Control

**Authentication:**
- Admin-only routes with protection
- Session verification on page load
- Redirect unauthorized users
- Role-based access control

**Admin Roles:**
- `admin`: Standard access to all admin features
- `moderator`: Content moderation only (future)
- `super_admin`: Admin management + all features

#### Dashboard Features

**Company Requests Management:**

**View & Filter:**
- All company requests table
- Status filter (pending, approved, rejected)
- Industry filter
- Search by name or website
- Sortable columns
- Pagination

**Statistics Panel:**
- Total requests count
- Pending count (actionable)
- Approved today count
- Rejected count
- Visual indicators for urgent items

**Request Details Modal:**
- Full request information display
- Company name, website, domains
- Industry and size
- Description and justification
- Requester information (hashed)
- Created timestamp

**Actions:**

**Approve Request:**
- Edit company details before approval
  - Name, website, industry, size
  - Logo URL (optional)
  - Email domains
- Add internal admin notes
- Create company in database
- Create notification
- Send email to requester
- Update request status to 'approved'
- Record admin and timestamp

**Reject Request:**
- Required rejection reason
- Optional admin notes
- Create notification
- Send email to requester
- Update status to 'rejected'
- Record admin and timestamp

**Company Management:**

**View All Companies:**
- Complete company database table
- Search by company name
- Filter by industry
- Filter by company size
- Sort by multiple criteria
- Display source (seed vs. user-requested)

**Edit Companies:**
- Modal-based editing
- Update name, industry, size
- Update logo URL
- Save changes with validation
- Timestamp automatic update

**Navigation:**
- Link to company profile page
- View all reviews for company
- Quick actions menu

---

## User Journeys

### Journey 1: First-Time Reviewer

**Goal:** Submit anonymous review for current employer

**Steps:**
1. User discovers Truplace via search or referral
2. Lands on homepage, sees value proposition
3. Clicks "Submit Review" in navigation
4. Not authenticated, sees email verification modal
5. Enters work email address
6. Receives magic link email within seconds
7. Clicks link, returns to site authenticated
8. Search box appears to find company
9. Types company name, selects from dropdown
10. Company info auto-populated (editable)
11. Enters their role/department
12. Rates all 9 dimensions with stars
13. Expands dimensions to add optional text feedback
14. Selects overall recommendation (Highly Recommend)
15. Adds advice for friends considering company
16. Clicks preview to review everything
17. Confirms submission
18. Redirected to company profile
19. Sees their review published (anonymously)
20. Shares company profile with network

**Pain Points Addressed:**
- Quick, passwordless authentication
- Auto-save prevents data loss
- Progress bar shows completion status
- Preview prevents submission errors
- Immediate feedback with profile redirect

---

### Journey 2: Job Seeker Discovery

**Goal:** Research potential employer before accepting offer

**Steps:**
1. User receives job offer from Company X
2. Googles "Company X reviews workplace"
3. Finds Truplace in search results
4. Clicks through to company profile
5. Sees overall rating and review count
6. Reads recommendation percentage
7. Examines dimensional rating breakdown
8. Notes strong "Work-Life Balance" score
9. Reads individual reviews for details
10. Filters to see only "Highly Recommend" reviews
11. Sorts by "Most Recent" for current insights
12. Reads text feedback for Culture dimension
13. Checks "Business Health & Outlook" ratings
14. Compares with competitor companies
15. Makes informed decision to accept/decline offer

**Value Delivered:**
- Comprehensive multi-dimensional insights
- Real feedback from actual employees
- Current information (sorted by recent)
- Comparison across companies
- Informed career decisions

---

### Journey 3: Company Not Found - Request Flow

**Goal:** Request addition of company not in database

**Steps:**
1. User wants to review their employer
2. Searches for company in review submission
3. No results found
4. Clicks "Request Company" link
5. Already authenticated (or verifies email)
6. Form pre-fills email domain from their address
7. User enters company name
8. Enters company website URL
9. System suggests adding website domain to email domains
10. User adds it to the list
11. Selects industry from dropdown
12. Selects company size via radio buttons
13. Optionally adds company description
14. Optionally adds justification for addition
15. System checks for duplicate companies (800ms delay)
16. Warning modal shows 2 similar companies found
17. User reviews them - not exact matches
18. Clicks "Continue Anyway" with good reason
19. Submits request successfully
20. Sees confirmation page with request ID
21. Receives email: "We'll review within 24-48 hours"
22. Two days later, gets approval email
23. Clicks notification link
24. Sees "Company Added!" success page
25. Clicks "Write Review" button
26. Completes review submission
27. Company now available for all users

**Value Delivered:**
- User-driven database expansion
- Duplicate prevention maintains quality
- Fast approval process (48hr SLA)
- Automatic notification on approval
- Seamless transition to review submission

---

### Journey 4: Admin Company Request Processing

**Goal:** Review and process pending company requests efficiently

**Steps:**
1. Admin logs in to Truplace
2. Navigates to Admin Dashboard
3. Sees statistics: 12 pending requests
4. Filters to show only "Pending" status
5. Sees list ordered by oldest first
6. Clicks on first request to view details
7. Modal opens with full information
8. Reviews company name, website, and details
9. Validates website exists and is legitimate
10. Checks email domains are appropriate
11. Decision: Approve
12. Opens approve modal
13. Edits company name for consistency (capitalization)
14. Adds logo URL from company website
15. Adds internal note: "Verified via LinkedIn"
16. Clicks "Approve & Add Company"
17. System creates company
18. System creates notification
19. System sends email to requester
20. Modal closes, request marked "Approved"
21. Stats update: 11 pending requests
22. Proceeds to next request
23. Reviews details
24. Decision: Reject (duplicate of existing company)
25. Opens reject modal
26. Enters rejection reason: "This company already exists as [Company Name]. You can find it by searching."
27. Adds admin note: "Exact duplicate of ID: xxx"
28. Clicks "Reject Request"
29. System creates rejection notification
30. System sends email to requester
31. Stats update: 10 pending requests
32. Continues processing queue
33. Refreshes list periodically for new requests

**Efficiency Features:**
- Batch processing capability
- Quick filter and sort
- Modal for focused review
- Edit before approval
- Template rejection reasons (future)
- Keyboard shortcuts for power users (future)

---

## Technical Architecture

### Technology Stack

#### Frontend
- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite 5.4.2
- **Routing:** React Router DOM 7.8.2
- **Styling:** Tailwind CSS 3.4.1
- **Icons:** Lucide React 0.344.0
- **Charts:** Recharts 3.1.2
- **State Management:** React Context + Hooks
- **HTTP Client:** Supabase JS Client

#### Backend & Database
- **Database:** PostgreSQL via Supabase
- **Authentication:** Supabase Auth (Magic Link)
- **Storage:** Supabase Storage (future for logos)
- **Edge Functions:** Supabase Functions (email service)
- **Real-time:** Supabase Real-time subscriptions (future)

#### Hosting & Deployment
- **Frontend:** Vercel / Netlify
- **Database:** Supabase Cloud
- **CDN:** Cloudflare / Vercel Edge Network
- **Domain:** Custom domain with SSL

---

### Application Architecture

#### Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── AdminFilters.tsx
│   ├── AdminRoute.tsx
│   ├── AdminStats.tsx
│   ├── ApproveRequestModal.tsx
│   ├── CompanyCharts.tsx
│   ├── CompanyEditModal.tsx
│   ├── CompanySearch.tsx
│   ├── ComparisonTable.tsx
│   ├── DomainInput.tsx
│   ├── DuplicateWarning.tsx
│   ├── EmailVerificationModal.tsx
│   ├── FilterBar.tsx
│   ├── Footer.tsx
│   ├── FormField.tsx
│   ├── FormSection.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── IndustrySelect.tsx
│   ├── MetricCard.tsx
│   ├── PopularCompanies.tsx
│   ├── ProgressBar.tsx
│   ├── RatingBar.tsx
│   ├── RejectRequestModal.tsx
│   ├── RequestCard.tsx
│   ├── RequestDetailModal.tsx
│   ├── ReviewCard.tsx
│   ├── StarRating.tsx
│   ├── TextAreaWithCounter.tsx
│   ├── Toast.tsx
│   ├── ToastContainer.tsx
│   └── ValidationMessage.tsx
│
├── pages/                # Page components
│   ├── AboutPage.tsx
│   ├── AdminCompaniesPage.tsx
│   ├── AdminCompanyRequestsPage.tsx
│   ├── CompaniesPage.tsx
│   ├── CompanyProfilePage.tsx
│   ├── CompanyRequestedPage.tsx
│   ├── LandingPage.tsx
│   ├── NotificationPage.tsx
│   ├── RequestCompanyPage.tsx
│   └── SubmitReviewPage.tsx
│
├── lib/                  # Utilities and services
│   ├── supabase.ts
│   └── emailService.ts
│
├── hooks/                # Custom React hooks
│   └── useToast.tsx
│
├── types/                # TypeScript types
│   └── companyRequest.ts
│
├── data/                 # Mock/seed data
│   └── mockCompanyData.ts
│
├── App.tsx               # Main app component with routing
├── main.tsx              # App entry point
└── index.css             # Global styles
```

---

### Routing Architecture

```typescript
/ - Landing Page (public)
/about - About Page (public)
/companies - Browse All Companies (public)
/company/:id - Company Profile (public)
/submit-review - Submit Review Form (requires auth)
/request-company - Request Company Addition (requires auth)
/company-requested - Request Confirmation (public)
/notification/:token - Notification View (token-based, public)
/admin/company-requests - Admin Request Management (admin only)
/admin/companies - Admin Company Management (admin only)
```

#### Route Protection

**Public Routes:**
- Landing, About, Companies, Company Profile, Notification

**Protected Routes (Authentication Required):**
- Submit Review, Request Company

**Admin Routes:**
- Admin Company Requests, Admin Companies
- Requires authentication + admin role verification
- AdminRoute component handles protection

---

### Database Architecture

#### Tables

**1. companies**
```sql
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  industry text NOT NULL,
  size text NOT NULL,
  logo_url text,
  source text DEFAULT 'seed' CHECK (source IN ('seed', 'user_request')),
  request_id uuid REFERENCES company_requests(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_industry_name ON companies(industry, name);
```

**2. reviews**
```sql
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_rating integer NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  recommendation text NOT NULL CHECK (recommendation IN ('highly-recommend', 'maybe', 'not-recommended')),
  role text,
  period text DEFAULT (
    'Q' || EXTRACT(QUARTER FROM CURRENT_DATE)::text || ' ' || EXTRACT(YEAR FROM CURRENT_DATE)::text
  ),
  pros text[] DEFAULT ARRAY[]::text[],
  cons text[] DEFAULT ARRAY[]::text[],
  advice text,
  dimensions jsonb NOT NULL DEFAULT '{}'::jsonb,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, company_id)
);

-- Indexes
CREATE INDEX idx_reviews_company_id ON reviews(company_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);
CREATE INDEX idx_reviews_overall_rating ON reviews(overall_rating);
CREATE INDEX idx_reviews_recommendation ON reviews(recommendation);
```

**Dimensions JSONB Structure:**
```json
{
  "compensation": {
    "rating": 4,
    "feedback": "Competitive salary and great benefits package"
  },
  "management": {
    "rating": 5,
    "feedback": "Excellent leadership and clear communication"
  },
  "culture": {
    "rating": 4,
    "feedback": "Inclusive and collaborative environment"
  },
  "career": {
    "rating": 3,
    "feedback": "Limited growth opportunities"
  },
  "recognition": {
    "rating": 4,
    "feedback": "Regular acknowledgment of good work"
  },
  "environment": {
    "rating": 5,
    "feedback": "Modern office and great tools"
  },
  "worklife": {
    "rating": 4,
    "feedback": "Flexible hours and remote options"
  },
  "cooperation": {
    "rating": 5,
    "feedback": "Amazing team dynamics"
  },
  "business_health": {
    "rating": 4,
    "feedback": "Strong financials and market position"
  }
}
```

**3. company_stats (Materialized View)**
```sql
CREATE MATERIALIZED VIEW IF NOT EXISTS company_stats AS
SELECT
  c.id,
  c.name,
  c.industry,
  c.size,
  c.logo_url,
  COALESCE(AVG(r.overall_rating), 0) as overall_rating,
  COUNT(r.id) as review_count,
  COALESCE(
    COUNT(r.id) FILTER (WHERE r.recommendation = 'highly-recommend')::float / NULLIF(COUNT(r.id), 0) * 100,
    0
  ) as recommendation_rate,
  jsonb_build_object(
    'compensation', COALESCE(AVG((r.dimensions->'compensation'->>'rating')::float), 0),
    'management', COALESCE(AVG((r.dimensions->'management'->>'rating')::float), 0),
    'culture', COALESCE(AVG((r.dimensions->'culture'->>'rating')::float), 0),
    'career', COALESCE(AVG((r.dimensions->'career'->>'rating')::float), 0),
    'recognition', COALESCE(AVG((r.dimensions->'recognition'->>'rating')::float), 0),
    'environment', COALESCE(AVG((r.dimensions->'environment'->>'rating')::float), 0),
    'worklife', COALESCE(AVG((r.dimensions->'worklife'->>'rating')::float), 0),
    'cooperation', COALESCE(AVG((r.dimensions->'cooperation'->>'rating')::float), 0),
    'business_health', COALESCE(AVG((r.dimensions->'business_health'->>'rating')::float), 0)
  ) as dimensions,
  c.created_at,
  c.updated_at
FROM companies c
LEFT JOIN reviews r ON c.id = r.company_id
GROUP BY c.id, c.name, c.industry, c.size, c.logo_url, c.created_at, c.updated_at;

-- Refresh on company or review changes
CREATE INDEX idx_company_stats_name ON company_stats(name);
```

**4. company_requests**
```sql
CREATE TABLE IF NOT EXISTS company_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_hash text NOT NULL,
  requester_email text NOT NULL,
  company_name text NOT NULL,
  company_website text NOT NULL,
  email_domains text[] NOT NULL DEFAULT ARRAY[]::text[],
  industry text NOT NULL,
  company_size text NOT NULL,
  description text,
  justification text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by text
);

-- Indexes
CREATE INDEX idx_company_requests_status ON company_requests(status);
CREATE INDEX idx_company_requests_created_at ON company_requests(created_at);
```

**5. notifications**
```sql
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_hash text NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  token uuid UNIQUE DEFAULT gen_random_uuid(),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + INTERVAL '7 days')
);

-- Indexes
CREATE INDEX idx_notifications_token ON notifications(token);
CREATE INDEX idx_notifications_recipient_hash ON notifications(recipient_hash);
```

**6. admin_users**
```sql
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'moderator', 'super_admin')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_email ON admin_users(email);
```

---

### Row Level Security (RLS) Policies

#### companies Table

```sql
-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Anyone can view companies
CREATE POLICY "Companies are publicly readable"
  ON companies FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert (via company requests)
CREATE POLICY "Authenticated users can request companies"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only system/admins can update
CREATE POLICY "Only system can update companies"
  ON companies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

#### reviews Table

```sql
-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews (anonymously)
CREATE POLICY "Reviews are publicly readable"
  ON reviews FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert their own reviews
CREATE POLICY "Users can create their own reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews only
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

#### company_requests Table

```sql
-- Enable RLS
ALTER TABLE company_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can view (for duplicate checking)
CREATE POLICY "Company requests are readable"
  ON company_requests FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can create requests"
  ON company_requests FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only admins can update
CREATE POLICY "Admins can update requests"
  ON company_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

#### notifications Table

```sql
-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Token-based access (no auth required)
CREATE POLICY "Notifications accessible by token"
  ON notifications FOR SELECT
  TO public
  USING (true);  -- Token validation in application

-- Anyone can update to mark as read (token-validated in app)
CREATE POLICY "Notifications can be marked as read"
  ON notifications FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Only system can insert
CREATE POLICY "Only system can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );
```

#### admin_users Table

```sql
-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Users can check their own admin status (fixes circular dependency)
CREATE POLICY "Users can check their own admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Super admins can insert new admins
CREATE POLICY "Super admins can insert admin users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );
```

---

### PostgreSQL Functions

#### 1. Check for Duplicate Companies

```sql
CREATE OR REPLACE FUNCTION check_duplicate_companies(company_name_input text)
RETURNS TABLE(id uuid, name text, similarity_score float)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.name,
    similarity(LOWER(c.name), LOWER(company_name_input)) as score
  FROM companies c
  WHERE similarity(LOWER(c.name), LOWER(company_name_input)) > 0.6
  ORDER BY score DESC
  LIMIT 5;
END;
$$;
```

#### 2. Update Company Statistics Trigger

```sql
CREATE OR REPLACE FUNCTION update_company_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY company_stats;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trigger_update_company_stats
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH STATEMENT
EXECUTE FUNCTION update_company_stats();
```

#### 3. Update Company Updated_At Trigger

```sql
CREATE OR REPLACE FUNCTION update_company_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE companies
  SET updated_at = now()
  WHERE id = NEW.company_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_company_timestamp
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_company_updated_at();
```

#### 4. Cleanup Expired Notifications

```sql
CREATE OR REPLACE FUNCTION cleanup_expired_notifications()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM notifications
  WHERE expires_at < now()
  AND read = true;
END;
$$;

-- Schedule via pg_cron (Supabase extension)
SELECT cron.schedule(
  'cleanup-expired-notifications',
  '0 0 * * *', -- Daily at midnight
  $$SELECT cleanup_expired_notifications()$$
);
```

---

### Authentication Flow

#### Magic Link Authentication

**Process:**
1. User enters email on protected page
2. Frontend calls `supabase.auth.signInWithOtp({ email })`
3. Supabase sends magic link email
4. User clicks link with token
5. Supabase validates token and creates session
6. User redirected to app with session cookie
7. Frontend checks `supabase.auth.getSession()`
8. Session stored in localStorage
9. Subsequent requests include auth header

**Session Management:**
```typescript
// Check current session
const { data: { session } } = await supabase.auth.getSession();

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // User logged in
  } else if (event === 'SIGNED_OUT') {
    // User logged out
  }
});

// Sign out
await supabase.auth.signOut();
```

**Admin Verification:**
```typescript
async function isAdmin(user) {
  const { data } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  return !!data;
}
```

---

### Email Service

#### Supabase Edge Function: send-email

**Location:** `supabase/functions/send-email/index.ts`

**Purpose:** Send notification emails to users

**Capabilities:**
- Company approval notifications
- Company rejection notifications
- Magic link authentication (built-in)
- Future: Weekly digests, review responses

**Implementation:**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  const { to, subject, html, type, data } = await req.json();

  // Send email via SendGrid/Resend/etc
  // Template rendering based on type
  // Return success/failure
});
```

**Invocation:**
```typescript
await supabase.functions.invoke('send-email', {
  body: {
    to: 'user@example.com',
    type: 'company_approved',
    data: {
      companyName: 'Acme Corp',
      notificationToken: 'abc-123-def-456'
    }
  }
});
```

---

### Performance Optimizations

#### Database

1. **Materialized View for company_stats**
   - Pre-computed aggregations
   - Concurrent refresh on review changes
   - Significant query performance improvement

2. **Strategic Indexes**
   - B-tree indexes on frequently queried columns
   - Composite indexes for common filter combinations
   - GIN index on JSONB dimensions (future)

3. **Query Optimization**
   - SELECT only needed columns
   - Use `.maybeSingle()` for zero-or-one results
   - Batch fetches where possible
   - Pagination for large lists

#### Frontend

1. **Code Splitting**
   - Route-based lazy loading
   - Dynamic imports for heavy components
   - Recharts loaded only on company profiles

2. **Asset Optimization**
   - Image optimization (future: logo CDN)
   - CSS purging via Tailwind
   - Minification and compression

3. **Caching Strategy**
   - localStorage for form auto-save
   - Session caching
   - Company data caching (future: SWR/React Query)

4. **Debouncing**
   - Search input (300ms)
   - Duplicate check (800ms)
   - Auto-save (2000ms)

---

## Security & Privacy

### Data Protection

#### User Privacy

**Anonymous Reviews:**
- Reviews display no user information
- User ID stored internally but never exposed in UI
- No usernames, no profiles, no public association
- Database query filters out user_id in public views

**Email Privacy:**
- SHA-256 hashing for company request tracking
- Actual email stored separately for notifications only
- No email addresses in review records
- No email exposed in admin interfaces

**Session Security:**
- Secure HTTP-only cookies
- Token expiration (1 hour)
- Automatic refresh tokens
- CSRF protection

#### Email Verification

**Purpose:**
- Prevent spam and fake reviews
- Verify reviewer authenticity
- Maintain platform quality

**Implementation:**
- Magic link OTP via Supabase Auth
- No password storage
- Rate limiting on email requests
- Email ownership verification

---

### Review Integrity

#### One Review Per Company

**Enforcement:**
```sql
UNIQUE(user_id, company_id)
```

**Benefits:**
- Prevents spam
- Maintains review quality
- Accurate company ratings
- Fair representation

#### Required Fields

**Mandatory:**
- All 9 dimensional ratings
- Overall recommendation
- Company selection

**Optional:**
- Text feedback for dimensions
- Role/department
- Friend advice

**Validation:**
- Frontend + backend validation
- Character limits enforced
- Star rating 1-5 only
- URL format for websites

---

### Access Control

#### Public Access

**Allowed:**
- Browse all companies
- View all reviews (anonymously)
- Search companies
- View company profiles
- Access notification pages (with token)

**Denied:**
- Submit reviews (requires auth)
- Request companies (requires auth)
- Admin pages (requires admin role)

#### Authenticated Access

**Additional Allowed:**
- Submit reviews
- Request companies
- Update own reviews (future)
- View own submissions (future)

#### Admin Access

**Additional Allowed:**
- View all company requests
- Approve/reject requests
- Edit company information
- View admin dashboard
- Manage other admins (super_admin only)

---

### SQL Injection Prevention

**Parameterized Queries:**
- All Supabase queries use parameterization
- No string concatenation
- Type-safe TypeScript client

**Example:**
```typescript
// Safe - parameterized
await supabase
  .from('companies')
  .select('*')
  .eq('name', userInput);

// Unsafe - never do this
// await supabase.rpc('raw_sql', {
//   query: `SELECT * FROM companies WHERE name = '${userInput}'`
// });
```

---

### XSS Prevention

**React Auto-Escaping:**
- React escapes all user input by default
- No `dangerouslySetInnerHTML` usage
- Text content auto-sanitized

**Input Validation:**
- Character limits on all fields
- HTML tags stripped in feedback
- URL validation for websites

---

### CORS & API Security

**Supabase API:**
- CORS configured for app domain only
- Anon key for read-only operations
- Service role key server-side only (future)
- Rate limiting on API endpoints

**RLS Enforcement:**
- All queries pass through RLS
- No direct database access
- Admin actions verified server-side

---

## Success Metrics

### Key Performance Indicators (KPIs)

#### User Engagement

**Primary Metrics:**
- **Reviews Submitted per Week:** Target 100+ in month 3
- **Active Monthly Reviewers:** Target 500+ in month 6
- **Return Review Rate:** % of users who submit >1 review, Target 20%
- **Time on Company Profile:** Average 2+ minutes
- **Reviews per Company:** Average 5+ reviews

**Secondary Metrics:**
- Search queries performed
- Companies viewed per session
- Filter usage rate
- Review preview usage

---

#### Content Quality

**Review Completeness:**
- **% Reviews with All Dimensions Rated:** Target 100% (enforced)
- **% Reviews with Text Feedback:** Target 60%
- **Average Feedback Length:** Target 100+ characters
- **% Reviews with Advice:** Target 40%

**Duplicate Prevention:**
- **Duplicate Company Request Rate:** Target <5%
- **False Positive Duplicate Warnings:** Target <10%
- **Companies Added via Requests:** Track monthly growth

---

#### Platform Growth

**Database Expansion:**
- **Total Companies:** Target 1,000 in 6 months
- **Companies with 5+ Reviews:** Target 200 in 6 months
- **Industry Coverage:** All 11 industries with 20+ companies
- **Company Size Distribution:** Balanced across 4 sizes

**User Acquisition:**
- **Monthly Active Users:** Target 2,000 in 6 months
- **User Registration Rate:** % visitors who verify email
- **Organic Search Traffic:** Target 50% of total traffic
- **Direct/Referral Traffic:** Target 30% of total traffic

---

#### Admin Efficiency

**Request Processing:**
- **Average Processing Time:** Target <24 hours
- **Approval Rate:** Track percentage of approved requests
- **Rejection Reasons:** Most common categories
- **Admin Active Hours:** Time spent in admin panel

---

### Analytics Tracking

#### Events to Track

**User Actions:**
- `page_view` - All page visits
- `company_search` - Search performed
- `company_view` - Company profile viewed
- `filter_applied` - Filter or sort used
- `review_started` - Review form opened
- `review_submitted` - Review published
- `company_requested` - Company request submitted
- `notification_viewed` - Notification page accessed

**Admin Actions:**
- `admin_login` - Admin authentication
- `request_viewed` - Request details opened
- `request_approved` - Company request approved
- `request_rejected` - Company request rejected
- `company_edited` - Company info updated

---

### A/B Testing Opportunities

#### Test Scenarios

**Homepage Hero:**
- CTA button text ("Submit Review" vs "Share Your Experience")
- Search bar prominence
- Popular companies layout

**Review Form:**
- Progress bar vs step indicator
- Single-page vs multi-step
- Optional vs required text feedback

**Company Profile:**
- Chart types for dimensional ratings
- Review sort default (recent vs rating)
- Recommendation badge style

---

## Future Roadmap

### Phase 1: MVP Enhancements (0-3 months)

#### High Priority

**1. Review Helpfulness Voting**
- Upvote/downvote reviews
- Sort by "Most Helpful"
- Track helpful count in reviews table
- Prevent self-voting

**2. User Profile & History**
- View own submitted reviews
- Edit previous reviews
- Delete reviews (within 30 days)
- Review submission history

**3. Email Notification Improvements**
- Rich HTML email templates
- Better email deliverability
- Unsubscribe mechanism
- Email preferences

**4. Company Comparison Tool**
- Side-by-side company comparison
- Compare up to 3 companies
- Dimensional rating charts
- Quick comparison from search results

**5. Advanced Search & Filters**
- Filter reviews by role/department
- Filter by time period (quarters)
- Search within review text
- Save search filters

---

### Phase 2: Growth Features (3-6 months)

#### Medium Priority

**1. Company Claim & Verification**
- Allow companies to claim profiles
- Verification process
- Official company badge
- Respond to reviews (limited)

**2. Salary Information**
- Add salary range to reviews
- Anonymous salary data
- Industry benchmarking
- Location-based compensation

**3. Interview Process Reviews**
- Separate interview rating
- Interview difficulty rating
- Process description
- Interview tips

**4. Advanced Analytics Dashboard**
- Company trend analysis
- Industry benchmarks
- Dimensional rating trends over time
- Sentiment analysis (future AI)

**5. Enhanced Admin Tools**
- Bulk actions for requests
- Template rejection reasons
- Admin activity logs
- Content moderation queue

**6. Mobile App (React Native)**
- iOS and Android apps
- Push notifications
- Offline mode
- Camera for logo uploads

---

### Phase 3: Scale & Monetization (6-12 months)

#### Lower Priority / Future

**1. Premium Features for HR Teams**
- Subscription tier: $99/mo per company
- Detailed analytics dashboard
- Competitor benchmarking
- Export capabilities
- Alert system for new reviews

**2. API Access for Partners**
- Public API for approved partners
- Rate-limited free tier
- Paid tiers for high volume
- Webhook integrations
- Documentation portal

**3. AI-Powered Features**
- Review summarization
- Sentiment analysis
- Automatic tagging
- Duplicate review detection
- Question answering chatbot

**4. Enhanced Discovery**
- Personalized recommendations
- "Companies like this"
- Career path suggestions
- Industry reports

**5. Job Board Integration**
- Partner with job boards
- Link reviews to job postings
- Apply directly from company profile
- Track application outcomes

**6. Company Certification Program**
- "Best Place to Work" badges
- Industry-specific certifications
- Annual awards
- Marketing opportunities

**7. Multilingual Support**
- Translate reviews
- Multi-language interface
- Region-specific instances
- Local company databases

**8. Advanced Reporting**
- Custom report builder
- PDF export
- Email digests
- Scheduled reports

---

### Technical Debt & Improvements

#### Code Quality

**Refactoring Needs:**
- Extract common form logic to hooks
- Consolidate modal components
- Create design system documentation
- Improve TypeScript type coverage

**Testing:**
- Unit tests for utilities
- Integration tests for forms
- E2E tests for critical paths
- Visual regression testing

**Performance:**
- Implement React Query for caching
- Add service worker for offline support
- Optimize bundle size
- Image lazy loading

---

### Infrastructure & DevOps

**Monitoring:**
- Error tracking (Sentry/Bugsnag)
- Performance monitoring (Vercel Analytics)
- Database query monitoring
- User session replay

**Deployment:**
- CI/CD pipeline improvements
- Staging environment
- Feature flags system
- Blue-green deployments

**Scaling:**
- Database read replicas
- CDN for static assets
- Edge caching strategy
- Load testing

---

## Appendix

### Glossary

**Terms:**
- **Anonymous Review:** Review published without any identifying information
- **Dimensional Rating:** Individual rating for one of 9 workplace aspects
- **Magic Link:** Passwordless authentication link sent via email
- **Company Request:** User submission to add new company to database
- **RLS:** Row Level Security - PostgreSQL security feature
- **Notification Token:** Unique identifier for accessing notifications
- **Materialized View:** Pre-computed database view for performance

---

### Supported Industries

1. Technology
2. Finance
3. Healthcare
4. Consulting
5. E-commerce
6. Entertainment
7. Automotive
8. Retail
9. Food & Beverage
10. Education
11. Media / Government / Non-profit / Other

---

### Company Size Categories

1. **1-50 employees:** Startup / Small Business
2. **51-200 employees:** Medium Business
3. **201-1000 employees:** Large Company
4. **1000+ employees:** Enterprise

---

### Recommendation Types

1. **Highly Recommend (✅):** Strongly positive, would recommend to friends
2. **Maybe (🤔):** Mixed feelings, depends on individual priorities
3. **Not Recommended (❌):** Negative experience, would not recommend

---

### Nine Review Dimensions

1. Compensation & Benefits
2. Management Quality
3. Culture, Values & Inclusion
4. Career Opportunities & Development
5. Recognition & Appreciation
6. Working Environment
7. Work-Life Balance
8. Cooperation & Relationships
9. Business Health & Outlook

---

### Admin Roles

1. **Admin:** Standard administrative access to all features
2. **Moderator:** Limited access for content moderation (future)
3. **Super Admin:** Full access including admin user management

---

### Environment Variables

```env
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
VITE_DISABLE_AUTH_FOR_TESTING=false
```

---

### API Endpoints (Supabase REST)

**Companies:**
- `GET /rest/v1/companies` - List all companies
- `GET /rest/v1/company_stats` - Get company statistics
- `POST /rest/v1/companies` - Create company (admin)
- `PATCH /rest/v1/companies?id=eq.[id]` - Update company (admin)

**Reviews:**
- `GET /rest/v1/reviews?company_id=eq.[id]` - Get company reviews
- `POST /rest/v1/reviews` - Submit review (authenticated)
- `PATCH /rest/v1/reviews?id=eq.[id]` - Update own review (authenticated)

**Company Requests:**
- `GET /rest/v1/company_requests` - List requests
- `POST /rest/v1/company_requests` - Submit request (authenticated)
- `PATCH /rest/v1/company_requests?id=eq.[id]` - Update request (admin)

**Notifications:**
- `GET /rest/v1/notifications?token=eq.[token]` - Get notification by token
- `PATCH /rest/v1/notifications?token=eq.[token]` - Mark as read

**Admin:**
- `GET /rest/v1/admin_users?user_id=eq.[id]` - Check admin status

---

### Contact & Support

**GitHub Repository:** [Provide URL]
**Documentation:** [Provide URL]
**Support Email:** support@truplace.com
**Admin Email:** admin@truplace.com

---

**End of Product Requirements Document**

---

*This PRD is a living document and will be updated as the product evolves. Last updated: December 21, 2025*
