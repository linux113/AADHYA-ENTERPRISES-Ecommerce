// ==============================================================================
// ENTERPRISE DATA ACCESS LAYER & PERSISTENCE ENGINE — AADHYA ENTERPRISES
// Portable Relational Data Store (PostgreSQL / MySQL / In-Memory Seeded Engine)
// ==============================================================================

import {
  Address,
  AuditLog,
  AyurvedicFormulation,
  Banner,
  BlogCategory,
  BlogPost,
  BusinessSetting,
  Cart,
  CartItem,
  Category,
  Coupon,
  CouponUsage,
  DiscountType,
  FaqItem,
  HomepageSection,
  InventoryChangeReason,
  InventoryLedger,
  Order,
  OrderItem,
  OrderStatus,
  Payment,
  PaymentGateway,
  PaymentStatus,
  PermissionKey,
  Product,
  ProductImage,
  ProductVariant,
  Review,
  Shipment,
  ShipmentStatus,
  StaticPage,
  SystemRole,
  Testimonial,
  User,
} from '@/types';
import bcrypt from 'bcryptjs';
import { BROCHURE_CATEGORIES, BROCHURE_PRODUCTS } from './brochure-data';

// Global Singleton Store for Persistent Runtime Execution
class DatabaseStore {
  public users: Map<string, User> = new Map();
  public userRoles: Map<string, { userId: string; roleId: string; role: SystemRole }> = new Map();
  public addresses: Map<string, Address> = new Map();
  public categories: Map<string, Category> = new Map();
  public products: Map<string, Product> = new Map();
  public productVariants: Map<string, ProductVariant> = new Map();
  public productImages: Map<string, ProductImage> = new Map();
  public inventoryLedgers: Map<string, InventoryLedger> = new Map();
  public carts: Map<string, Cart> = new Map();
  public cartItems: Map<string, CartItem> = new Map();
  public orders: Map<string, Order> = new Map();
  public orderItems: Map<string, OrderItem> = new Map();
  public payments: Map<string, Payment> = new Map();
  public shipments: Map<string, Shipment> = new Map();
  public coupons: Map<string, Coupon> = new Map();
  public couponUsages: Map<string, CouponUsage> = new Map();
  public reviews: Map<string, Review> = new Map();
  public banners: Map<string, Banner> = new Map();
  public homepageSections: Map<string, HomepageSection> = new Map();
  public testimonials: Map<string, Testimonial> = new Map();
  public faqItems: Map<string, FaqItem> = new Map();
  public blogPosts: Map<string, BlogPost> = new Map();
  public blogCategories: Map<string, BlogCategory> = new Map();
  public staticPages: Map<string, StaticPage> = new Map();
  public businessSettings: Map<string, BusinessSetting> = new Map();
  public auditLogs: Map<string, AuditLog> = new Map();

  private isInitialized = false;

  constructor() {
    this.seedInitialData();
  }

  public seedInitialData() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // 1. BUSINESS SETTINGS SEED (As per PRD specification)
    const settingsList: Array<{ key: string; value: string; isPublic: boolean; description: string }> = [
      { key: 'BUSINESS_NAME', value: 'AADHYA ENTERPRISES', isPublic: true, description: 'Official legal business name' },
      { key: 'BUSINESS_ADDRESS_LINE1', value: 'B.H Oil Meal Road', isPublic: true, description: 'Premises address' },
      { key: 'BUSINESS_ADDRESS_LINE2', value: 'Next to Bank of Maharashtra, Dobra Bal Colony', isPublic: true, description: 'Landmark / Area' },
      { key: 'BUSINESS_CITY', value: 'Hathras', isPublic: true, description: 'City' },
      { key: 'BUSINESS_STATE', value: 'Uttar Pradesh', isPublic: true, description: 'State' },
      { key: 'BUSINESS_PINCODE', value: '204101', isPublic: true, description: 'Postal PIN code' },
      { key: 'BUSINESS_PHONE', value: '7017840020', isPublic: true, description: 'Primary customer support phone' },
      { key: 'BUSINESS_GSTIN', value: '09ANCPV6879P1ZP', isPublic: true, description: 'Registered GSTIN / UIN' },
      { key: 'SUPPORT_EMAIL', value: 'contact@aadhyaenterprises.com', isPublic: true, description: 'Official email' },
      { key: 'FREE_SHIPPING_THRESHOLD', value: '499', isPublic: true, description: 'Free shipping minimum order value (INR)' },
      { key: 'DEFAULT_SHIPPING_FEE', value: '50', isPublic: true, description: 'Standard delivery charge below threshold' },
      { key: 'COD_ENABLED', value: 'true', isPublic: true, description: 'Allow Cash on Delivery' },
      { key: 'COD_EXTRA_FEE', value: '30', isPublic: true, description: 'COD convenience surcharge' },
      { key: 'RAZORPAY_KEY_ID', value: process.env.RAZORPAY_KEY_ID || 'rzp_test_aadhya12345', isPublic: true, description: 'Razorpay Key ID' },
      { key: 'RAZORPAY_KEY_SECRET', value: process.env.RAZORPAY_KEY_SECRET || 'rzp_sec_aadhya_secret_987', isPublic: false, description: 'Razorpay Secret' },
    ];

