# AADHYA ENTERPRISES — D2C Ayurvedic E-Commerce Platform & Admin Suite

> **Production-Grade Direct-to-Consumer (D2C) Ayurvedic Commerce Platform** built for **AADHYA ENTERPRISES**, Hathras, Uttar Pradesh.

---

## 🌿 Business Identity & Location

- **Legal Business Name:** AADHYA ENTERPRISES
- **Operating Premises:** B.H Oil Meal Road, Next to Bank of Maharashtra, Dobra Bal Colony, Hathras, Uttar Pradesh – 204101, India
- **Customer Care Phone:** [+91 7017840020](tel:7017840020)
- **Official GSTIN / UIN:** `09ANCPV6879P1ZP`
- **Dynamic Configuration:** All business parameters, GSTIN, contact numbers, and delivery thresholds are fully manageable live via the Admin Settings Suite.

---

## 🏛️ Architectural Highlights & Enterprise Portability

1. **Zero Database Lock-in (Repository Pattern):**
   - Built on a decoupled Repository and Service architecture with Prisma ORM.
   - Designed for zero-downtime portability between Neon PostgreSQL and Hostinger MySQL.
2. **Server-Side Pricing & Cart Integrity:**
   - 100% server-validated cart totals, dynamic tier discounts, coupon redemption caps, and tax estimations.
   - Tamper-proof checkout payload validation via Zod schemas.
3. **Atomic Inventory Control:**
   - Concurrency-safe atomic increments and decrements preventing overselling.
   - Real-time stock reservation and ledger-backed audit logging for all manual and automated adjustments.
4. **End-to-End Razorpay Payment Gateway Integration:**
   - Server-side HMAC-SHA256 signature verification (`crypto.createHmac('sha256', secret)`).
   - Automated order confirmation, invoice snapshotting, and stock settlement.
5. **Role-Based Access Control (RBAC):**
   - Fine-grained permission model (`MANAGE_PRODUCTS`, `MANAGE_ORDERS`, `MANAGE_INVENTORY`, `MANAGE_COUPONS`, `MANAGE_REVIEWS`, `MANAGE_SETTINGS`, `VIEW_ANALYTICS`, `VIEW_AUDIT_LOGS`).
   - Secure HttpOnly JWT session tokens and authorization guards on all admin endpoints.
6. **Live Database Analytics (No Simulated Data):**
   - Financial summaries (Total Revenue, Paid Orders, Average Order Value), low-stock warnings, and top-selling Ayurvedic formulations aggregated directly from real database records.

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components & Route Handlers)
- **Language:** TypeScript 5.4+ (Strict Mode)
- **Styling:** Tailwind CSS + Lucide Icons + Radix UI primitives
- **ORM & Data Layer:** Prisma ORM with In-Memory / PostgreSQL / MySQL persistence
- **Validation:** Zod Schema Validation
- **Payments:** Razorpay Node.js SDK with Webhooks and HMAC-SHA256 signature verification
- **Authentication:** JWT + bcryptjs password hashing

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Comprehensive Backend Test Suite (36 Integration Tests)
```bash
npm run test:backend
```

### 3. Production Build & Start
```bash
npm run build
npm start
```
The application will be live at `http://localhost:3000`.

---

## 🔐 Administrative Access Credentials (Default Seed)

- **Admin Portal URL:** `http://localhost:3000/admin`
- **Super Admin Email:** `admin@aadhyaenterprises.com`
- **Super Admin Password:** `AadhyaAdmin@2026`
- **Customer Demo Email:** `rajesh.sharma@example.com`
- **Customer Demo Password:** `CustomerPass@2026`
- **Promo Coupon Code:** `AYURVEDA10` (10% discount on carts above ₹499)

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma            # Database schema with full indexes and relational foreign keys
│   └── seed.ts                  # Seed script for initial Ayurvedic catalog, admin, and settings
├── src/
│   ├── app/
│   │   ├── admin/               # Full Admin Suite (Dashboard, Products, Orders, Inventory, Coupons, Reviews, CMS, Settings, Audit Logs)
│   │   ├── api/                 # REST API Handlers (Catalog, Cart, Orders, Razorpay, Auth, Admin)
│   │   ├── cart/                # Dynamic Cart Page
│   │   ├── checkout/            # 1-Page Express Checkout with Razorpay
│   │   ├── product/[slug]/      # Ayurvedic Product Detail Page (PDP) with Multi-Variant Selector
│   │   ├── shop/                # Filterable Product Catalog
│   │   ├── page.tsx             # Storefront Home Page with Hero, Categories, Bestsellers, Benefits
│   │   └── layout.tsx           # Root Layout with Unified Providers & Header/Footer
│   ├── components/
│   │   ├── admin/               # Admin Product Multi-Variant Form & Table Components
│   │   ├── shared/              # Header, Footer, Providers, Mobile Nav
│   │   └── storefront/          # ProductCard, MiniCart, ReviewSection, SearchModal, NewsletterForm
│   ├── context/
│   │   ├── auth-context.tsx     # Authentication and Session State
│   │   ├── cart-context.tsx     # Client-side Cart with Server-Side Calculation Sync
│   │   └── wishlist-context.tsx # Persistent Customer Wishlist
│   ├── repositories/            # Database Access Repositories (Product, Order, Inventory, User, CMS, Settings, Coupon, Audit)
│   ├── services/                # Business Logic Services (Pricing, Order, Razorpay, Auth, Analytics)
│   ├── schemas/                 # Zod Validation Schemas
│   └── types/                   # TypeScript Domain Enums & Interfaces
└── test-backend.ts              # 36-Step End-to-End Domain Verification Test Suite
```

---

## 📜 Legal & Compliance

- **AYUSH & FSSAI Compliant Packaging Information**
- **Dynamic Legal Policies:** Shipping & Delivery, Return & Refund, Terms & Conditions, Privacy Policy.
- Prepared exclusively for **AADHYA ENTERPRISES (Hathras, U.P.)**.
