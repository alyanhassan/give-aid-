-- ============================================================================
-- GIVE-AID NGO FUNDRAISING & WELFARE PLATFORM
-- SQL Server 2000 / 2008 / 2019+ Database Definition & Seed Script
-- Compatible with Aptech eProject J2EE / JDBC / Servlet Architecture
-- ============================================================================

-- Create Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'GiveAidDB')
BEGIN
    CREATE DATABASE GiveAidDB;
END
GO

USE GiveAidDB;
GO

-- ============================================================================
-- 1. USERS & DONORS TABLE
-- ============================================================================
IF OBJECT_ID('tbl_Users', 'U') IS NOT NULL DROP TABLE tbl_Users;
GO

CREATE TABLE tbl_Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    city NVARCHAR(60) NOT NULL,
    occupation NVARCHAR(100) NULL,
    residential_address NVARCHAR(255) NULL,
    dob DATE NULL,
    role VARCHAR(20) DEFAULT 'Donor', -- 'Donor', 'Volunteer', 'Admin'
    member_since NVARCHAR(30) DEFAULT 'November 2026',
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- 2. ASSOCIATED NGO DIRECTORY TABLE
-- ============================================================================
IF OBJECT_ID('tbl_NGO_Directory', 'U') IS NOT NULL DROP TABLE tbl_NGO_Directory;
GO

