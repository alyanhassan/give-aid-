/**
 * Give-AID Platform — Associated NGOs Directory Data
 * Structured with consistent identifiers and properties compatible with
 * SQL Server table schema (e.g., tbl_NGO_Directory: ngo_id, name, acronym, logo_url, etc.)
 *
 * NOTE: Features 15 authentic Pakistani charitable institutions with their official logos.
 */

const NGO_DIRECTORY_DATA = [
  {
    id: 'edhi-foundation',
    name: 'Edhi Foundation',
    acronym: 'EF',
    logoUrl: '/assets/images/ngos/edhi-foundation.png',
    tagline: 'World’s largest volunteer ambulance service and nationwide welfare network',
    category: 'Disaster Relief',
    categories: ['Disaster Relief', 'Child Welfare', 'Healthcare', 'Community Development'],
    location: 'Karachi, Sindh',
    headquarters: 'Boulton Market, Mithadar, Karachi, Sindh, Pakistan',
    website: 'https://edhi.org',
    phone: '+92 21 32413232',
    email: 'info@edhi.org',
    founded: '1951',
    founder: 'Abdul Sattar Edhi & Bilquis Edhi',
    primaryCause: 'Emergency Assistance',
    causeLabel: 'Emergency Food Ration & Flood Relief',
    description: 'Providing round-the-clock emergency rescue, nationwide ambulance services, destitute burial assistance, orphanages, and shelter homes across all four provinces.',
    about: 'Founded by the revered humanitarian Abdul Sattar Edhi, the Edhi Foundation operates entirely on voluntary public donations. Its operations include a 24-hour emergency ambulance fleet, hospitals, child adoption cradles (jhoolas), homes for destitute men, women, and children, and extensive international disaster relief missions.',
    activities: [
      {
        title: 'Emergency Ambulance Fleet',
        desc: 'Over 1,800 active ambulances offering round-the-clock emergency medical evacuation, cardiac support, and road trauma response across Pakistan.'
      },
      {
        title: 'Edhi Homes & Orphan Care',
        desc: 'Providing permanent shelter, education, medical attention, and adoption processing for abandoned infants and vulnerable children.'
      },
      {
        title: 'Destitute Burial Services',
        desc: 'Conducting dignified funeral rites and burials for unclaimed bodies and impoverished citizens without financial means.'
      },
      {
        title: 'Free Dispensaries & Medical Clinics',
        desc: 'Operating subsidized outpatient clinics, maternity care, and diabetic dispensaries in low-income metropolitan and rural sectors.'
      }
    ],
    areasOfOperation: 'Nationwide coverage across all 4 provinces, Azad Jammu & Kashmir, and Gilgit-Baltistan with 300+ relief centers.',
    relatedProgramme: 'Emergency Flood Relief Ration Drive',
    isFeatured: true,
    logoBg: '#153C20',
    logoColor: '#C3DBA6'
  },
  {
    id: 'saylani-welfare',
    name: 'Saylani Welfare International Trust',
    acronym: 'SWIT',
    logoUrl: '/assets/images/ngos/saylani.png',
    tagline: 'Leading hunger relief, IT education and water sustainability initiative',
    category: 'Food Security',
    categories: ['Food Security', 'Poverty Alleviation', 'Education', 'Healthcare'],
    location: 'Karachi, Sindh',
    headquarters: 'A-25, Bahadurabad Chowrangi, Karachi, Sindh, Pakistan',
    website: 'https://www.saylaniwelfare.com',
    phone: '+92 21 111 729 526',
    email: 'info@saylaniwelfare.com',
    founded: '1999',
    founder: 'Maulana Muhammad Bashir Farooq Qadri',
    primaryCause: 'Emergency Assistance',
    causeLabel: 'Emergency Food Ration & Nutrition',
    description: 'Serving over 150,000 free warm meals daily, operating modern IT vocational institutes (SMIT), and maintaining nationwide reverse osmosis water filtration facilities.',
    about: 'Saylani Welfare International Trust is one of the largest non-profit welfare foundations in Pakistan, focusing intensely on daily poverty mitigation, food distribution (Dastarkhwan), clean drinking water plants, affordable healthcare, and youth digital skilling programs designed to foster economic independence.',
    activities: [
      {
        title: 'Daily Dastarkhwan Network',
        desc: 'Distributing over 150,000 wholesome, warm meals daily at hundreds of designated food centers across major Pakistani cities.'
      },
      {
        title: 'Saylani Mass IT Training (SMIT)',
        desc: 'Free, intensive programming and software engineering bootcamps empowering tens of thousands of youth with exportable digital skills.'
      },
      {
        title: 'Clean Water Reverse Osmosis Plants',
        desc: 'Installing and managing over 1,500 solar-powered RO filtration plants in water-scarce regions of Sindh, Balochistan, and Punjab.'
      },
      {
        title: 'Vocational & Financial Aid',
        desc: 'Micro-grants, small enterprise asset distributions (sewing machines, transport vehicles), and educational fee sponsorships.'
      }
    ],
    areasOfOperation: 'Headquartered in Karachi with expansive branch networks in Lahore, Rawalpindi, Quetta, Hyderabad, and international aid chapters.',
    relatedProgramme: 'Daily Community Food Distributions',
    isFeatured: true,
    logoBg: '#0F3025',
    logoColor: '#88D49E'
  },
  {
    id: 'alkhidmat-foundation',
    name: 'Alkhidmat Foundation Pakistan',
    acronym: 'AKFP',
    logoUrl: '/assets/images/ngos/alkhidmat.png',
    tagline: 'Dedicated to disaster management, orphan sponsorship, and health relief',
    category: 'Disaster Relief',
    categories: ['Disaster Relief', 'Child Welfare', 'Healthcare', 'Community Development'],
    location: 'Lahore, Punjab',
    headquarters: '3-A, Block A, Phase 5 D.H.A, Lahore, Punjab, Pakistan',
    website: 'https://alkhidmat.org',
    phone: '+92 42 111 003 003',
    email: 'info@alkhidmat.org',
    founded: '1990',
    founder: 'Humanitarian Council of Pakistan',
    primaryCause: 'Disaster Relief',
    causeLabel: 'Emergency Food Ration & Flood Relief',
    description: 'Premier humanitarian entity specialized in rapid disaster rescue, Aghosh orphan care complexes, community clean water schemes, and hospital diagnostics.',
    about: 'Alkhidmat Foundation is among Pakistan’s most established non-governmental disaster response and social welfare networks. It delivers humanitarian relief during floods, earthquakes, and emergencies, while operating specialized educational residential facilities for orphan children under its Aghosh Program.',
    activities: [
      {
        title: 'Disaster Emergency Management',
        desc: 'Rapid emergency rescue teams, boat evacuations during riverine floods, and post-crisis prefabricated shelter construction.'
      },
      {
        title: 'Aghosh Orphan Care Homes',
        desc: 'Modern boarding schools providing residential living, nutritious diets, sports facilities, and holistic education for parentless children.'
      },
      {
        title: 'Clean Water Scheme',
        desc: 'Installing water filtration plants, deep solar tubewells, and hand pumps in desert zones including Tharparkar and Thar.'
      },
      {
        title: 'Mobile Diagnostics & Blood Banks',
        desc: 'Operating secondary hospitals, specialized diagnostic labs, and mobile health vans reaching remote rural communities.'
      }
    ],
    areasOfOperation: 'Operating in all 150+ administrative districts of Pakistan with dedicated field volunteer units.',
    relatedProgramme: 'Winter Warmth Blankets Logistics',
    isFeatured: false,
    logoBg: '#133B26',
    logoColor: '#A7DEB4'
  },
  {
    id: 'akhuwat-foundation',
    name: 'Akhuwat Foundation',
    acronym: 'AF',
    logoUrl: '/assets/images/ngos/akhuwat-trimmed.png',
    expandLogo: true,
    tagline: 'Pioneering interest-free microfinance and tuition-free higher education',
    category: 'Poverty Alleviation',
    categories: ['Poverty Alleviation', 'Education', 'Healthcare', 'Community Development'],
    location: 'Lahore, Punjab',
    headquarters: '19 Civic Center, Sector A-2, Township, Lahore, Punjab, Pakistan',
    website: 'https://akhuwat.org.pk',
    phone: '+92 42 111 448 464',
    email: 'info@akhuwat.org.pk',
    founded: '2001',
    founder: 'Dr. Muhammad Amjad Saqib',
    primaryCause: 'Youth Development',
    causeLabel: 'Youth Tech & Vocational Training',
    description: 'World’s largest interest-free microfinance organization, offering Qarz-e-Hasna micro-enterprise loans and Pakistan’s first tuition-free university.',
    about: 'Akhuwat was established to create a poverty-free society built upon mutual solidarity and compassion (Mu’akhaat). Utilizing local places of worship as disbursement centers, it has disbursed over Rs. 180 billion in interest-free loans with a historic 99.8% recovery rate.',
    activities: [
      {
        title: 'Interest-Free Microfinance (Qarz-e-Hasna)',
        desc: 'Micro-loans enabling micro-entrepreneurs, artisans, and women to launch self-sustaining small enterprises with zero interest.'
      },
      {
        title: 'Akhuwat College & First Tuition-Free University',
        desc: 'Residential higher education colleges admitting meritorious youth from underprivileged districts with 100% scholarship.'
      },
      {
        title: 'Akhuwat Clothes Bank',
        desc: 'Collecting, repairing, dry-cleaning, and packaging dignity clothing for underprivileged households across the country.'
      },
      {
        title: 'Transgender & Marginalized Community Welfare',
        desc: 'Providing monthly living stipends, vocational training, and psychological counseling for marginalized gender communities.'
      }
    ],
    areasOfOperation: 'Over 850 branches operating across 400+ cities and towns across Pakistan.',
    relatedProgramme: 'Youth Coding & Digital Literacy BootCamp',
    isFeatured: true,
    logoBg: '#1E3E26',
    logoColor: '#C7E5B5'
  },
  {
    id: 'shaukat-khanum',
    name: 'Shaukat Khanum Memorial Cancer Hospital',
    acronym: 'SKMCH',
    logoUrl: '/assets/images/ngos/shaukat-khanum-trimmed.png',
    expandLogo: true,
    tagline: 'Excellence in oncology care with free cancer treatment for underprivileged patients',
    category: 'Healthcare',
    categories: ['Healthcare', 'Community Development'],
    location: 'Lahore, Punjab',
    headquarters: '7-A Block R-3, Johar Town, Lahore, Punjab, Pakistan',
    website: 'https://shaukatkhanum.org.pk',
    phone: '+92 42 35905000',
    email: 'info@skm.org.pk',
    founded: '1994',
    founder: 'Imran Khan',
    primaryCause: 'Healthcare',
    causeLabel: 'Healthcare & Dialysis Fund',
    description: 'Providing world-class diagnostic oncology and cancer therapy free of charge to over 75% of indigent patients through philanthropic zakat and donations.',
    about: 'Shaukat Khanum Memorial Cancer Hospital and Research Centre is Pakistan’s foremost specialized tertiary oncology institution. Accredited by the Joint Commission International (JCI), SKMCH ensures that economic inability never prevents a cancer patient from receiving internationally standard radiation, surgery, and chemotherapy.',
    activities: [
      {
        title: 'Comprehensive Oncology Treatment',
        desc: 'State-of-the-art chemotherapy, robotic radiation oncology, pediatric cancer wards, and oncology surgery.'
      },
      {
        title: 'Cancer Research & Clinical Trials',
        desc: 'Epidemiological cancer registry and genomic research exploring regional genetic risk factors in Pakistan.'
      },
      {
        title: 'Diagnostic Walk-in Clinics & Labs',
        desc: 'Nationwide network of 200+ specialized diagnostic laboratory collection centres and walk-in breast cancer screening units.'
      },
      {
        title: 'Financial Aid & Full Subsidy',
        desc: 'Fiduciary assessment allocating 100% fee waivers for medicine, hospital stays, and post-operative monitoring for needy patients.'
      }
    ],
    areasOfOperation: 'Hospitals in Lahore and Peshawar, full-scale cancer hospital under development in Karachi, and diagnostic centers nationwide.',
    relatedProgramme: 'Healthcare Subsidy & Patient Welfare',
    isFeatured: false,
    logoBg: '#092716',
    logoColor: '#C3DBA6'
  },
  {
    id: 'the-citizens-foundation',
    name: 'The Citizens Foundation (TCF)',
    acronym: 'TCF',
    logoUrl: '/assets/images/ngos/tcf-trimmed.png',
    expandLogo: true,
    tagline: 'Transforming education in rural and urban slums with purpose-built schools',
    category: 'Education',
    categories: ['Education', 'Child Welfare', 'Women\'s Empowerment'],
    location: 'Karachi, Sindh',
    headquarters: 'Plot No. 20, Sector 22, Korangi Industrial Area, Karachi, Sindh, Pakistan',
    website: 'https://www.tcf.org.pk',
    phone: '+92 21 111 823 823',
    email: 'info@tcf.org.pk',
    founded: '1995',
    founder: 'A coalition of business leaders and educationists',
    primaryCause: 'Education',
    causeLabel: 'Slum School Education & Scholarships',
    description: 'Managing 1,900+ purpose-built school campuses with an all-female faculty, educating over 280,000 underprivileged children with balanced gender equality.',
    about: 'The Citizens Foundation is one of Pakistan’s largest non-profit organizations in the education sector. TCF removes barriers to learning by establishing modern school campuses in the heart of urban slums and isolated rural settlements, requiring an all-female teaching staff to encourage conservative families to enroll female students.',
    activities: [
      {
        title: 'Formal K-10 Purpose-Built Schooling',
        desc: 'Over 1,900 campuses featuring science labs, libraries, clean sanitation, and arts rooms adhering to high instructional standards.'
      },
      {
        title: 'All-Female Educator Employment',
        desc: 'Employing over 13,000 professional female educators and school principals, providing dignified rural career opportunities.'
      },
      {
        title: 'Alumni Higher Education Scholarships',
        desc: 'Mentorship and university tuition sponsorship placing slum graduates into IBA, LUMS, NED, and international colleges.'
      },
      {
        title: 'Adult Female Literacy Programme (Aagahi)',
        desc: 'Evening community literacy modules teaching mothers basic arithmetic, reading, and financial management.'
      }
    ],
    areasOfOperation: 'Over 1,900 operational school campuses across 700+ towns, cities, and rural villages nationwide.',
    relatedProgramme: 'Slum Primary Education & Supplies Drive',
    isFeatured: true,
    logoBg: '#1B4728',
    logoColor: '#D2EDBC'
  },
  {
    id: 'indus-hospital',
    name: 'Indus Hospital & Health Network',
    acronym: 'IHHN',
    logoUrl: '/assets/images/ngos/indus-hospital-trimmed.png',
    expandLogo: true,
    tagline: 'Free, high-quality, paperless tertiary healthcare for every human being',
    category: 'Healthcare',
    categories: ['Healthcare', 'Community Development'],
    location: 'Karachi, Sindh',
    headquarters: 'Plot C-76, Sector 31/5, Korangi Crossing, Karachi, Sindh, Pakistan',
    website: 'https://indushospital.org.pk',
    phone: '+92 21 111 111 444',
    email: 'info@tih.org.pk',
    founded: '2007',
    founder: 'Dr. Abdul Bari Khan and fellow doctors',
    primaryCause: 'Healthcare',
    causeLabel: 'Healthcare & Dialysis Fund',
    description: 'Providing 100% free multidisciplinary tertiary care, pediatric oncology, hemodialysis, and emergency cardiac surgery with uncompromising human dignity.',
    about: 'Indus Hospital & Health Network is an innovative multi-hospital network offering completely free medical treatment with no billing counter on site. It has expanded from a single hospital in Karachi to a nationwide healthcare system handling millions of outpatient and inpatient cases annually without charging a single rupee.',
    activities: [
      {
        title: 'Paperless Tertiary Care',
        desc: 'Fully digitized electronic health records coordinating cardiology, neurosurgery, orthopedic trauma, and nephrology.'
      },
      {
        title: 'Pediatric Oncology & Blood Diseases',
        desc: 'Specialized 100-bed childhood cancer center offering chemotherapy and supportive housing for family guardians.'
      },
      {
        title: 'Subsidized Dialysis & Kidney Care',
        desc: 'Comprehensive renal replacement therapy and hemodialysis cycles preventing family bankruptcy among kidney patients.'
      },
      {
        title: 'Mobile Health Vans & Rural Outreach',
        desc: 'Outreach vans equipped with X-ray, ultrasound, and lab testing touring rural areas with high maternal and child mortality.'
      }
    ],
    areasOfOperation: 'Multi-campus network across Karachi, Muzaffargarh, Badin, Lahore, Multan, and remote district health programs.',
    relatedProgramme: 'Karachi Slum Free Eye & Health Camp',
    isFeatured: true,
    logoBg: '#10351F',
    logoColor: '#BEE7A9'
  },
  {
    id: 'hands-pakistan',
    name: 'HANDS Pakistan',
    acronym: 'HANDS',
    logoUrl: '/assets/images/ngos/hands-trimmed.png',
    expandLogo: true,
    tagline: 'Integrated community empowerment, health, and post-disaster rehabilitation',
    category: 'Community Development',
    categories: ['Community Development', 'Disaster Relief', 'Healthcare', 'Education'],
    location: 'Karachi, Sindh',
    headquarters: '140-C, Block 2, PECHS, Karachi, Sindh, Pakistan',
    website: 'https://hands.org.pk',
    phone: '+92 21 111 042 637',
    email: 'info@hands.org.pk',
    founded: '1979',
    founder: 'Prof. A. G. Billoo',
    primaryCause: 'Community Development',
    causeLabel: 'Community Welfare & Empowerment',
    description: 'Operating in 60+ districts across Pakistan with comprehensive programs in community health, clean water, disaster-resilient housing, and basic education.',
    about: 'Health And Nutrition Development Society (HANDS) is one of Pakistan’s largest indigenous non-profit institutions in integrated rural development. Serving millions in rural communities, HANDS blends community mobilization with technical interventions in water, sanitation, livelihood generation, and disaster rehabilitation.',
    activities: [
      {
        title: 'Disaster Resilient Housing',
        desc: 'Constructing climate-resilient brick and lime homes for families displaced by historic riverine monsoon flooding.'
      },
      {
        title: 'Maternal, Neonatal & Child Health',
        desc: 'Training community midwives and establishing rural birthing stations to decrease infant and maternal mortality.'
      },
      {
        title: 'Water, Sanitation & Hygiene (WASH)',
        desc: 'Building village community toilets, solar filtration plants, and hygiene education in primary schools.'
      },
      {
        title: 'Micro-Enterprise Livelihoods',
        desc: 'Vocational skills for youth and women, livestock asset transfers, and agricultural cooperative financing.'
      }
    ],
    areasOfOperation: 'Direct field presence in over 60 administrative districts across Sindh, Punjab, Balochistan, and Khyber Pakhtunkhwa.',
    relatedProgramme: 'Emergency Flood Relief Ration Drive',
    isFeatured: false,
    logoBg: '#143C22',
    logoColor: '#C4E1AC'
  },
  {
    id: 'red-crescent',
    name: 'Pakistan Red Crescent Society',
    acronym: 'PRCS',
    logoUrl: '/assets/images/ngos/pakistan-red-crescent-trimmed.png',
    expandLogo: true,
    tagline: 'Auxiliary humanitarian emergency responder and national voluntary blood service',
    category: 'Disaster Relief',
    categories: ['Disaster Relief', 'Healthcare', 'Community Development'],
    location: 'Islamabad, Federal Capital',
    headquarters: 'National Headquarters, Sector H-8, Islamabad, Pakistan',
    website: 'https://www.prcs.org.pk',
    phone: '+92 51 9250404',
    email: 'info@prcs.org.pk',
    founded: '1947',
    founder: 'Quaid-e-Azam Muhammad Ali Jinnah',
    primaryCause: 'Emergency Assistance',
    causeLabel: 'Emergency Food Ration & Flood Relief',
    description: 'Statutory humanitarian relief organization affiliated with the International Red Cross & Red Crescent Movement, providing rapid disaster response and safe blood transfusions.',
    about: 'Established shortly after Pakistan’s independence by Quaid-e-Azam Muhammad Ali Jinnah, the Pakistan Red Crescent Society acts as an auxiliary to public authorities in humanitarian efforts. It leads national first-aid trainings, safe voluntary blood banking, climate resilience drives, and frontline disaster rescue operations.',
    activities: [
      {
        title: 'Disaster Preparedness & Response',
        desc: 'Mobilizing trained emergency response teams, tent shelters, water purification units, and medical field camps during disasters.'
      },
      {
        title: 'Voluntary Blood Donor Network',
        desc: 'Operating safe, certified blood banks and screening for thalassemia patients and road accident casualties.'
      },
      {
        title: 'First Aid & Life Support Training',
        desc: 'Training over 100,000 students, volunteers, and corporate professionals annually in vital emergency CPR and first aid.'
      },
      {
        title: 'Climate Adaptation & Youth Volunteering',
        desc: 'Empowering a national youth volunteer corps for urban tree plantation, heatwave mitigation, and civic awareness.'
      }
    ],
    areasOfOperation: 'Provincial headquarters in all provincial capitals with district branches in over 90 districts across the country.',
    relatedProgramme: 'Winter Warmth Blankets Logistics',
    isFeatured: false,
    logoBg: '#173E1E',
    logoColor: '#C2DBA6'
  },
  {
    id: 'sos-childrens-villages',
    name: 'SOS Children\'s Villages Pakistan',
    acronym: 'SOS',
    logoUrl: '/assets/images/ngos/sos-villages.png',
    expandLogo: true,
    tagline: 'Permanent family-style homes and educational security for parentless children',
    category: 'Child Welfare',
    categories: ['Child Welfare', 'Education', 'Poverty Alleviation'],
    location: 'Lahore, Punjab',
    headquarters: 'Ferozepur Road, Lahore, Punjab, Pakistan',
    website: 'https://www.sos.org.pk',
    phone: '+92 42 35917807',
    email: 'national@sos.org.pk',
    founded: '1975',
    founder: 'Souriya Anwar',
    primaryCause: 'Children\'s Welfare',
    causeLabel: 'Children\'s Welfare & Nutrition',
    description: 'Providing lifelong family-based homes, loving foster mothers, high-quality schooling, and vocational training for orphaned and abandoned children.',
    about: 'SOS Children’s Villages Pakistan provides an alternative family model for children who have lost parental care. Children reside in individual houses supervised by a trained SOS Mother alongside foster siblings, ensuring emotional security, psychological healing, and high-quality schooling through university graduation.',
    activities: [
      {
        title: 'Family Village Living',
        desc: 'Self-contained residential villages where parentless children grow up in secure homes with foster mothers and brothers and sisters.'
      },
      {
        title: 'Hermann Gmeiner Schools',
        desc: 'Quality community schools offering primary and matriculation curricula to village children and deserving local pupils.'
      },
      {
        title: 'Youth Facilities & Semi-Independent Living',
        desc: 'Adolescent facilities providing vocational guidance, career counseling, and university stipend support for young adults.'
      },
      {
        title: 'Emergency Child Welfare Relief',
        desc: 'Family strengthening programs offering financial support to widowed mothers to prevent children from entering orphanages.'
      }
    ],
    areasOfOperation: 'Operating 15+ purpose-built children’s villages in Lahore, Karachi, Rawalpindi, Peshawar, Multan, Faisalabad, Quetta, and Sialkot.',
    relatedProgramme: 'Children’s Welfare Support Fund',
    isFeatured: false,
    logoBg: '#0A2A17',
    logoColor: '#B6E19E'
  },
  {
    id: 'chhipa-welfare',
    name: 'Chhipa Welfare Association',
    acronym: 'CWA',
    logoUrl: '/assets/images/ngos/chhipa-trimmed.png',
    expandLogo: true,
    tagline: 'Rapid emergency ambulance service and warm daily community meal feeding',
    category: 'Disaster Relief',
    categories: ['Disaster Relief', 'Food Security', 'Healthcare', 'Community Development'],
    location: 'Karachi, Sindh',
    headquarters: 'Chhipa Ambulance Head Office, Opp. FTC, Shahrah-e-Faisal, Karachi, Pakistan',
    website: 'https://chhipa.org',
    phone: '+92 21 111 92 1020',
    email: 'info@chhipa.org',
    founded: '2007',
    founder: 'Muhammad Ramzan Chhipa',
    primaryCause: 'Emergency Assistance',
    causeLabel: 'Emergency Food Ration & Flood Relief',
    description: 'Operating a fleet of rapid-response ambulances, daily public Dastarkhwan food kitchens, and emergency infant cradles stationed across urban intersections.',
    about: 'Chhipa Welfare Association is a widely recognized humanitarian emergency organization in Karachi and neighboring areas. It provides immediate rescue to accident victims, distributes warm meals twice daily to daily wage earners, supplies free medicines to destitute hospital patients, and maintains humanitarian orphan cradles.',
    activities: [
      {
        title: 'Chhipa Ambulance Rescue Network',
        desc: 'First responder fleet stationed at high-traffic intersections, providing emergency transportation to trauma hospitals.'
      },
      {
        title: 'Chhipa Dastarkhwan Hot Meals',
        desc: 'Serving thousands of fresh, hot meals twice daily to laborers, rickshaw drivers, and indigent citizens.'
      },
      {
        title: 'Free Medicines for Hospital Patients',
        desc: 'Supplying emergency prescriptions and surgical disposables directly to patients admitted in government hospitals.'
      },
      {
        title: 'Chhipa Jhoola Child Protection',
        desc: 'Life-saving cradles installed outside emergency rescue points for safe, confidential surrender of infants.'
      }
    ],
    areasOfOperation: 'Headquartered in Karachi with extensive emergency points across major highway arteries and urban centers in Sindh.',
    relatedProgramme: 'Emergency Flood Relief Ration Drive',
    isFeatured: false,
    logoBg: '#12391F',
    logoColor: '#C4E1A7'
  },
  {
    id: 'aurat-foundation',
    name: 'Aurat Foundation',
    acronym: 'AF-PK',
    logoUrl: '/assets/images/ngos/aurat-foundation-trimmed.png',
    expandLogo: true,
    tagline: 'Pioneering women’s legal rights, civic empowerment, and social justice advocacy',
    category: 'Women\'s Empowerment',
    categories: ['Women\'s Empowerment', 'Community Development', 'Education'],
    location: 'Islamabad, Federal Capital',
    headquarters: 'House 16, Street 67, Sector G-6/4, Islamabad, Pakistan',
    website: 'https://www.af.org.pk',
    phone: '+92 51 2831350',
    email: 'headoffice@af.org.pk',
    founded: '1986',
    founder: 'Nigar Ahmad and Shahla Zia',
    primaryCause: 'Women\'s Empowerment',
    causeLabel: 'Women\'s Vocational Skill Centre',
    description: 'Leading civil society institution working for female political participation, combating gender violence, and securing legal aid for marginalized women.',
    about: 'Aurat Publication and Information Service Foundation (Aurat Foundation) has spent nearly four decades working for women’s social, economic, and political rights. It coordinates grassroots networks, legal counseling, policy reform, and awareness campaigns to ensure that Pakistani women lead lives free from discrimination and violence.',
    activities: [
      {
        title: 'Legal Aid & Crisis Counseling',
        desc: 'Providing pro-bono legal representation, psychological aid, and shelter referral for survivors of gender-based violence.'
      },
      {
        title: 'Civic & Voter Education',
        desc: 'Mobilizing rural female CNIC registration and voter turnout to expand women’s representation in democratic forums.'
      },
      {
        title: 'Policy Advocacy & Legislative Drafting',
        desc: 'Partnering with lawmakers to formulate domestic violence protection, anti-harassment, and workplace rights legislation.'
      },
      {
        title: 'Community Citizen Action Committees',
        desc: 'Establishing local village vigilance groups to resolve domestic grievances and protect girl child schooling rights.'
      }
    ],
    areasOfOperation: 'National headquarters in Islamabad with provincial offices in Lahore, Karachi, Peshawar, and Quetta.',
    relatedProgramme: 'Women’s Vocational Empowerment Workshop',
    isFeatured: false,
    logoBg: '#194223',
    logoColor: '#C8E4B0'
  },
  {
    id: 'kashf-foundation',
    name: 'Kashf Foundation',
    acronym: 'KF',
    logoUrl: '/assets/images/ngos/kashf-foundation-trimmed.png',
    expandLogo: true,
    tagline: 'Empowering women micro-entrepreneurs through specialized financial inclusion',
    category: 'Women\'s Empowerment',
    categories: ['Women\'s Empowerment', 'Poverty Alleviation', 'Community Development'],
    location: 'Lahore, Punjab',
    headquarters: '19-A, S Block, Gulberg II, Lahore, Punjab, Pakistan',
    website: 'https://kashf.org',
    phone: '+92 42 111 981 981',
    email: 'info@kashf.org',
    founded: '1996',
    founder: 'Roshaneh Zafar',
    primaryCause: 'Women\'s Empowerment',
    causeLabel: 'Women\'s Vocational Skill Centre',
    description: 'First specialized microfinance institution in Pakistan targeted at low-income female entrepreneurs, providing financial literacy, micro-loans, and micro-health insurance.',
    about: 'Kashf Foundation was established following Grameen Bank principles to transform the financial autonomy of women from low-income households. Beyond enterprise loans, Kashf delivers financial education, business incubation, theater-based community campaigns against child marriage, and access to emergency health insurance.',
    activities: [
      {
        title: 'Female Micro-Enterprise Financing',
        desc: 'Collateral-free micro-loans enabling women to purchase sewing equipment, livestock, embroidery goods, and grocery kiosks.'
      },
      {
        title: 'Financial Literacy & Bookkeeping',
        desc: 'Practical modules teaching budgeting, emergency savings, bank account operations, and digital mobile wallet transactions.'
      },
      {
        title: 'Micro-Health Insurance Coverage',
        desc: 'Inpatient health insurance protecting borrower families from medical poverty during unexpected hospitalizations.'
      },
      {
        title: 'Social Advocacy Through Community Theater',
        desc: 'Street theater modules discussing women’s inheritance, girls’ schooling, and prevention of domestic violence.'
      }
    ],
    areasOfOperation: 'Branch network across 60+ districts in Punjab, Sindh, Khyber Pakhtunkhwa, and ICT.',
    relatedProgramme: 'Women’s Vocational Empowerment Workshop',
    isFeatured: false,
    logoBg: '#153A1F',
    logoColor: '#D0EDB7'
  },
  {
    id: 'transparent-hands',
    name: 'Transparent Hands',
    acronym: 'TH',
    logoUrl: '/assets/images/ngos/transparent-hands-trimmed.png',
    expandLogo: true,
    tagline: 'Crowdfunding platform funding life-saving surgeries for underprivileged citizens',
    category: 'Healthcare',
    categories: ['Healthcare', 'Community Development'],
    location: 'Lahore, Punjab',
    headquarters: 'Plot 31, Block C-2, Gulberg III, Lahore, Punjab, Pakistan',
    website: 'https://www.transparenthands.org',
    phone: '+92 42 32560300',
    email: 'info@transparenthands.org',
    founded: '2014',
    founder: 'Rameez Anis & Kaz Anis',
    primaryCause: 'Healthcare',
    causeLabel: 'Healthcare & Dialysis Fund',
    description: 'Pioneering surgical crowdfunding platform connecting impoverished patients requiring heart surgeries, cochlear implants, and orthopedic operations with global donors.',
    about: 'Transparent Hands provides surgical care and medical camps to underprivileged citizens across Pakistan. Using a transparent web platform, donors can see verified patient medical histories, track donation milestones, and inspect post-operative hospital discharge slips and photographs.',
    activities: [
      {
        title: 'Free Complex Surgeries',
        desc: 'Financing congenital heart defect repairs, pediatric cochlear implants, cataract surgeries, and orthopedic procedures.'
      },
      {
        title: 'Rural Preventive Medical Camps',
        desc: 'Conducting free medical camps with consultations, ultrasound, blood tests, hepatitis screenings, and free medication.'
      },
      {
        title: 'Verified Transparent Tracking',
        desc: 'Publishing itemized hospital invoices and verified medical outcomes for every patient treated through the platform.'
      },
      {
        title: 'Maternal Healthcare & Gynaecology',
        desc: 'Subsidizing safe cesarean deliveries and neonatal care for mothers lacking funds at accredited private partner hospitals.'
      }
    ],
    areasOfOperation: 'Operations focused across rural and peri-urban areas of Punjab, Sindh, and Khyber Pakhtunkhwa.',
    relatedProgramme: 'Karachi Slum Free Eye & Health Camp',
    isFeatured: false,
    logoBg: '#11351E',
    logoColor: '#BCE4A4'
  },
  {
    id: 'rizq',
    name: 'Rizq',
    acronym: 'RIZQ',
    logoUrl: '/assets/images/ngos/rizq-trimmed.png',
    expandLogo: true,
    tagline: 'Fighting hunger and food waste to build a food-secure Pakistan',
    category: 'Food Security',
    categories: ['Food Security', 'Poverty Alleviation', 'Community Development'],
    location: 'Lahore, Punjab',
    headquarters: '17-B, Sector C, Commercial Area, Bahria Town, Lahore, Pakistan',
    website: 'https://sharerizq.com',
    phone: '+92 42 111 749 749',
    email: 'info@sharerizq.com',
    founded: '2015',
    founder: 'Huzaifa Ahmad, Qasim Javaid, and Musa Aamir',
    primaryCause: 'Emergency Assistance',
    causeLabel: 'Emergency Food Ration & Nutrition',
    description: 'Youth-led food security movement tackling hunger through food rescue networks, monthly ration banks, and community food banks.',
    about: 'Rizq was founded by LUMS graduates dedicated to creating a hunger-free Pakistan. It operates food distribution hubs, rescues surplus food from restaurants and wedding banquets, and runs the Rizq Bank, which delivers monthly nutrient-balanced grain rations to verified vulnerable families.',
    activities: [
      {
        title: 'Rizq Bank Monthly Rations',
        desc: 'Delivering balanced monthly dry ration boxes (flour, pulses, oil, sugar) to destitute households, widows, and orphans.'
      },
      {
        title: 'Food Cloud & Excess Food Rescue',
        desc: 'Logistics network collecting safe surplus food from wedding venues, corporate cafeterias, and restaurants for immediate distribution.'
      },
      {
        title: 'Rizq Khawan Hot Meals',
        desc: 'Subsidized community kitchen serving dignified meals for low-wage laborers and homeless individuals.'
      },
      {
        title: 'School Nutrition Programs',
        desc: 'Providing daily boiled eggs, milk, and fruit to underprivileged primary school students to combat childhood stunting.'
      }
    ],
    areasOfOperation: 'Active in Lahore, Rawalpindi, Islamabad, and Karachi, partnering with university volunteer networks.',
    relatedProgramme: 'Daily Community Food Distributions',
    isFeatured: false,
    logoBg: '#174021',
    logoColor: '#D3F1BC'
  }
];

// Helper functions for easy querying
if (typeof window !== 'undefined') {
  window.NGO_DIRECTORY_DATA = NGO_DIRECTORY_DATA;

  window.getAllNGOs = function() {
    return NGO_DIRECTORY_DATA;
  };

  window.getNGOById = function(id) {
    if (!id) return null;
    const cleanId = String(id).toLowerCase().trim();
    return NGO_DIRECTORY_DATA.find(n => n.id === cleanId) || null;
  };

  window.getFeaturedNGOs = function(limit = 5) {
    return NGO_DIRECTORY_DATA.filter(n => n.isFeatured).slice(0, limit);
  };

  window.getNGOsByCategory = function(category) {
    if (!category || category === 'all' || category === 'All Organizations') {
      return NGO_DIRECTORY_DATA;
    }
    const cleanCat = String(category).toLowerCase().trim();
    return NGO_DIRECTORY_DATA.filter(n => {
      const matchPrimary = n.category.toLowerCase().includes(cleanCat);
      const matchSecondary = n.categories.some(c => c.toLowerCase().includes(cleanCat));
      return matchPrimary || matchSecondary;
    });
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NGO_DIRECTORY_DATA
  };
}
