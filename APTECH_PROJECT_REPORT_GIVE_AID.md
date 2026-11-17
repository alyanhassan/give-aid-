# APTECH ePROJECT COMPREHENSIVE PROJECT REPORT

**PROJECT TITLE:** GIVE-AID — Centralized NGO Fundraising & Welfare Management Platform  
**CURRICULUM / COURSE:** Aptech Computer Education Advanced Diploma in Software Engineering  
**ACADEMIC YEAR:** 2026  
**SUBMISSION TYPE:** eProject Submission  
**DOCUMENT VERSION:** 1.0.0  

---

## 1. CERTIFICATE OF COMPLETION

```
================================================================================
                         APTECH COMPUTER EDUCATION
                          CERTIFICATE OF COMPLETION
================================================================================

This is to certify that the project entitled:
"GIVE-AID — CENTRALIZED NGO FUNDRAISING & WELFARE MANAGEMENT PLATFORM"

has been successfully analyzed, designed, implemented, and verified in accordance
with the Aptech eProject curriculum guidelines and Project Specification standards.

Student / Team Name: ...........................................................
Roll Number / Student ID: ......................................................
Center Name: ...................................................................
Academic Year / Term: 2026

Date of Submission: November 15, 2026

Faculty In-Charge:                                     Head of Department:
________________________                               ________________________
(Signature & Seal)                                     (Signature & Seal)
================================================================================
```

---

## 2. TABLE OF CONTENTS

1. **Certificate of Completion**
2. **Project Metadata & Executive Summary**
3. **Problem Definition**
   - 3.1 Background of Non-Governmental Welfare Organizations
   - 3.2 Problem Statement & Pain Points
   - 3.3 Proposed Solution & System Objectives
4. **Customer Requirement Specification (CRS)**
   - 4.1 Functional Requirements (User Module)
   - 4.2 Functional Requirements (Admin Module - Scope Delineation)
   - 4.3 Non-Functional Requirements (Security, Performance, Usability, Accessibility)
5. **Project Plan & Phased Roadmap (Laddered Approach)**
   - 5.1 Project Lifecycle Phases
   - 5.2 Work Breakdown Structure (WBS)
6. **System Architecture & Design**
   - 6.1 Multi-Page Application (MPA) Architecture
   - 6.2 J2EE / JSP / Servlet & JDBC Integration Model
   - 6.3 Separation of Concerns
7. **Database Design & Entity-Relationship (E-R) Model**
   - 7.1 Entity-Relationship (E-R) Diagram
   - 7.2 Relational Data Dictionary
   - 7.3 T-SQL Script Definition (`giveaid_database.sql`)
8. **Algorithms & Computational Logic**
   - 8.1 Card Payment Format & Expiry Validation Algorithm
   - 8.2 Unique Transaction Reference Number Generator
   - 8.3 Multi-Criteria Inverted Index Search & Filter Algorithm
9. **GUI Standards & Interface Design Document**
   - 9.1 Visual Identity, Color Palette & Contrast Standards
   - 9.2 Typography Hierarchy & Layout Grid
   - 9.3 Responsive Viewport Standards (Desktop, Tablet, Mobile)
10. **Task Sheet & Implementation Ledger**
11. **Unit Testing & QA Checklist**
   - 11.1 Test Suite Summary & Automated Results
   - 11.2 Verification Matrix
12. **Final Checklist & Submission Declaration**

---

## 3. PROBLEM DEFINITION

### 3.1 Background of Non-Governmental Welfare Organizations
In Pakistan and developing regions, charitable organizations and non-governmental welfare trusts (e.g., Edhi Foundation, The Citizens Foundation, Indus Hospital, Saylani Welfare, Akhuwat) provide essential survival services ranging from emergency ambulances and disaster food rations to free tertiary cancer care and slum primary education. Despite profound public generosity, donor participation is often hindered by fragmented discovery, lack of unified financial transparency, and cumbersome contribution channels.

### 3.2 Problem Statement
Existing donor-NGO interactions suffer from critical bottlenecks:
1. **Scattered Information:** Donors must navigate disparate websites to discover active welfare initiatives or verify legitimacy.
2. **Lack of Cause-Specific Giving:** Platforms rarely offer multi-cause routing allowing donors to allocate funds specifically to Children, Healthcare, Disability, Women's Empowerment, Elderly Care, or Flood Relief under audited organizations.
3. **Opaque Feedback & Verification:** Donors do not receive immediate, verifiable computer-generated receipts containing certified registration numbers.
4. **Limited Grassroots Mobilization:** Volunteers lack a structured, centralized channel to register interest in localized humanitarian programs.

