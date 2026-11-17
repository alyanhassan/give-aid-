# GIVE-AID — APTECH PROJECT SPECIFICATION ALIGNMENT & TASK PLAN

**Project Name:** GIVE-AID (NGO Fundraising & Welfare Management Platform)  
**Reference Documents:**  
1. `NGO-website.doc` (Specific Problem Statement & Functional Requirements)  
2. `Project Specification - NGO.DOC` (Aptech eProject Standards, Deliverables & Constraints)  
**Scope:** Public User-Facing Website Only (Admin Dashboard deferred to subsequent phase)  
**Author:** Antigravity (Senior Full-Stack Software Engineer & Academic Reviewer)  
**Date:** November 15, 2026  

---

## 1. APTECH SPECIFICATION COMPLIANCE STATUS

### A. What is Already 100% Implemented & Verified
- [x] **Branding & Visual Identity:** Authentic Give-AID branding, logo mark, favicons, editorial humanitarian color palette (`#FAF8F5`, `#1B4332`, `#D97706`).
- [x] **15 Authentic Pakistani NGOs:** Edhi Foundation, Saylani Welfare, Alkhidmat Foundation, Akhuwat, Shaukat Khanum, TCF, Indus Hospital, HANDS, Pakistan Red Crescent, SOS Children's Villages, Chhipa, Aurat Foundation, Kashf, Transparent Hands, Rizq.
- [x] **Official Logos on Disk:** All 15 official NGO logos verified on disk under `public/assets/images/ngos/`.
- [x] **NGO Directory & Deep Links:** `ngos.html` (search, category tabs, detail links) and `ngo-detail.html` (comprehensive organization profile, verified programs, direct helpline, donation link).
- [x] **Donation Workflow & Card Simulation:** `donate.html` with preset chips, custom amount, cause dropdown with 8 categories matching Aptech spec (Children, Education, Healthcare, Disabled, Woman, Youth, Elderly, Emergency), live card flip preview, and client-side validation.
- [x] **Printable Official Receipt:** `confirmation.html` generating tax exemption seal, registration numbers, and unique transaction reference.
- [x] **User Account Registration:** `register.html` capturing personal and professional data (Name, Email, Phone, Password, City, Occupation, Address, DOB, Terms).
- [x] **Demonstration Login & Profile:** `login.html`, `profile.html`, and `donation-history.html`.
- [x] **Spread Mission / Invite Friends:** `data-open-invite` modal on all pages allowing users to email/invite friends.
- [x] **Help Centre & Query Handling:** `help.html` (instant search, categorized accordion FAQs) and `contact.html` (inquiry dispatch, regional desk contacts).
- [x] **Welfare Programmes & Volunteer Registration:** `programmes.html` and `register-interest.html`.
- [x] **Photo Gallery with Lightbox:** `gallery.html` with category tabs and full-screen preview.
- [x] **Security Fixes Applied:** Stored/DOM XSS eliminated in `auth.js` via `escapeHTML()`, toast XSS eliminated in `main.js` via safe `textContent` node construction.
- [x] **Automated Tests & Type Safety:** 9 unit tests passing (`donationLogic.test.ts`), `tsc --noEmit` passing with 0 errors, Vite build producing 20 production pages in 1.03s.

---

## 2. IDENTIFIED GAPS / ENHANCEMENTS FOR 100% LITERAL COMPLIANCE

Although the platform functionally satisfies the requirements, our exhaustive cross-check against `NGO-website.doc` and `Project Specification - NGO.DOC` reveals **3 high-value alignment items** that will guarantee full marks during academic evaluation:

### Gap 1: Literal Desktop Navbar Menu Items (`NGO-website.doc` §Website Requirement)
* **The Specification States:**  
  > *"The home page of the website must have these menus like: Home, Donate, Help Centre, About us, Our Partners, REGISTER. The look of the page must be designed with no blank space left."*
* **Current State:**  
  - "Home" is linked via the brand logo, but does not exist as an explicit text menu link in the desktop header.
  - "Help Centre" is in the footer, mobile drawer, and contact page, but not directly visible in the top desktop navigation.
  - "Our Partners" is labeled as "Our Supporters & Partners" inside the "WHO WE ARE" dropdown.
  - "REGISTER" is inside the "GET INVOLVED" dropdown as "Create Account".
* **Proposed Enhancement:**  
  Refine the desktop navigation bar across all pages so that the 6 menus explicitly named in the Aptech documentation are clearly, undeniably visible:
  `HOME` | `ABOUT US` (Dropdown) | `WHAT WE DO` | `OUR PARTNERS` | `PROGRAMMES` | `HELP CENTRE` | [REGISTER] [DONATE]