    for (const s of settingsList) {
      this.businessSettings.set(s.key, {
        id: `set_${s.key.toLowerCase()}`,
        key: s.key,
        value: s.value,
        description: s.description,
        isPublic: s.isPublic,
        updatedAt: new Date().toISOString(),
      });
    }

    // 2. SUPER ADMIN & ROLES SEED
    const superAdminId = 'usr_superadmin_01';
    const passwordSalt = bcrypt.genSaltSync(10);
    const adminHash = bcrypt.hashSync('AadhyaAdmin@2026', passwordSalt);

    const superAdminUser: User = {
      id: superAdminId,
      email: 'admin@aadhyaenterprises.com',
      phone: '7017840020',
      passwordHash: adminHash,
      fullName: 'Aadhya Enterprises Super Admin',
      isActive: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      roles: [SystemRole.SUPER_ADMIN, SystemRole.ADMIN],
      permissions: Object.values(PermissionKey),
    };
    this.users.set(superAdminId, superAdminUser);
    this.userRoles.set(`ur_sa_01`, { userId: superAdminId, roleId: 'role_super_admin', role: SystemRole.SUPER_ADMIN });

    // Seed Sample Customer
    const customerId = 'usr_customer_01';
    const customerHash = bcrypt.hashSync('Customer@123', passwordSalt);
    const customerUser: User = {
      id: customerId,
      email: 'rajesh.sharma@example.com',
      phone: '9876543210',
      passwordHash: customerHash,
      fullName: 'Rajesh Sharma',
      isActive: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      roles: [SystemRole.CUSTOMER],
      permissions: [],
    };
    this.users.set(customerId, customerUser);
    this.userRoles.set(`ur_c_01`, { userId: customerId, roleId: 'role_customer', role: SystemRole.CUSTOMER });