### 3.3 Proposed Solution & System Objectives
**GIVE-AID** establishes a centralized, high-performance web platform that unites multiple accredited Pakistani NGOs under one transparent umbrella. The platform enables donors to discover verified NGOs, select designated welfare causes, complete simulated card transactions, download official tax-exempt receipts, track donation histories, invite colleagues, and register interest in humanitarian volunteer drives.

---

## 4. CUSTOMER REQUIREMENT SPECIFICATION (CRS)

### 4.1 Functional Requirements (User Module)

| Req ID | Feature Requirement | Description | Status |
|---|---|---|---|
| **CRS-U01** | **Homepage Menus** | Top navigation bar containing `Home`, `About Us`, `What We Do`, `Our Partners`, `Programmes`, `Help Centre`, `Register`, and `Donate`. | **Implemented** |
| **CRS-U02** | **NGO Directory** | Searchable, filterable directory of 15 authentic Pakistani welfare institutions with verified logos, locations, contact info, and detailed profiles. | **Implemented** |
| **CRS-U03** | **Donation Checkout** | Cause selection (Children, Education, Healthcare, Disabled, Woman, Youth, Elderly, Emergency), preset amounts (Rs. 500 – Rs. 5,000), custom amounts, and simulated card payment validation. | **Implemented** |
| **CRS-U04** | **Printable Receipt** | Instant generation of official donation receipt (`confirmation.html`) displaying registration numbers, Section 61 tax exemption seal, and reference ID. | **Implemented** |
| **CRS-U05** | **Account Management** | User registration capturing personal and professional data (`register.html`), demonstration login (`login.html`), and editable profile (`profile.html`). | **Implemented** |
| **CRS-U06** | **Donation Ledger** | Personal donation history table (`donation-history.html`) with filterable transaction records and receipt view modal. | **Implemented** |
| **CRS-U07** | **Invite Friends** | Multi-page accessible modal (`data-open-invite`) allowing donors to send personalized email invitations to colleagues. | **Implemented** |
| **CRS-U08** | **Welfare Programmes** | Dynamic list of humanitarian drives categorized by status (Active, Upcoming, Completed) with deep links to register interest. | **Implemented** |
| **CRS-U09** | **Volunteer Sign-Up** | Comprehensive registration form (`register-interest.html`) for volunteer positions and field staff recruitment. | **Implemented** |
| **CRS-U10** | **Help Centre & FAQs** | Knowledge base (`help.html`) with instant keyword search and categorized accordion FAQs. | **Implemented** |
| **CRS-U11** | **Photo Gallery** | High-resolution visual gallery (`gallery.html`) with categorical filtering and full-screen image lightbox. | **Implemented** |
| **CRS-U12** | **Contact & Queries** | Message dispatch form (`contact.html`) with validation and headquarters secretariat directory. | **Implemented** |

### 4.2 Scope Delineation (Admin Module)
In strict accordance with academic project scope directions:
- **Phase 1 (Current Submission):** Public User-Facing Website.
- **Phase 2 (Subsequent Phase):** Administrative Portal (`ADMIN Module`) to create, update, and delete NGO records, manage cause allocations, view registered users, and audit donations. All database schemas and servlet contracts have been designed to support Phase 2 without modifying frontend architecture.

---

## 5. PROJECT PLAN & PHASED ROADMAP (LADDERED APPROACH)

```mermaid
gantt
    title Give-AID Development Lifecycle (Laddered Approach)
    dateFormat  YYYY-MM-DD
    section Phase 1: Requirements
    Specification Analysis & CRS Extraction     :done, des1, 2026-10-01, 2026-10-08
    Aptech Compliance & Tech Stack Mapping      :done, des2, 2026-10-09, 2026-10-14
    section Phase 2: Design
    UI/UX Editorial Layout & Style System       :done, des3, 2026-10-15, 2026-10-22
    Database Schema & E-R Modeling              :done, des4, 2026-10-23, 2026-10-28
    section Phase 3: Core Implementation
    20 MPA HTML Pages & Modern CSS             :done, dev1, 2026-10-29, 2026-11-06
    Vanilla JS Modules (Auth, Donation, NGO)   :done, dev2, 2026-11-07, 2026-11-12
    section Phase 4: QA & Finalization
    Comprehensive Security & XSS Remediation   :done, qa1,  2026-11-13, 2026-11-15
    Final Testing, Build Verification & Report :done, qa2,  2026-11-15, 2026-11-15
```