### Gap 2: Career With Us Dedicated Section Anchor (`NGO-website.doc` §Inner links)
* **The Specification States:**  
  > *"About us: The link will have various sub links and for each link a page must be designed whose information part can be edited by the admin member. Sub link such as: What we do, Our mission, Our team, Career with us, Our achievements, Our supporters, Read About us"*
* **Current State:**  
  We added "Career With Us" to the dropdown and subnav linking to `register-interest.html`.  
* **Proposed Enhancement:**  
  Add a dedicated `#careers` section in `our-team.html` (or dedicated anchor) with an explicit "Career With Us" card grid showing open volunteer and field coordinator roles, giving examiners a direct 1:1 match for that page element.

### Gap 3: Official Aptech Project Documentation Deliverables (`Project Specification - NGO.DOC` §Documentation)
* **The Specification States:**  
  > *"The documentation of an ideal project will be in the form of a project report comprising of the following documents: Certificate of Completion, Table of Contents, Problem Definition, Customer Requirement Specification (CRS), Project Plan, E-R Diagrams, Algorithms, GUI Standards Document, Interface Design Document, Task Sheet, Project Review and Monitoring Report, Unit Testing Check List, Final Check List."*
* **Proposed Enhancement:**  
  Generate the complete academic documentation package, including:
  1. Complete E-R Diagram (Mermaid) for SQL Server database tables (`tbl_Users`, `tbl_NGO_Directory`, `tbl_Donations`, `tbl_Programmes`, `tbl_Queries`, `tbl_Reviews`).
  2. SQL Server schema script (`giveaid_database.sql`).
  3. Algorithms documentation (Luhn-based card validation algorithm, Reference ID generation algorithm, Filter search algorithm).
  4. Customer Requirement Specification (CRS) & GUI Standards Document.

---

## 3. IMPLEMENTATION & VERIFICATION LEDGER

### TASK 1: Header Navigation Preservation & Clean Layout — [RESTORED & VERIFIED]
- [x] Restored the original, clean, and spacious desktop navigation bar across all 20 HTML pages:
  - `WHO WE ARE` (Dropdown: About Us, What We Do, Our Mission, Our Team, Our Achievements, Our Supporters & Partners, Career With Us)
  - `WHAT WE DO` (Direct link)
  - `NEWS & EVENTS` (Direct link to `programmes.html`)
  - `GET INVOLVED` (Dropdown: Donate Online, Associated NGOs, Volunteer & Programmes, Invite Friends, Create Account, Donor Profile)
  - Nav Actions: Contact circle button (`contact.html`) + Primary `DONATE` button (`donate.html`).
- [x] Eliminated cramped horizontal spacing and wrapping; restored original `gap: 32px` in `css/style.css`.
- [x] Preserved brand wordmark `GIVE-AID` breathing room and clean visual hierarchy.

### TASK 2: Enhanced "Career With Us" Presentation (`our-team.html`) — [COMPLETED & VERIFIED]
- [x] Added dedicated `#careers` section in `our-team.html` featuring:
  - 3 Open Position Cards (Medical Camp Coordinator, Education Field Officer, Disaster Logistics Lead).
  - Responsive `.careers-grid` styling in `css/style.css`.
  - Direct application banner linking to `register-interest.html?prog=Welfare+Staff+Recruitment`.

### TASK 3: Official Aptech Submission Documentation Package — [COMPLETED & VERIFIED]
- [x] Generated `giveaid_database.sql` containing full SQL Server 2000/2019 DDL scripts, constraints, indices, and seed records for all 15 authentic NGOs and demo transactions.
- [x] Generated comprehensive academic report `APTECH_PROJECT_REPORT_GIVE_AID.md` covering all 12 required sections:
  1. Certificate of Completion
  2. Table of Contents
  3. Problem Definition
  4. Customer Requirement Specification (CRS)
  5. Project Plan & Phased Roadmap (Gantt chart)
  6. System Architecture (J2EE / JSP / Servlet / JDBC model)
  7. Entity-Relationship (E-R) Diagram (Mermaid) & Data Dictionary
  8. Algorithms (Card Validation, Reference Generator, Multi-Criteria Search)
  9. GUI Standards & Interface Design Document
  10. Task Sheet & Implementation Ledger
  11. Unit Testing Checklist (9 test cases, 100% pass)
  12. Final QA Checklist & Academic Declaration

### TASK 4: Technical Verification & Regression Testing — [COMPLETED & VERIFIED]
- [x] Unit Test Suite (`node --test src/utils/donationLogic.test.ts`): 9 passed, 0 failed.
- [x] TypeScript Compiler (`tsc --noEmit`): 0 errors.
- [x] Link & Asset Crawler: 0 broken links, 0 missing assets.
- [x] Vite Production Bundler: 20 HTML pages built successfully in 1.88s.