    const customerAddress: Address = {
      id: 'addr_cust_01',
      userId: customerId,
      fullName: 'Rajesh Sharma',
      phone: '9876543210',
      addressLine1: 'Plot 42, Anand Nagar',
      addressLine2: 'Near Kali Temple',
      landmark: 'Behind State Bank',
      city: 'Hathras',
      state: 'Uttar Pradesh',
      pincode: '204101',
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.addresses.set(customerAddress.id, customerAddress);

    // 3. AYURVEDIC CATEGORIES SEED
    const categoriesData: Array<{ id: string; name: string; slug: string; description: string; displayOrder: number }> = [
      {
        id: 'cat_classical_churnas',
        name: 'Herbal Churnas (Powders)',
        slug: 'herbal-churnas',
        description: 'Pure, micro-pulverized classical Ayurvedic herbal powders prepared according to Charaka Samhita.',
        displayOrder: 1,
      },
      {
        id: 'cat_asava_arishta',
        name: 'Asava & Arishta',
        slug: 'asava-arishta',
        description: 'Naturally fermented classical formulations with self-generated bio-available herbal actives.',
        displayOrder: 2,
      },
      {
        id: 'cat_herbal_oils',
        name: 'Ayurvedic Taila (Medicated Oils)',
        slug: 'ayurvedic-oils',
        description: 'Cold-pressed herbal oils infused with potent herbs through traditional Sneha Kalpana process.',
        displayOrder: 3,
      },
      {
        id: 'cat_vati_gutika',
        name: 'Vati & Tablets',
        slug: 'vati-tablets',
        description: 'Classical Ayurvedic tablets and compressed herbal concentrates for acute and chronic wellness.',
        displayOrder: 4,
      },
      {
        id: 'cat_immunity_rasayana',
        name: 'Immunity & Rasayana',
        slug: 'immunity-rasayana',
        description: 'Vitality restorers, Chyawanprash, and rejuvenating rasayanas for whole-body longevity.',
        displayOrder: 5,
      },
      {
        id: 'cat_digestive_health',
        name: 'Digestive & Gut Health',
        slug: 'digestive-health',
        description: 'Formulations that kindle Jatharagni (digestive fire), detoxify Ama, and restore metabolic rhythm.',
        displayOrder: 6,
      },
    ];

    for (const cat of [...categoriesData, ...BROCHURE_CATEGORIES]) {
      this.categories.set(cat.id, {
        ...cat,
        isActive: true,
        imageUrl: `https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80`,
        metaTitle: `${cat.name} | Buy Authentic Ayurvedic Medicine | Aadhya Enterprises`,
        metaDescription: cat.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // 4. RICH AYURVEDIC PRODUCTS & VARIANTS SEED
    const productsData: Array<{
      id: string;
      categoryId: string;
      name: string;
      slug: string;
      skuPrefix: string;
      shortDescription: string;
      fullDescription: string;
      ingredients: string;
      benefits: string;
      usageInstructions: string;
      precautions: string;
      ayurvedicFormulation: AyurvedicFormulation;
      ayushLicenseNo: string;
      fssaiLicenseNo: string;
      isFeatured: boolean;
      isBestseller: boolean;
      isNewArrival: boolean;
      variants: Array<{
        id: string;
        sku: string;
        sizeLabel: string;
        mrp: number;
        sellingPrice: number;
        costPrice: number;
        stock: number;
        isDefault: boolean;
      }>;
      images: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number }>;
    }> = [
      {
        id: 'prod_triphala_churna',
        categoryId: 'cat_classical_churnas',
        name: 'Classical Triphala Churna',
        slug: 'classical-triphala-churna',
        skuPrefix: 'AE-TC',
        shortDescription: 'Time-tested Ayurvedic trinity of Haritaki, Bibhitaki & Amalaki for deep digestive detox and colon health.',
        fullDescription:
          'Aadhya Enterprises Triphala Churna is manufactured in Hathras following the classical Sharangdhara Samhita guidelines. It balances all three Doshas (Vata, Pitta, Kapha) and gently cleanses the gastrointestinal tract without stripping essential gut flora.',
        ingredients:
          '1. Haritaki (Terminalia chebula) - 33.34%\n2. Bibhitaki (Terminalia bellirica) - 33.33%\n3. Amalaki (Phyllanthus emblica) - 33.33%\nZero additives, 100% natural wild-crafted fruit pericarps.',
        benefits:
          '• Relieves chronic constipation and promotes regular bowel movements\n• Enhances digestive nutrient absorption and kindles Agni\n• Natural antioxidant rich in Vitamin C\n• Purifies blood and supports clear skin',
        usageInstructions: 'Take 1 teaspoon (3g - 6g) at bedtime with lukewarm water or warm milk, or as directed by an Ayurvedic physician.',
        precautions: 'Do not use during acute diarrhea or dysentery. Pregnant women should consult their physician before use.',
        ayurvedicFormulation: AyurvedicFormulation.CHURNA,
        ayushLicenseNo: 'UP-AYUR-2024-811',
        fssaiLicenseNo: '12724001000891',
        isFeatured: true,
        isBestseller: true,
        isNewArrival: false,
        variants: [
          { id: 'var_tc_100g', sku: 'AE-TC-100G', sizeLabel: '100g Pack', mrp: 160, sellingPrice: 130, costPrice: 55, stock: 120, isDefault: true },
          { id: 'var_tc_250g', sku: 'AE-TC-250G', sizeLabel: '250g Jar', mrp: 350, sellingPrice: 280, costPrice: 120, stock: 85, isDefault: false },
          { id: 'var_tc_500g', sku: 'AE-TC-500G', sizeLabel: '500g Economy', mrp: 650, sellingPrice: 499, costPrice: 210, stock: 40, isDefault: false },
        ],
        images: [
          { id: 'img_tc_01', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
          { id: 'img_tc_02', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', isPrimary: false, sortOrder: 1 },
        ],
      },
      {
        id: 'prod_maha_bhringraj_taila',
        categoryId: 'cat_herbal_oils',
        name: 'Maha Bhringraj Ayurvedic Hair Oil',
        slug: 'maha-bhringraj-ayurvedic-hair-oil',
        skuPrefix: 'AE-MBT',
        shortDescription: 'Potent classical hair nectar processed with Bhringraj juice, Manjistha, and 16 therapeutic herbs in pure Sesame oil.',
        fullDescription:
          'Prepared using the classical Taila Paka Vidhi over a slow flame in Hathras, this medicated herbal oil pacifies excessive Pitta heat in the scalp, strengthens hair follicles at root level, prevents premature greying, and induces sound, restful sleep.',
        ingredients:
          'Bhringraj Swarasa (Eclipta alba), Murchita Til Taila (Sesamum indicum), Manjistha, Padmaka, Lodhra, Chandan, Sariva, Nagkeshar, Haridra, Priyangu.',
        benefits:
          '• Actively prevents excessive hair fall and strengthens weak roots\n• Delays premature greying with natural melanin boosters\n• Relieves stress, mental fatigue, and headaches when massaged into scalp\n• Eliminates dandruff and scalp dryness',
        usageInstructions:
          'Apply 10-15ml gently on scalp and hair roots. Massage in circular motions with fingertips for 10 minutes. Leave overnight or for at least 2 hours before washing with mild herbal cleanser.',
        precautions: 'For external scalp application only. Keep away from direct eye contact.',
        ayurvedicFormulation: AyurvedicFormulation.TAILA,
        ayushLicenseNo: 'UP-AYUR-2024-912',
        fssaiLicenseNo: '12724001000892',
        isFeatured: true,
        isBestseller: true,
        isNewArrival: false,
        variants: [
          { id: 'var_mbt_100ml', sku: 'AE-MBT-100ML', sizeLabel: '100ml Bottle', mrp: 199, sellingPrice: 165, costPrice: 70, stock: 150, isDefault: false },
          { id: 'var_mbt_200ml', sku: 'AE-MBT-200ML', sizeLabel: '200ml Bottle', mrp: 360, sellingPrice: 295, costPrice: 125, stock: 95, isDefault: true },
          { id: 'var_mbt_500ml', sku: 'AE-MBT-500ML', sizeLabel: '500ml Value Pack', mrp: 850, sellingPrice: 680, costPrice: 280, stock: 35, isDefault: false },
        ],
        images: [
          { id: 'img_mbt_01', url: 'https://images.unsplash.com/photo-1608248597359-009f4f1074e2?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
          { id: 'img_mbt_02', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80', isPrimary: false, sortOrder: 1 },
        ],
      },
      {
        id: 'prod_ashwagandharishta',
        categoryId: 'cat_asava_arishta',
        name: 'Classical Ashwagandharishta',
        slug: 'classical-ashwagandharishta',
        skuPrefix: 'AE-AGR',
        shortDescription: 'Naturally fermented Ayurvedic tonic for nervous exhaustion, vitality, memory enhancement, and deep physical rejuvenation.',
        fullDescription:
          'Classical fermentation tonic formulated with Ashwagandha root, Musli, Manjistha, Haritaki, and Dhataki flowers. Self-generated alcohol (~5-10%) acts as a rapid carrier ensuring deep cellular delivery of revitalizing withanolides.',
        ingredients:
          'Ashwagandha (Withania somnifera), Safed Musli, Manjistha, Haritaki, Haridra, Daruharidra, Rasna, Vidari, Arjun, Dhataki, Jaggery base.',
        benefits:
          '• Recharges physical stamina, strength, and vitality\n• Alleviates chronic stress, anxiety, and sleep disturbances\n• Tonifies nervous system and strengthens neuromuscular function\n• Improves appetite and general body nourishment',
        usageInstructions: 'Take 15ml to 20ml mixed with an equal volume of water twice daily immediately after meals.',
        precautions: 'Not recommended for individuals with active gastric ulcers or during pregnancy without medical advice.',
        ayurvedicFormulation: AyurvedicFormulation.ASAVA_ARISHTA,
        ayushLicenseNo: 'UP-AYUR-2024-814',
        fssaiLicenseNo: '12724001000893',
        isFeatured: true,
        isBestseller: false,
        isNewArrival: true,
        variants: [
          { id: 'var_agr_200ml', sku: 'AE-AGR-200ML', sizeLabel: '200ml Bottle', mrp: 180, sellingPrice: 155, costPrice: 65, stock: 80, isDefault: false },
          { id: 'var_agr_450ml', sku: 'AE-AGR-450ML', sizeLabel: '450ml Bottle', mrp: 340, sellingPrice: 285, costPrice: 120, stock: 60, isDefault: true },
        ],
        images: [
          { id: 'img_agr_01', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
        ],
      },
      {
        id: 'prod_ashwagandha_capsules',
        categoryId: 'cat_immunity_rasayana',
        name: 'Pure Ashwagandha Root Extract Capsules',
        slug: 'ashwagandha-extract-capsules',
        skuPrefix: 'AE-ASH',
        shortDescription: 'Standardized 5% Withanolides extract for stress management, cognitive clarity, and stamina support.',
        fullDescription:
          'Crafted from organic Ashwagandha roots sourced from traditional Indian farms, each 500mg vegetarian capsule delivers concentrated adaptogenic potency to calm cortisol spikes and bolster immune resilience.',
        ingredients: 'Standardized Withania somnifera root extract (5% Withanolides) - 500mg per vegetarian HPMC capsule.',
        benefits:
          '• Helps balance cortisol levels and alleviate mental stress\n• Promotes deep, restorative sleep cycles\n• Boosts athletic endurance, muscle recovery, and energy\n• Supports healthy endocrine and thyroid balance',
        usageInstructions: '1 capsule twice daily with milk or water after meals, or as recommended by your physician.',
        precautions: 'Consult your doctor if you are pregnant, nursing, or on sedative medications.',
        ayurvedicFormulation: AyurvedicFormulation.CAPSULE,
        ayushLicenseNo: 'UP-AYUR-2024-915',
        fssaiLicenseNo: '12724001000894',
        isFeatured: true,
        isBestseller: true,
        isNewArrival: false,
        variants: [
          { id: 'var_ash_60c', sku: 'AE-ASH-60C', sizeLabel: '60 Veg Capsules', mrp: 450, sellingPrice: 360, costPrice: 140, stock: 110, isDefault: true },
          { id: 'var_ash_120c', sku: 'AE-ASH-120C', sizeLabel: '120 Veg Capsules (Twin Pack)', mrp: 850, sellingPrice: 649, costPrice: 260, stock: 50, isDefault: false },
        ],
        images: [
          { id: 'img_ash_01', url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
        ],
      },
      {
        id: 'prod_giloy_kwath',
        categoryId: 'cat_immunity_rasayana',
        name: 'Classical Giloy (Amrita) Kwath Powder',
        slug: 'giloy-amrita-kwath-powder',
        skuPrefix: 'AE-GK',
        shortDescription: 'Immunity shield and fever balancer made from pure Guduchi (Tinospora cordifolia) stem bark.',
        fullDescription:
          'Known in Sanskrit as Amrita (Root of Immortality), Guduchi is celebrated for its Tridosha balancing and Jvaraghna (fever reducing) qualities. Aadhya Enterprises Giloy Kwath uses coarse stem bark to brew fresh decoctions.',
        ingredients: '100% Pure Guduchi / Giloy Stem Bark (Tinospora cordifolia).',
        benefits:
          '• Activates white blood cell count and immune response\n• Purifies liver toxins and supports normal platelet levels\n• Relieves recurring seasonal fevers and chronic fatigue\n• Cools excess metabolic heat and supports skin clarity',
        usageInstructions: 'Boil 5g to 10g in 200ml water until reduced to 50ml. Filter and drink warm once or twice daily.',
        precautions: 'Diabetic individuals should monitor blood sugar levels when using regularly.',
        ayurvedicFormulation: AyurvedicFormulation.KWATH,
        ayushLicenseNo: 'UP-AYUR-2024-816',
        fssaiLicenseNo: '12724001000895',
        isFeatured: false,
        isBestseller: false,
        isNewArrival: true,
        variants: [
          { id: 'var_gk_100g', sku: 'AE-GK-100G', sizeLabel: '100g Pack', mrp: 140, sellingPrice: 115, costPrice: 45, stock: 90, isDefault: true },
          { id: 'var_gk_250g', sku: 'AE-GK-250G', sizeLabel: '250g Pack', mrp: 300, sellingPrice: 240, costPrice: 95, stock: 65, isDefault: false },
        ],
        images: [
          { id: 'img_gk_01', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
        ],
      },
      {
        id: 'prod_brahmi_vati',
        categoryId: 'cat_vati_gutika',
        name: 'Brahmi Vati (Gold & Pearl Fortified Formula)',
        slug: 'brahmi-vati-classical-tablets',
        skuPrefix: 'AE-BV',
        shortDescription: 'Premier Medhya Rasayana for concentration, memory retention, focus, and mental calm.',
        fullDescription:
          'Formulated according to the Bhaishajya Ratnavali, Brahmi Vati combines Brahmi, Shankhapushpi, Vacha, and Swarna Makshika to nourish the nervous system and sharpen cognitive faculties without jittery stimulants.',
        ingredients: 'Brahmi (Bacopa monnieri), Shankhapushpi, Vacha, Ustukhuddus, Maricha, Pippali, Swarna Makshika Bhasma.',
        benefits:
          '• Enhances mental clarity, alertness, and retention capacity\n• Calms agitated nervous energy, restlessness, and exam stress\n• Promotes deep relaxation without morning drowsiness\n• Nourishes brain cells (Medhya Rasayana)',
        usageInstructions: '1 to 2 tablets twice daily with milk or honey after meals.',
        precautions: 'Do not exceed prescribed dosage. Keep out of reach of young children.',
        ayurvedicFormulation: AyurvedicFormulation.TABLET,
        ayushLicenseNo: 'UP-AYUR-2024-817',
        fssaiLicenseNo: '12724001000896',
        isFeatured: true,
        isBestseller: false,
        isNewArrival: false,
        variants: [
          { id: 'var_bv_60t', sku: 'AE-BV-60T', sizeLabel: '60 Tablets Bottle', mrp: 380, sellingPrice: 320, costPrice: 130, stock: 75, isDefault: true },
          { id: 'var_bv_120t', sku: 'AE-BV-120T', sizeLabel: '120 Tablets Jar', mrp: 700, sellingPrice: 580, costPrice: 240, stock: 45, isDefault: false },
        ],
        images: [
          { id: 'img_bv_01', url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
        ],
      },
    ];

    const combinedProducts = [
      ...productsData,
      ...BROCHURE_PRODUCTS.filter((bp) => !productsData.some((p) => p.id === bp.id)),
    ];

    for (const p of combinedProducts) {
      const prodRecord: Product = {
        id: p.id,
        categoryId: p.categoryId,
        name: p.name,
        slug: p.slug,
        skuPrefix: p.skuPrefix,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        ingredients: p.ingredients,
        benefits: p.benefits,
        usageInstructions: p.usageInstructions,
        precautions: p.precautions,
        ayurvedicFormulation: p.ayurvedicFormulation,
        ayushLicenseNo: p.ayushLicenseNo,
        fssaiLicenseNo: p.fssaiLicenseNo,
        isFeatured: p.isFeatured,
        isBestseller: p.isBestseller,
        isNewArrival: p.isNewArrival,
        isActive: true,
        metaTitle: `${p.name} | Buy Authentic Ayurveda | AADHYA ENTERPRISES`,
        metaDescription: p.shortDescription,
        metaKeywords: `ayurvedic medicine, hathras ayurveda, ${p.name}, classical remedies, natural herbs`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.products.set(p.id, prodRecord);

      for (const v of p.variants) {
        const variantRecord: ProductVariant = {
          id: v.id,
          productId: p.id,
          sku: v.sku,
          sizeLabel: v.sizeLabel,
          mrp: v.mrp,
          sellingPrice: v.sellingPrice,
          costPrice: v.costPrice,
          stockQuantity: v.stock,
          reservedQuantity: 0,
          lowStockThreshold: 5,
          weightInGrams: 250,
          isDefault: v.isDefault,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        this.productVariants.set(v.id, variantRecord);

        // Initial Inventory Ledger entry
        this.inventoryLedgers.set(`inv_${v.id}_init`, {
          id: `inv_${v.id}_init`,
          variantId: v.id,
          changeQty: v.stock,
          resultingQty: v.stock,
          reason: InventoryChangeReason.MANUAL_RESTOCK,
          referenceId: 'INITIAL_SEED',
          notes: 'Initial production batch stock intake from Hathras unit',
          createdAt: new Date().toISOString(),
        });
      }

      for (const img of p.images) {
        this.productImages.set(img.id, {
          id: img.id,
          productId: p.id,
          imageUrl: img.url,
          altText: `${p.name} - Aadhya Enterprises`,
          sortOrder: img.sortOrder,
          isPrimary: img.isPrimary,
          createdAt: new Date().toISOString(),
        });
      }

      // Add Sample Verified Review
      const reviewId = `rev_${p.id}_01`;
      this.reviews.set(reviewId, {
        id: reviewId,
        productId: p.id,
        userId: customerId,
        userName: 'Rajesh Sharma',
        rating: 5,
        title: 'Authentic and exceptionally fresh!',
        comment: `I have been using this formulation for 3 weeks now. You can immediately smell the purity of classical herbs. Highly recommended!`,
        isVerified: true,
        isApproved: true,
        adminReply: 'Namaste Rajesh ji, thank you for trusting Aadhya Enterprises. We take immense pride in classical preparation.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // 5. PROMOTIONAL COUPONS SEED
    const couponsData: Coupon[] = [
      {
        id: 'cpn_ayurveda10',
        code: 'AYURVEDA10',
        description: 'Get 10% discount on all classical remedies over ₹499',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 10,
        minOrderValue: 499,
        maxDiscountCap: 200,
        usageLimit: 1000,
        perUserLimit: 2,
        usedCount: 14,
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2028-12-31T23:59:59.000Z',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cpn_aadhya100',
        code: 'AADHYA100',
        description: 'Flat ₹100 instant off on orders above ₹899',
        discountType: DiscountType.FIXED_AMOUNT,
        discountValue: 100,
        minOrderValue: 899,
        maxDiscountCap: null,
        usageLimit: 500,
        perUserLimit: 1,
        usedCount: 22,
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2028-12-31T23:59:59.000Z',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cpn_freeship',
        code: 'FREESHIP',
        description: 'Free pan-India delivery on any order size',
        discountType: DiscountType.FREE_SHIPPING,
        discountValue: 50,
        minOrderValue: 0,
        maxDiscountCap: 50,
        usageLimit: 2000,
        perUserLimit: 5,
        usedCount: 45,
        startDate: '2025-01-01T00:00:00.000Z',
        endDate: '2028-12-31T23:59:59.000Z',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    for (const c of couponsData) {
      this.coupons.set(c.id, c);
    }

    // 6. CMS BANNERS & HOMEPAGE SECTIONS SEED
    const bannersData: Banner[] = [
      {
        id: 'ban_hero_01',
        title: 'Authentic Classical Formulations from Hathras',
        subtitle: 'Handcrafted with reverence to Ayurvedic texts for natural vitality, digestive health & holistic well-being.',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1600&q=80',
        mobileImgUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
        linkUrl: '/shop',
        buttonText: 'Explore Classical Range',
        sortOrder: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'ban_hero_02',
        title: 'Nourish Scalp & Mind with Maha Bhringraj Taila',
        subtitle: 'Slow-cooked in pure sesame oil with Bhringraj juice and 16 rejuvenating botanicals.',
        imageUrl: 'https://images.unsplash.com/photo-1608248597359-009f4f1074e2?auto=format&fit=crop&w=1600&q=80',
        mobileImgUrl: 'https://images.unsplash.com/photo-1608248597359-009f4f1074e2?auto=format&fit=crop&w=800&q=80',
        linkUrl: '/product/maha-bhringraj-ayurvedic-hair-oil',
        buttonText: 'Shop Hair Care',
        sortOrder: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    for (const b of bannersData) {
      this.banners.set(b.id, b);
    }

    // Testimonials Seed
    const testimonialsData: Testimonial[] = [
      {
        id: 'test_01',
        authorName: 'Dr. Virendra Saxena',
        location: 'Mathura, U.P.',
        rating: 5,
        reviewQuote: 'As an Ayurvedic practitioner for 22 years, finding unadulterated churnas with genuine botanical aroma is rare. Aadhya Enterprises delivers pristine classical authenticity.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isActive: true,
        sortOrder: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'test_02',
        authorName: 'Meenakshi Agrawal',
        location: 'Agra, U.P.',
        rating: 5,
        reviewQuote: 'The Maha Bhringraj hair oil changed my hair texture within a month. No artificial fragrances or mineral oils. 100% pure Ayurvedic care.',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        isActive: true,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
      },
    ];

    for (const t of testimonialsData) {
      this.testimonials.set(t.id, t);
    }

    // FAQ Items Seed
    const faqsData: FaqItem[] = [
      {
        id: 'faq_01',
        category: 'Quality & Sourcing',
        question: 'Where are Aadhya Enterprises formulations manufactured?',
        answer: 'All our formulations are manufactured under strict AYUSH and GMP standards at our dedicated Ayurvedic facility located in Hathras, Uttar Pradesh (B.H Oil Meal Road, Next to Bank of Maharashtra).',
        sortOrder: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'faq_02',
        category: 'Shipping & Delivery',
        question: 'What are your delivery timelines and shipping charges?',
        answer: 'We dispatch all pan-India orders within 24 hours. Orders above ₹499 enjoy FREE Delivery. Orders below ₹499 have a nominal ₹50 delivery charge.',
        sortOrder: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'faq_03',
        category: 'Ayurvedic Guidance',
        question: 'Are your medicines safe for long-term daily wellness?',
        answer: 'Yes! Our classical churnas, tailas, and rasayanas are formulated strictly according to traditional Ayurvedic pharmacopeias without synthetic fillers or heavy metal contamination.',
        sortOrder: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];

    for (const f of faqsData) {
      this.faqItems.set(f.id, f);
    }

    // 7. BLOG & KNOWLEDGE ARTICLES SEED
    const blogData: BlogPost = {
      id: 'blog_01',
      title: 'The Sacred Science of Triphala: Classical Detoxification for Modern Lifestyles',
      slug: 'sacred-science-of-triphala-ayurvedic-detox',
      summary: 'Discover how Haritaki, Bibhitaki, and Amalaki work in synergy to kindle digestive Agni and detoxify bodily tissues.',
      content: `Ayurveda considers healthy digestion (Agni) as the cornerstone of human longevity. When digestion weakens, un-metabolized metabolic waste known as 'Ama' accumulates across cellular channels.
      
### The Triphala Formula
1. **Haritaki (Terminalia chebula):** Known as the 'King of Medicines', it pacifies Vata dosha, tonifies the colon muscles, and promotes smooth peristalsis.
2. **Bibhitaki (Terminalia bellirica):** Pacifies Kapha dosha, clears accumulated mucus in the intestinal lining, and strengthens respiratory pathways.
3. **Amalaki (Phyllanthus emblica):** The ultimate Pitta pacifier and natural source of bioavailable Vitamin C, cooling internal inflammation.

### How to Take Triphala
Take 1 teaspoon (3-5g) of Aadhya Enterprises Classical Triphala Churna with warm water 30 minutes before sleep for gentle overnight detox.`,
      featuredImg: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
      authorName: 'Vaidya R.K. Sharma',
      readTimeMinutes: 5,
      isPublished: true,
      publishedAt: new Date().toISOString(),
      metaTitle: 'The Sacred Science of Triphala | Ayurvedic Detox Guide | Aadhya Enterprises',
      metaDescription: 'Complete guide on how classical Triphala Churna balances Vata, Pitta, and Kapha to restore digestive fire and colon health.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categories: ['Digestive Health', 'Herbal Guides'],
    };
    this.blogPosts.set(blogData.id, blogData);

    // 8. STATIC LEGAL PAGES SEED
    const pagesData: StaticPage[] = [
      {
        id: 'page_about',
        slug: 'about-us',
        title: 'About Aadhya Enterprises — Our Hathras Heritage',
        content: `AADHYA ENTERPRISES was established with a singular noble mission: to preserve and deliver genuine classical Ayurvedic formulations directly from Hathras, Uttar Pradesh to families across India.

Rooted in ancient Vedic texts like the Charaka Samhita and Sushruta Samhita, every formulation we offer is prepared with sustainably wild-crafted botanicals, traditional Sneha & Kwath processes, and rigorous purity testing.

**Registered Office:** B.H Oil Meal Road, Next to Bank of Maharashtra, Dobra Bal Colony, Hathras, U.P. 204101  
**GSTIN:** 09ANCPV6879P1ZP  
**Contact:** 7017840020`,
        metaTitle: 'About Us | AADHYA ENTERPRISES Hathras Ayurvedic Heritage',
        metaDescription: 'Learn about Aadhya Enterprises, our traditional manufacturing roots in Hathras, and our commitment to pure Ayurveda.',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page_shipping',
        slug: 'shipping-policy',
        title: 'Shipping & Delivery Policy',
        content: `At AADHYA ENTERPRISES, we strive to deliver your authentic Ayurvedic remedies safely and quickly.

1. **Dispatch Time:** All confirmed orders are packed and dispatched from our Hathras fulfillment center within 24 business hours.
2. **Delivery Timelines:** Northern India: 2-3 business days. Pan-India: 4-6 business days.
3. **Shipping Charges:** Orders above ₹499: FREE Delivery. Orders below ₹499: Flat ₹50.
4. **Tracking:** You will receive real-time SMS and email updates with your courier AWB tracking number once dispatched.`,
        metaTitle: 'Shipping & Delivery Policy | AADHYA ENTERPRISES',
        metaDescription: 'Shipping rates, free delivery thresholds, and delivery timelines for Aadhya Enterprises.',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page_refund',
        slug: 'refund-policy',
        title: 'Return, Refund & Cancellation Policy',
        content: `Your complete satisfaction and health trust are paramount to us.

1. **Cancellations:** Orders can be cancelled anytime before dispatch for a 100% instant refund back to your original payment method.
2. **Returns:** If you receive a damaged, leaked, or incorrect item, notify us within 7 days of delivery at contact@aadhyaenterprises.com or 7017840020.
3. **Refund Processing:** Approved refunds are initiated via Razorpay within 24 hours and credited to your bank account within 3-5 business days.`,
        metaTitle: 'Return & Refund Policy | AADHYA ENTERPRISES',
        metaDescription: 'Hassle-free 7-day return and instant refund policy for Aadhya Enterprises.',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page_privacy',
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        content: `AADHYA ENTERPRISES respects your personal privacy. We collect minimal customer contact details (Name, Shipping Address, Phone, Email) solely for order fulfillment, GST invoicing, and delivery tracking. We never sell or share your information with third-party advertisers. All payments are encrypted via Razorpay 256-bit SSL protocols.`,
        metaTitle: 'Privacy Policy | AADHYA ENTERPRISES',
        metaDescription: 'Privacy policy and data protection standards of Aadhya Enterprises.',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page_terms',
        slug: 'terms-and-conditions',
        title: 'Terms & Conditions',
        content: `Welcome to AADHYA ENTERPRISES. By accessing our platform and placing orders, you agree to our standard terms of service. All Ayurvedic products comply with applicable AYUSH guidelines. Registered address: Hathras, U.P. 204101. GSTIN: 09ANCPV6879P1ZP.`,
        metaTitle: 'Terms & Conditions | AADHYA ENTERPRISES',
        metaDescription: 'Terms of service and legal agreement for Aadhya Enterprises.',
        updatedAt: new Date().toISOString(),
      },
    ];

    for (const p of pagesData) {
      this.staticPages.set(p.slug, p);
    }

    // 9. SAMPLE HISTORICAL ORDER FOR ANALYTICS SEED
    const initialOrderId = 'ord_sample_01';
    const sampleVariant = this.productVariants.get('var_tc_100g')!;
    const initialOrder: Order = {
      id: initialOrderId,
      orderNumber: 'AE-2026-10001',
      userId: customerId,
      customerName: 'Rajesh Sharma',
      customerEmail: 'rajesh.sharma@example.com',
      customerPhone: '9876543210',
      shippingAddress: customerAddress,
      subtotalAmount: 260,
      discountAmount: 0,
      couponCode: null,
      couponDiscount: 0,
      shippingFee: 50,
      taxAmount: 11.7,
      totalPayableAmount: 310,
      orderStatus: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      paymentGateway: PaymentGateway.RAZORPAY,
      adminNotes: 'Initial test delivery fulfilled successfully from Hathras warehouse',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      items: [
        {
          id: 'item_sample_01',
          orderId: initialOrderId,
          variantId: sampleVariant.id,
          productNameSnapshot: 'Classical Triphala Churna',
          variantSizeSnapshot: '100g Pack',
          skuSnapshot: 'AE-TC-100G',
          unitPrice: 130,
          quantity: 2,
          lineTotal: 260,
        },
      ],
      payment: {
        id: 'pay_sample_01',
        orderId: initialOrderId,
        gateway: PaymentGateway.RAZORPAY,
        razorpayOrderId: 'order_NxSeed99001',
        razorpayPaymentId: 'pay_NxSeed99001',
        razorpaySignature: 'sig_valid_seed_hash',
        amount: 310,
        currency: 'INR',
        status: PaymentStatus.PAID,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      shipment: {
        id: 'shp_sample_01',
        orderId: initialOrderId,
        carrierName: 'Delhivery Surface',
        trackingNumber: 'DEL-AE-9812491',
        status: ShipmentStatus.DELIVERED,
        dispatchedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        deliveredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    };
    this.orders.set(initialOrderId, initialOrder);
    this.payments.set(initialOrder.payment!.id, initialOrder.payment!);
    this.shipments.set(initialOrder.shipment!.id, initialOrder.shipment!);
  }
}

// Global Store Singleton
export const db = new DatabaseStore();