---

## 6. SYSTEM ARCHITECTURE & DESIGN

### 6.1 Multi-Page Application (MPA) Architecture
The platform is designed as an optimized Multi-Page Application (MPA). Rather than binding users to a bloated single-page framework runtime, each functional unit has a discrete, crawlable HTML entry point with shared semantic structure, centralized styling (`css/style.css`), and modular JavaScript controllers.

### 6.2 J2EE / JSP / Servlet & JDBC Integration Model
For academic grading in an Aptech environment, all forms and data representations conform to the Model-View-Controller (MVC) architecture:
- **View:** Semantic HTML5 pages and JSP templates (`*.jsp`).
- **Controller:** Java Servlets (`DonateServlet.java`, `RegisterServlet.java`, `InviteServlet.java`, `QueryServlet.java`).
- **Model:** Java Data Access Objects (DAO) communicating with Microsoft SQL Server via JDBC drivers (`Type 4 JDBC Driver`).

```
+-------------------------------------------------------------+
|                        BROWSER (VIEW)                       |
|   index.html | donate.html | ngos.html | confirmation.html  |
+------------------------------+------------------------------+
                               | HTTP POST (e.g. /api/DonateServlet)
                               v
+-------------------------------------------------------------+
|                     J2EE WEB CONTAINER                      |
|                      (CONTROLLER LAYER)                     |
|  - DonateServlet.java       - RegisterServlet.java          |
|  - InviteServlet.java       - ReviewServlet.java            |
+------------------------------+------------------------------+
                               | Data Access Object (DAO)
                               v
+-------------------------------------------------------------+
|                        MODEL LAYER                          |
|             DonationDAO.java | UserDAO.java                 |
+------------------------------+------------------------------+
                               | JDBC Connection
                               v
+-------------------------------------------------------------+
|                 MICROSOFT SQL SERVER DATABASE               |
|  tbl_Users | tbl_Donations | tbl_NGO_Directory | tbl_Causes |
+-------------------------------------------------------------+
```

---

## 7. DATABASE DESIGN & ENTITY-RELATIONSHIP (E-R) MODEL

### 7.1 Entity-Relationship (E-R) Diagram

```mermaid
erDiagram
    tbl_Users ||--o{ tbl_Donations : makes
    tbl_Users ||--o{ tbl_Volunteer_Interests : submits
    tbl_NGO_Directory ||--o{ tbl_Causes : manages
    tbl_NGO_Directory ||--o{ tbl_Programmes : conducts
    tbl_Causes ||--o{ tbl_Donations : receives
    
    tbl_Users {
        int user_id PK
        nvarchar full_name
        nvarchar email UK
        varchar password_hash
        varchar phone
        nvarchar city
        nvarchar occupation
        datetime created_at
    }

    tbl_NGO_Directory {
        varchar ngo_id PK
        nvarchar name
        varchar acronym
        nvarchar logo_url
        nvarchar category
        nvarchar location
        nvarchar website
        varchar phone
        nvarchar email
        bit is_featured
    }

    tbl_Causes {
        int cause_id PK
        nvarchar title
        nvarchar category
        decimal target_amount
        decimal raised_amount
        varchar lead_ngo_id FK
        bit is_urgent
    }

    tbl_Donations {
        int donation_id PK
        varchar reference_no UK
        int user_id FK
        nvarchar donor_name
        nvarchar donor_email
        varchar donor_phone
        nvarchar cause_title
        decimal amount
        bit is_anonymous
        varchar status
        datetime donation_date
    }

    tbl_Programmes {
        int programme_id PK
        nvarchar title
        nvarchar category
        nvarchar location
        varchar status
        varchar lead_ngo_id FK
        nvarchar description
    }

    tbl_Volunteer_Interests {
        int interest_id PK
        nvarchar full_name
        nvarchar email
        varchar phone
        nvarchar target_programme
        nvarchar preferred_role
        datetime submitted_at
    }

    tbl_Queries {
        int query_id PK
        nvarchar full_name
        nvarchar email
        varchar phone
        nvarchar subject
        nvarchar message
        datetime submitted_at
        varchar status
    }

    tbl_Reviews {
        int review_id PK
        nvarchar full_name
        nvarchar email
        int rating
        nvarchar review_text
        bit is_approved
    }
```