CREATE TABLE tbl_NGO_Directory (
    ngo_id VARCHAR(50) PRIMARY KEY,
    name NVARCHAR(150) NOT NULL,
    acronym VARCHAR(20) NOT NULL,
    logo_url NVARCHAR(255) NOT NULL,
    tagline NVARCHAR(255) NOT NULL,
    category NVARCHAR(60) NOT NULL,
    location NVARCHAR(100) NOT NULL,
    headquarters NVARCHAR(255) NOT NULL,
    website NVARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    founded VARCHAR(10) NOT NULL,
    founder NVARCHAR(150) NULL,
    primary_cause NVARCHAR(100) NOT NULL,
    cause_label NVARCHAR(150) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    about NVARCHAR(MAX) NOT NULL,
    areas_of_operation NVARCHAR(MAX) NOT NULL,
    related_programme NVARCHAR(150) NULL,
    is_featured BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- 3. WELFARE CAUSES & ENDOWMENTS TABLE
-- ============================================================================
IF OBJECT_ID('tbl_Causes', 'U') IS NOT NULL DROP TABLE tbl_Causes;
GO

CREATE TABLE tbl_Causes (
    cause_id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(150) NOT NULL,
    category NVARCHAR(60) NOT NULL, -- Children, Education, Healthcare, Disabled, Woman, Youth, Elderly, Emergency
    target_amount DECIMAL(14,2) NOT NULL,
    raised_amount DECIMAL(14,2) DEFAULT 0.00,
    lead_ngo_id VARCHAR(50) NULL FOREIGN KEY REFERENCES tbl_NGO_Directory(ngo_id),
    is_urgent BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- 4. DONATION TRANSACTIONS & LEDGER TABLE
-- ============================================================================
IF OBJECT_ID('tbl_Donations', 'U') IS NOT NULL DROP TABLE tbl_Donations;
GO

CREATE TABLE tbl_Donations (
    donation_id INT IDENTITY(1,1) PRIMARY KEY,
    reference_no VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NULL FOREIGN KEY REFERENCES tbl_Users(user_id),
    donor_name NVARCHAR(100) NOT NULL,
    donor_email NVARCHAR(120) NOT NULL,
    donor_phone VARCHAR(30) NOT NULL,
    cause_title NVARCHAR(150) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    is_anonymous BIT DEFAULT 0,
    payment_method VARCHAR(30) DEFAULT 'Card Simulation',
    card_last_four VARCHAR(4) NULL,
    status VARCHAR(20) DEFAULT 'Completed', -- Completed, Pending, Failed
    donor_message NVARCHAR(MAX) NULL,
    donation_date DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- 5. PROGRAMMES & CAMPAIGNS TABLE
-- ============================================================================
IF OBJECT_ID('tbl_Programmes', 'U') IS NOT NULL DROP TABLE tbl_Programmes;
GO

CREATE TABLE tbl_Programmes (
    programme_id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(150) NOT NULL,
    category NVARCHAR(60) NOT NULL,
    location NVARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Upcoming, Completed
    target_beneficiaries NVARCHAR(100) NOT NULL,
    lead_ngo_id VARCHAR(50) NULL FOREIGN KEY REFERENCES tbl_NGO_Directory(ngo_id),
    description NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- 6. VOLUNTEER & PROGRAMME INTEREST REGISTRATIONS
-- ============================================================================
IF OBJECT_ID('tbl_Volunteer_Interests', 'U') IS NOT NULL DROP TABLE tbl_Volunteer_Interests;
GO

CREATE TABLE tbl_Volunteer_Interests (
    interest_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(120) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    target_programme NVARCHAR(150) NOT NULL,
    preferred_role NVARCHAR(100) NOT NULL,
    experience_message NVARCHAR(MAX) NULL,
    submitted_at DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) DEFAULT 'Pending' -- Pending, Accepted, Contacted
);
GO

-- ============================================================================
-- 7. FRIEND INVITATIONS (SPREAD THE MISSION)
-- ============================================================================
IF OBJECT_ID('tbl_Friend_Invitations', 'U') IS NOT NULL DROP TABLE tbl_Friend_Invitations;
GO

CREATE TABLE tbl_Friend_Invitations (
    invite_id INT IDENTITY(1,1) PRIMARY KEY,
    sender_name NVARCHAR(100) DEFAULT 'A Give-AID Supporter',
    friend_name NVARCHAR(100) NOT NULL,
    friend_email NVARCHAR(120) NOT NULL,
    personal_note NVARCHAR(MAX) NULL,
    sent_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- 8. CONTACT INQUIRIES & QUERIES TABLE
-- ============================================================================
IF OBJECT_ID('tbl_Queries', 'U') IS NOT NULL DROP TABLE tbl_Queries;
GO

CREATE TABLE tbl_Queries (
    query_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(120) NOT NULL,
    phone VARCHAR(30) NULL,
    subject NVARCHAR(100) NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    submitted_at DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) DEFAULT 'Open', -- Open, In Progress, Resolved
    reply_notes NVARCHAR(MAX) NULL
);
GO

-- ============================================================================
-- 9. USER REVIEWS & TESTIMONIALS TABLE
-- ============================================================================
IF OBJECT_ID('tbl_Reviews', 'U') IS NOT NULL DROP TABLE tbl_Reviews;
GO

CREATE TABLE tbl_Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(120) NOT NULL,
    role NVARCHAR(80) NOT NULL,
    location NVARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text NVARCHAR(600) NOT NULL,
    is_approved BIT DEFAULT 1,
    submitted_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- SEED DATA: 15 AUTHENTIC PAKISTANI WELFARE ORGANIZATIONS
-- ============================================================================
INSERT INTO tbl_NGO_Directory 
(ngo_id, name, acronym, logo_url, tagline, category, location, headquarters, website, phone, email, founded, founder, primary_cause, cause_label, description, about, areas_of_operation, related_programme, is_featured)
VALUES 
('edhi-foundation', 'Edhi Foundation', 'EF', '/assets/images/ngos/edhi-foundation.png', 'World’s largest volunteer ambulance service and nationwide welfare network', 'Disaster Relief', 'Karachi, Sindh', 'Boulton Market, Mithadar, Karachi, Pakistan', 'https://edhi.org', '+92 21 32413232', 'info@edhi.org', '1951', 'Abdul Sattar Edhi & Bilquis Edhi', 'Emergency Assistance', 'Emergency Food Ration & Flood Relief', 'Providing round-the-clock emergency rescue, nationwide ambulance services, destitute burial assistance, orphanages, and shelter homes.', 'Founded by Abdul Sattar Edhi, operating entirely on public voluntary support.', 'Nationwide coverage across all 4 provinces, AJK, and GB.', 'Emergency Flood Relief Ration Drive', 1),
('saylani-welfare', 'Saylani Welfare International Trust', 'SWIT', '/assets/images/ngos/saylani.png', 'Leading hunger relief, IT education and water sustainability initiative', 'Food Security', 'Karachi, Sindh', 'A-25, Bahadurabad Chowrangi, Karachi, Pakistan', 'https://www.saylaniwelfare.com', '+92 21 111 729 526', 'info@saylaniwelfare.com', '1999', 'Maulana Muhammad Bashir Farooq Qadri', 'Emergency Assistance', 'Emergency Food Ration & Nutrition', 'Serving over 150,000 free warm meals daily, operating modern IT vocational institutes (SMIT).', 'Focusing intensely on daily poverty mitigation and digital youth skilling.', 'Nationwide branches in all provincial capitals.', 'Daily Community Food Distributions', 1),
('alkhidmat-foundation', 'Alkhidmat Foundation Pakistan', 'AKFP', '/assets/images/ngos/alkhidmat.png', 'Dedicated to disaster management, orphan sponsorship, and health relief', 'Disaster Relief', 'Lahore, Punjab', '3-A, Block A, Phase 5 D.H.A, Lahore, Pakistan', 'https://alkhidmat.org', '+92 42 111 003 003', 'info@alkhidmat.org', '1990', 'Humanitarian Council of Pakistan', 'Disaster Relief', 'Emergency Food Ration & Flood Relief', 'Premier humanitarian entity specialized in rapid disaster rescue and Aghosh orphan care complexes.', 'Delivering humanitarian relief and running boarding schools for orphan children.', 'Operating in all 150+ administrative districts of Pakistan.', 'Winter Warmth Blankets Logistics', 0),
('akhuwat-foundation', 'Akhuwat Foundation', 'AF', '/assets/images/ngos/akhuwat-trimmed.png', 'Pioneering interest-free microfinance and tuition-free higher education', 'Poverty Alleviation', 'Lahore, Punjab', '19 Civic Center, Sector A-2, Township, Lahore, Pakistan', 'https://akhuwat.org.pk', '+92 42 111 448 464', 'info@akhuwat.org.pk', '2001', 'Dr. Muhammad Amjad Saqib', 'Women''s Empowerment', 'Women''s Vocational Skill Centre', 'World’s largest interest-free microfinance programme disbursing hundreds of billions of rupees.', 'Empowering low-income families and running Akhuwat College University.', 'Over 800 branches in 400+ cities and towns across Pakistan.', 'Women-Led Micro-Enterprise Incubation', 0),
('shaukat-khanum', 'Shaukat Khanum Memorial Cancer Hospital', 'SKMCH', '/assets/images/ngos/shaukat-khanum-trimmed.png', 'World-class comprehensive cancer diagnosis and free treatment for the underprivileged', 'Healthcare', 'Lahore, Punjab', '7A Block R-3, Johar Town, Lahore, Punjab, Pakistan', 'https://shaukatkhanum.org.pk', '+92 42 35905000', 'fundraising@skm.org.pk', '1994', 'Imran Khan', 'Healthcare', 'Healthcare & Dialysis Fund', 'Providing free chemotherapy, radiation, and surgical oncology to 75% of cancer patients.', 'JCI-accredited tertiary cancer treatment and diagnostic network in Lahore, Peshawar, and Karachi.', 'Pan-Pakistan diagnostic and walk-in clinic network.', 'Comprehensive Paediatric Oncology Treatment', 1),
('tcf', 'The Citizens Foundation', 'TCF', '/assets/images/ngos/tcf-trimmed.png', 'Removing barriers to quality, character-building education for slum children', 'Education', 'Karachi, Sindh', 'Plot No. 20, Sector 14, Korangi Industrial Area, Karachi, Pakistan', 'https://www.tcf.org.pk', '+92 21 111 823 823', 'info@tcf.org.pk', '1995', 'TCF Founding Citizens Council', 'Education', 'Slum Primary & Secondary Education', 'Operating 1,900+ purpose-built schools in the heart of urban slums and rural hamlets.', 'Maintaining an all-female faculty of 13,000+ teachers fostering gender equality.', 'Present in 700+ communities across all provinces and AJK.', 'Slum Primary Educator Sponsorship', 1),
('indus-hospital', 'Indus Hospital & Health Network', 'IHHN', '/assets/images/ngos/indus-hospital-trimmed.png', 'Delivering 100% free, dignity-driven tertiary healthcare with paperless technology', 'Healthcare', 'Karachi, Sindh', 'Plot C-76, Sector 31/5, Opposite Darussalam Society, Korangi, Karachi', 'https://indushospital.org.pk', '+92 21 35112709', 'cr@tih.org.pk', '2007', 'Dr. Abdul Bari Khan', 'Healthcare', 'Healthcare & Dialysis Fund', 'Multi-campus hospital network treating millions of destitute patients free of charge.', 'Paperless clinical network operating tertiary hospitals and mobile clinics.', 'Operating across 50+ districts with multiple tertiary hospitals.', 'Free Hemodialysis & Renal Care Sessions', 1),
('hands-pakistan', 'HANDS Pakistan', 'HANDS', '/assets/images/ngos/hands-trimmed.png', 'Integrated community development, disaster rehabilitation, and mother-child health', 'Community Development', 'Karachi, Sindh', '1403, 14th Floor, Executive Tower, Dolmen City, Clifton, Karachi', 'https://hands.org.pk', '+92 21 111 666 392', 'info@hands.org.pk', '1979', 'Prof. Dr. A. G. Billoo', 'Emergency Assistance', 'Clean Drinking Water RO Plants', 'Serving over 35 million citizens through clean water, community schools, and disaster resilience.', 'Holistic humanitarian network with 40+ years of grassroots service.', 'Active across 60+ districts in Sindh, Punjab, Balochistan, and KP.', 'Community Solar Tubewell Installation', 0),
('pakistan-red-crescent', 'Pakistan Red Crescent Society', 'PRCS', '/assets/images/ngos/pakistan-red-crescent-trimmed.png', 'Statutory auxiliary humanitarian organization delivering emergency medical rescue', 'Disaster Relief', 'Islamabad, ICT', 'National Headquarters, Sector H-8, Islamabad, Pakistan', 'https://prcs.org.pk', '+92 51 9250404', 'info@prcs.org.pk', '1947', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Disaster Relief', 'Emergency Food Ration & Flood Relief', 'Leading first aid training, humanitarian relief logistics, and blood donation services.', 'Auxiliary to public authorities under Geneva Conventions.', 'National headquarters and 7 provincial/regional branches.', 'Emergency Disaster Evacuation & Aid', 0),
('sos-villages', 'SOS Children''s Villages Pakistan', 'SOS', '/assets/images/ngos/sos-villages.png', 'Providing loving permanent family homes and education for abandoned children', 'Child Welfare', 'Lahore, Punjab', 'Ferozepur Road, Near Canal Bridge, Lahore, Punjab, Pakistan', 'https://www.sos.org.pk', '+92 42 35854440', 'sos@sos.org.pk', '1977', 'Suraiya Anwar (Souriya Anwar)', 'Children''s Welfare', 'Children''s Welfare Fund', 'Creating loving homes with SOS mothers where orphan and abandoned children grow together.', 'Providing full schooling, healthcare, and higher education sponsorships.', '15 purpose-built villages across all four provinces.', 'Orphan Residential Nurturing Programme', 0),
('chhipa-welfare', 'Chhipa Welfare Association', 'CWA', '/assets/images/ngos/chhipa-trimmed.png', 'Rapid emergency ambulance service and warm daily community kitchens', 'Emergency Services', 'Karachi, Sindh', 'Plot No. 1, Block 2, Shahrah-e-Quaideen, PECHS, Karachi, Pakistan', 'https://www.chhipa.org', '+92 21 111 92 1020', 'info@chhipa.org', '2007', 'Ramzan Chhipa', 'Emergency Assistance', 'Emergency Food Ration & Nutrition', 'Known for rapid citywide emergency ambulance sirens and round-the-clock Dastarkhwan meals.', 'Operating jhoolas (cradles) for unwanted infants and rescue van networks.', 'Centred in Karachi with provincial emergency deployments.', 'Round-the-Clock Emergency Ambulance Fleet', 0),
('aurat-foundation', 'Aurat Foundation', 'AF-PK', '/assets/images/ngos/aurat-foundation-trimmed.png', 'Advancing women’s legal rights, economic independence, and democratic empowerment', 'Women''s Rights', 'Islamabad, ICT', 'House 16, Street 67, Sector G-6/4, Islamabad, Pakistan', 'https://www.af.org.pk', '+92 51 2831381', 'headoffice@af.org.pk', '1986', 'Nigar Ahmad & Shahla Zia', 'Women''s Empowerment', 'Women''s Vocational Skill Centre', 'Pioneering non-profit advocating for progressive legislation and women’s economic justice.', 'Assisting female victims of violence and training female entrepreneurs.', 'Headquarters in Islamabad with core offices in Lahore, Karachi, Peshawar, Quetta.', 'Women''s Legal Aid & Micro-Enterprise Desk', 0),
('kashf-foundation', 'Kashf Foundation', 'KF', '/assets/images/ngos/kashf-foundation-trimmed.png', 'Specialized microfinance, business training, and social protection for low-income women', 'Poverty Alleviation', 'Lahore, Punjab', '19 Civic Center, Sector A-2, Township, Lahore, Pakistan', 'https://kashf.org', '+92 42 111 981 981', 'info@kashf.org', '1996', 'Roshaneh Zafar', 'Women''s Empowerment', 'Women''s Vocational Skill Centre', 'First specialized microfinance institution in Pakistan focusing exclusively on women.', 'Offering business literacy, micro-health insurance, and low-interest enterprise loans.', 'Operating 300+ branches across Punjab, Sindh, KP, and ICT.', 'Vocational Skills Training for Female Entrepreneurs', 0),
('transparent-hands', 'Transparent Hands', 'TH', '/assets/images/ngos/transparent-hands-trimmed.png', '100% transparent crowdfunding platform providing free surgical care for needy patients', 'Healthcare', 'Lahore, Punjab', '605-A, Block C, Faisal Town, Lahore, Punjab, Pakistan', 'https://www.transparenthands.org', '+92 42 35174151', 'info@transparenthands.org', '2014', 'Rameeza Mueen', 'Healthcare', 'Healthcare & Dialysis Fund', 'Enabling donors to fund verified cardiac, orthopedic, and general surgical procedures.', 'Operating mobile medical camps across rural zones in Punjab, KP, and Sindh.', 'Nationwide surgical patient coordination.', 'Free Pediatric Cardiac & Orthopedic Surgeries', 0),
('rizq', 'Rizq', 'RIZQ', '/assets/images/ngos/rizq-trimmed.png', 'Tackling food insecurity, malnutrition, and food waste through youth mobilization', 'Food Security', 'Lahore, Punjab', 'Plot 42, Sector B-II, Phase 1, Johar Town, Lahore, Pakistan', 'https://sharefood.org', '+92 304 111 7497', 'info@sharefood.org', '2015', 'Huzaifa Ahmad, Qasim Javaid & Musa Aamir', 'Food Security', 'Emergency Food Ration & Nutrition', 'Social enterprise combating urban and rural hunger through Rizq Dastarkhwan and ration distributions.', 'Distributing millions of meals and mobilizing thousands of university volunteers.', 'Active operations in Lahore, Rawalpindi, Islamabad, and Karachi.', 'Daily Street Children Nutrition Kitchen', 0);
GO

-- Seed Demo User
INSERT INTO tbl_Users (full_name, email, password_hash, phone, city, occupation, member_since)
VALUES ('Dr. Tariq Mansoor', 'tariq.mansoor@example.org', '$2a$12$e8Y5t1hKqj01...DEMO_HASH', '0300-8459123', 'Lahore, Pakistan', 'Medical Consultant & Philanthropist', 'January 2026');
GO

-- Seed Demo Donations
INSERT INTO tbl_Donations (reference_no, donor_name, donor_email, donor_phone, cause_title, amount, status, donation_date)
VALUES 
('GA-2026-94821', 'Dr. Tariq Mansoor', 'tariq.mansoor@example.org', '0300-8459123', 'Children''s Welfare', 5000.00, 'Completed', '2026-11-02'),
('GA-2026-81934', 'Dr. Tariq Mansoor', 'tariq.mansoor@example.org', '0300-8459123', 'Healthcare & Dialysis Support', 10000.00, 'Completed', '2026-10-18'),
('GA-2026-77312', 'Dr. Tariq Mansoor', 'tariq.mansoor@example.org', '0300-8459123', 'Emergency Flood Relief Ration', 2500.00, 'Completed', '2026-09-04'),
('GA-2026-62109', 'Dr. Tariq Mansoor', 'tariq.mansoor@example.org', '0300-8459123', 'Women''s Vocational Skill Centre', 3000.00, 'Completed', '2026-07-15');
GO

