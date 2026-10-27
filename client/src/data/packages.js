export const packageNote = "Note: All plan pricing reflects our strategic management and creative production fee. Paid advertising media budgets (Meta, Google, YouTube) are paid directly to ad platforms and are separate from our agency service fee.";

export const marketingPackages = [
  {
    id: "starter",
    name: "STARTER",
    price: "₹15,000",
    period: "month",
    badge: "Foundation",
    isPopular: false,
    headerTheme: "default",
    description: "Ideal for early-stage ventures and local businesses establishing their primary digital footprint and social presence.",
    features: [
      "12 Custom Social Media Posts / Month",
      "Instagram & Facebook Account Management",
      "Essential Content Strategy & Hashtag Research",
      "Monthly Performance & Analytics Report",
      "Basic Community Engagement & Support",
      "WhatsApp & Email Support"
    ],
    ctaText: "Choose Starter",
    ctaLink: "/about?package=starter#contact-form"
  },
  {
    id: "growth",
    name: "GROWTH",
    price: "₹25,000",
    period: "month",
    badge: "Most Popular",
    isPopular: true,
    headerTheme: "teal",
    description: "Designed for ambitious businesses ready to accelerate qualified inbound leads, sales pipeline, and social market share.",
    features: [
      "20 Custom Social Posts + 4 High-Impact Reels",
      "Meta Ads Management (Facebook & Instagram)",
      "Target Audience Research & Lead Funnel Setup",
      "Bi-Weekly Ad Copy & Creative Iteration",
      "Active Daily Community & Comment Moderation",
      "Conversion Tracking & Pixel / CAPI Integration",
      "Bi-Weekly Performance Reviews + Growth Calls",
      "Priority WhatsApp Strategist Access"
    ],
    ctaText: "Choose Growth",
    ctaLink: "/about?package=growth#contact-form"
  },
  {
    id: "scale",
    name: "SCALE",
    price: "₹35,000",
    period: "month",
    badge: "Maximum Impact",
    isPopular: false,
    headerTheme: "default",
    description: "A comprehensive omnichannel growth suite for businesses seeking complete digital market domination and aggressive scale.",
    features: [
      "30 Custom Posts + 8 Reels / Short-Form Videos",
      "Multi-Channel Ads (Meta Ads + Google Ads + YouTube)",
      "Advanced Retargeting Sequences & Dynamic Catalog Ads",
      "High-Converting Ad Creatives & Video Hook Testing",
      "Influencer Outreach & Collaboration Management",
      "Dedicated Senior Growth Strategist & Media Buyer",
      "Weekly Live Strategy & ROI Review Sessions",
      "24/7 Dedicated Priority Hotline"
    ],
    ctaText: "Choose Scale",
    ctaLink: "/about?package=scale#contact-form"
  }
];

export const webPlans = [
  {
    id: "portfolio",
    name: "Portfolio / Starter Site",
    priceRange: "₹15,000 – ₹25,000",
    timeline: "5 – 7 Days Delivery",
    target: "Freelancers, Consultants, Creative Professionals, Single-Service Startups",
    features: [
      "1 to 5 Fully Responsive Custom Pages",
      "Mobile-First & Ultra-Fast Loading Design",
      "Contact & Inquiry Form with Instant Email Alerts",
      "Social Media Feeds & WhatsApp Chat Integration",
      "Basic On-Page SEO & Google Search Console Setup",
      "1 Month Free Post-Launch Maintenance Support"
    ],
    ctaText: "Build My Portfolio",
    ctaLink: "/about?service=website&plan=portfolio#contact-form"
  },
  {
    id: "business",
    name: "Business Website",
    priceRange: "₹30,000 – ₹60,000",
    timeline: "10 – 15 Days Delivery",
    target: "Corporate Entities, Clinics, Agencies, Real Estate & Established SMBs",
    features: [
      "5 to 15 Structured Dynamic Pages & Sub-pages",
      "Custom UI/UX Wireframing & Interactive Prototype",
      "Lead Capture Funnels & CRM/Google Sheet Integration",
      "Blog / Case Studies Engine & CMS Architecture",
      "Comprehensive Technical SEO & Speed Optimization",
      "SSL Certificate, Hosting Setup & Security Hardening",
      "3 Months Free Post-Launch Maintenance & Backups"
    ],
    ctaText: "Build Business Site",
    ctaLink: "/about?service=website&plan=business#contact-form"
  },
  {
    id: "ecommerce",
    name: "E-Commerce Platform",
    priceRange: "₹60,000 – ₹1,50,000",
    timeline: "20 – 30 Days Delivery",
    target: "D2C Brands, Retailers, Wholesalers & Multi-Product Catalogs",
    features: [
      "Unlimited Products with Categories, Filters & Search",
      "Razorpay, Stripe & UPI Payment Gateway Integration",
      "Automated Shipping, Courier APIs & Tracking",
      "Abandoned Cart Recovery Email & WhatsApp Flows",
      "Customer Account Dashboard, Wishlist & Reviews",
      "High-Traffic Server Architecture & Core Web Vitals 95+",
      "6 Months Comprehensive Priority Tech Support"
    ],
    ctaText: "Build E-Commerce",
    ctaLink: "/about?service=website&plan=ecommerce#contact-form"
  }
];