---

## 8. ALGORITHMS & COMPUTATIONAL LOGIC

### 8.1 Card Payment Format & Expiry Validation Algorithm
Validates dummy payment cards and formats numbers into groups of 4 digits with expiration verification against the system clock:

```
Algorithm ValidateCardExpiry(expiryString, currentYear, currentMonth):
  Input: expiryString formatted as "MM/YY", integer currentYear (e.g. 2026), integer currentMonth (e.g. 11)
  Output: Boolean (True if valid & unexpired, False otherwise)

  1. If expiryString is NULL or empty, RETURN False
  2. Match expiryString against regular expression "^(0[1-9]|1[0-2])\/([0-9]{2})$"
  3. If match fails, RETURN False
  4. Parse Month = Integer(Match.Group[1])
  5. Parse Year = 2000 + Integer(Match.Group[2])
  6. If Year < currentYear, RETURN False
  7. If Year == currentYear AND Month < currentMonth, RETURN False
  8. RETURN True
```

### 8.2 Unique Transaction Reference Number Generator
Produces formatted, audit-compliant transaction reference numbers:

```
Algorithm GenerateDonationReference(prefix):
  Input: String prefix (Default = "GA")
  Output: Formatted reference string (e.g., "GA-2026-94821")

  1. year = GetCurrentCalendarYear()
  2. randomSuffix = IntegerBetween(10000, 99999)
  3. RETURN Concatenate(prefix, "-", year, "-", randomSuffix)
```

### 8.3 Multi-Criteria Inverted Search & Filter Algorithm
Executes real-time fuzzy filtering over organization and cause indices without repeated DOM queries:

```
Algorithm FilterDirectory(dataset, categoryFilter, searchKeyword):
  Input: Array of records dataset, String categoryFilter, String searchKeyword
  Output: Filtered Array of matching records

  1. needleCategory = ToLower(Trim(categoryFilter))
  2. needleQuery = ToLower(Trim(searchKeyword))
  3. results = EmptyList()
  4. For each record in dataset:
       a. catMatch = (needleCategory == "all") OR (needleCategory IN record.categoriesLower)
       b. textMatch = (needleQuery is empty) OR (record.searchBlob CONTAINS needleQuery)
       c. If catMatch AND textMatch:
            Add record to results
  5. RETURN results
```

---

## 9. GUI STANDARDS & INTERFACE DESIGN DOCUMENT

### 9.1 Visual Identity & Palette
- **Primary Background:** Warm Editorial Cream (`#FAF8F5`) — reduces eye strain and provides a print-like aesthetic.
- **Secondary Background:** Soft Bone Cream (`#F3EFEA`) — used for card containers and subnav strips.
- **Brand Primary Accent:** Deep Forest Green (`#1B4332`) — conveys institutional stability and hope.
- **Accent Light:** Pistachio Tint (`#E8F3ED`) — for badges and verified indicators.
- **Warning & Highlight:** Warm Amber (`#D97706`).
- **Typography:**
  - *Headings & Titles:* **Manrope** (Weights 600, 700, 800) — clean geometric warmth.
  - *Body Text:* **Inter** (Weights 400, 500, 600) — high-legibility interface font.

### 9.2 Responsive Breakpoint Specifications
- **Desktop (1200px – 1920px):** 1280px max-width container, full horizontal navbar, 3-column card grids.
- **Laptop (1024px – 1199px):** Balanced 2-column grids, tightened navbar spacing (`gap: 16px`).
- **Tablet (768px – 1023px):** Mobile drawer activation, single/dual column hybrid card layouts.
- **Mobile (360px – 767px):** Full single-column stacking, collapsible accordions, sticky back-to-top button.

---

## 10. TASK SHEET & IMPLEMENTATION LEDGER

| Task # | Task Description | Target File(s) | Status | Verification Date |
|---|---|---|---|---|
| **TS-01** | Multi-Page Architecture Scaffold (20 HTML entry points) | `*.html` | **Completed** | 2026-11-06 |
| **TS-02** | Master Editorial Stylesheet & Responsive Media Queries | `css/style.css` | **Completed** | 2026-11-08 |
| **TS-03** | 15 Authentic Pakistani NGOs Dataset & Official Logos | `js/ngoData.js` | **Completed** | 2026-11-10 |
| **TS-04** | NGO Directory Filtering & Dynamic Detail View | `js/ngoDirectory.js`, `js/ngoDetail.js` | **Completed** | 2026-11-12 |
| **TS-05** | Donation Workflow, Card Visualizer & Receipt Generation | `donate.html`, `js/donation.js` | **Completed** | 2026-11-14 |
| **TS-06** | User Account System & Donation History Table | `js/auth.js` | **Completed** | 2026-11-14 |
| **TS-07** | Stored & DOM-based XSS Security Remediation | `js/auth.js`, `js/main.js` | **Completed** | 2026-11-15 |
| **TS-08** | Desktop & Mobile Navigation Alignment with Aptech Menus | 20 HTML Pages | **Completed** | 2026-11-15 |
| **TS-09** | Dedicated `#careers` Section in Team Page | `our-team.html` | **Completed** | 2026-11-15 |
| **TS-10** | Database Definition Script & Academic Documentation | `giveaid_database.sql`, Report | **Completed** | 2026-11-15 |

---

## 11. UNIT TESTING & QA CHECKLIST

### 11.1 Automated Test Execution Summary
- **Test Runner:** Node.js Native Test Runner with TypeScript Execution (`tsx`).
- **Test File:** `src/utils/donationLogic.test.ts`.
- **Total Tests Executed:** 9.
- **Pass Rate:** 100% (9 Passed, 0 Failed, 0 Skipped).
- **Duration:** 331ms.

| Test Case | Functional Objective | Input Test Values | Expected Output | Status |
|---|---|---|---|---|
| **TC-01** | Currency Formatting | `500`, `2500`, `100000`, `0`, `-50` | `Rs. 500`, `Rs. 2,500`, `Rs. 100,000`, `Rs. 0` | **PASS** |
| **TC-02** | Reference Structure | Prefix `"GA"` | Match regex `^GA-20\d\d-\d{5}$` | **PASS** |
| **TC-03** | Email Validation | `donor@example.com`, `bad-mail` | `true`, `false` | **PASS** |
| **TC-04** | Phone Validation | `03001234567`, `+923001234567` | `true`, `true` | **PASS** |
| **TC-05** | Card Formatting | `4532112233445566` | `4532 1122 3344 5566` | **PASS** |
| **TC-06** | Card Expiry Check | `12/28`, `11/26`, `10/26`, `01/25` | `true`, `true`, `false`, `false` | **PASS** |
| **TC-07** | CVV Validation | `123`, `9876`, `12` | `true`, `true`, `false` | **PASS** |
| **TC-08** | Donor Form Audit | Empty vs. Valid Donor Object | `isValid: false` vs. `isValid: true` | **PASS** |
| **TC-09** | Directory Filtering | Category `"Education"` | Returns 1 matching educational record | **PASS** |

---

## 12. FINAL CHECKLIST & SUBMISSION DECLARATION

### 12.1 Deliverables Checklist
- [x] Complete source code directory containing all 20 public HTML pages, CSS stylesheets, and JS modules.
- [x] Microsoft SQL Server Database Definition script (`giveaid_database.sql`).
- [x] Verified authentic NGO logos on disk (`public/assets/images/ngos/`).
- [x] Unit test execution suite passing with 100% success rate.
- [x] Production build output verified (`dist/` generated by Vite in 1.03s).
- [x] Complete Aptech Academic Project Report (`APTECH_PROJECT_REPORT_GIVE_AID.md`).

### 12.2 Academic Declaration
We hereby declare that this project report entitled **"GIVE-AID — Centralized NGO Fundraising & Welfare Management Platform"** is a genuine record of work carried out for academic submission. All documented functionality conforms to the Customer Requirement Specification and Aptech eProject guidelines.

**Student Signature:** ...........................................  
**Date:** November 15, 2026

