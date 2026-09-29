// ==============================================================================
// ONLY AYURVEDA / AADHYA ENTERPRISES COMPLETE BROCHURE PRODUCTS SEED
// Extracted & verified from ONLY AYURVEDA BROCHURE.pdf
// ==============================================================================

import { AyurvedicFormulation } from '@/types';

export interface BrochureProductDef {
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
}

export const BROCHURE_CATEGORIES = [
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
    name: 'Ayurvedic Taila (Medicated Oils & Liniments)',
    slug: 'ayurvedic-oils',
    description: 'Medicated classical oils and pain relief liniments formulated with authentic herbal decoctions.',
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
    description: 'Formulations that kindle Jatharagni, detoxify Ama, and restore metabolic rhythm.',
    displayOrder: 6,
  },
  {
    id: 'cat_syrups_juices',
    name: 'Ayurvedic Syrups & Juices',
    slug: 'syrups-juices',
    description: 'Therapeutic herbal juices, decoctions, and liver/heart syrups prepared with fresh botanicals.',
    displayOrder: 7,
  },
  {
    id: 'cat_capsules',
    name: 'Pure Herbal Extract Capsules',
    slug: 'herbal-capsules',
    description: 'Standardized 100% vegetarian herbal extract capsules for targeted holistic health.',
    displayOrder: 8,
  },
  {
    id: 'cat_arks_drops',
    name: 'Medicated Arks & Drops',
    slug: 'arks-drops',
    description: 'Pure aqueous distillates (Arka Kalpana) and concentrated herbal immunity drops.',
    displayOrder: 9,
  },
];

export const BROCHURE_PRODUCTS: BrochureProductDef[] = [
  // 1. Classical Triphala Churna
  {
    id: 'prod_triphala_churna',
    categoryId: 'cat_classical_churnas',
    name: 'Classical Triphala Churna',
    slug: 'classical-triphala-churna',
    skuPrefix: 'AE-TC',
    shortDescription: 'Time-tested Ayurvedic trinity of Haritaki, Bibhitaki & Amalaki for deep digestive detox and colon health.',
    fullDescription: 'Aadhya Enterprises Triphala Churna is manufactured in Hathras following classical Sharangdhara Samhita guidelines. It balances Vata, Pitta, and Kapha and cleanses the digestive tract.',
    ingredients: '1. Haritaki (33.34%)\n2. Bibhitaki (33.33%)\n3. Amalaki (33.33%)\nZero additives, 100% pure wild-crafted fruit pericarps.',
    benefits: '• Relieves chronic constipation\n• Enhances nutrient absorption\n• Rich in natural Vitamin C\n• Purifies blood',
    usageInstructions: 'Take 1 teaspoon (3g - 6g) at bedtime with lukewarm water.',
    precautions: 'Do not use during acute diarrhea. Consult physician during pregnancy.',
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
  // 2. Maha Bhringraj Medicated Hair Oil
  {
    id: 'prod_maha_bhringraj_taila',
    categoryId: 'cat_herbal_oils',
    name: 'Maha Bhringraj Ayurvedic Hair Oil',
    slug: 'maha-bhringraj-ayurvedic-hair-oil',
    skuPrefix: 'AE-MBT',
    shortDescription: 'Potent classical hair nectar processed with Bhringraj juice, Manjistha, and 16 therapeutic herbs in pure Sesame oil.',
    fullDescription: 'Prepared using classical Taila Paka Vidhi over a slow flame in Hathras, this medicated herbal oil pacifies Pitta heat in the scalp, strengthens hair follicles, and promotes restful sleep.',
    ingredients: 'Bhringraj Swarasa, Murchita Til Taila, Manjistha, Padmaka, Lodhra, Chandan, Sariva, Nagkeshar, Haridra.',
    benefits: '• Actively prevents excessive hair fall\n• Delays premature greying\n• Relieves mental stress and headaches\n• Eliminates scalp dryness',
    usageInstructions: 'Apply 10-15ml gently on scalp and massage in circular motions for 10 minutes.',
    precautions: 'For external scalp application only.',
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
    ],
  },
  // 3. Ajwain Ark (From PDF Pg 1, 2)
  {
    id: 'prod_ajwain_ark',
    categoryId: 'cat_arks_drops',
    name: 'Ajwain Ark Pure Herbal Distillate',
    slug: 'ajwain-ark-pure-distillate',
    skuPrefix: 'AE-AA',
    shortDescription: 'Traditional hydro-distilled Trachyspermum ammi essence for instant gastric relief, colic, bloating, and weight management.',
    fullDescription: 'Pure Shastriya Arka prepared through authentic steam distillation in copper condensers. It eliminates flatulence, cures sour belching, eases menstrual cramps, and ignites slow digestive metabolism.',
    ingredients: '100% Pure Aqueous Distillate of Shuddha Ajwain (Trachyspermum ammi seeds).',
    benefits: '• Instantly alleviates stomach gas, nausea, and indigestion\n• Supports weight loss by boosting lipid metabolism\n• Relieves toothache and gum swelling when gargled\n• Calms menstrual abdominal spasms',
    usageInstructions: 'Take 5 to 10 drops in half a cup of lukewarm water twice daily after meals.',
    precautions: 'Do not consume undiluted. Store in a cool, dark place away from sunlight.',
    ayurvedicFormulation: AyurvedicFormulation.KWATHA,
    ayushLicenseNo: 'UP-AYUR-2024-821',
    fssaiLicenseNo: '12724001000901',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_aa_30ml', sku: 'AE-AA-30ML', sizeLabel: '30ml Dropper Bottle', mrp: 160, sellingPrice: 135, costPrice: 50, stock: 140, isDefault: true },
    ],
    images: [
      { id: 'img_aa_01', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 4. Cumin Ark / Jeera Ark (From PDF Pg 1, 2)
  {
    id: 'prod_cumin_ark',
    categoryId: 'cat_arks_drops',
    name: 'Cumin (Jeera) Ark Distillate',
    slug: 'cumin-jeera-ark-distillate',
    skuPrefix: 'AE-CA',
    shortDescription: 'Steam-distilled Cuminum cyminum extract for gut cleansing, metabolic fire, and cooling hyperacidity.',
    fullDescription: 'Authentic Cumin Ark distilled according to Arka Prakasha guidelines. It pacifies aggravated Pitta, clears metabolic endotoxins (Ama), and stimulates digestive enzymes.',
    ingredients: '100% Pure Steam Distillate of Cuminum cyminum (Shuddha Jeera).',
    benefits: '• Calms severe acidity, heartburn, and GERD\n• Purifies lymphatic channels\n• Enhances digestive enzyme secretion\n• Relieves post-meal heaviness',
    usageInstructions: '5-10 drops in warm water twice daily after meals.',
    precautions: 'Close dropper tightly after each use.',
    ayurvedicFormulation: AyurvedicFormulation.KWATHA,
    ayushLicenseNo: 'UP-AYUR-2024-822',
    fssaiLicenseNo: '12724001000902',
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    variants: [
      { id: 'var_ca_30ml', sku: 'AE-CA-30ML', sizeLabel: '30ml Dropper Bottle', mrp: 160, sellingPrice: 135, costPrice: 50, stock: 110, isDefault: true },
    ],
    images: [
      { id: 'img_ca_01', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 5. Power Tulsi Concentrated Drops (From PDF Pg 1, 2)
  {
    id: 'prod_power_tulsi',
    categoryId: 'cat_arks_drops',
    name: 'Power Tulsi (5-Tulsi Concentrated Drops)',
    slug: 'power-tulsi-5-tulsi-concentrated-drops',
    skuPrefix: 'AE-PT',
    shortDescription: 'Liquid extract of Rama, Shyama, Vishnu, Van and Nimbu Tulsi for supreme respiratory immunity and viral defense.',
    fullDescription: 'Power Tulsi combines cold-extracted essences of 5 rare Holy Basil varieties. It fortifies bronchial immunity, purifies drinking water, balances kapha mucus, and provides natural adaptogenic stress relief.',
    ingredients: 'Rama Tulsi, Shyama Tulsi, Vishnu Tulsi, Van Tulsi, Nimbu Tulsi extract, Honey base.',
    benefits: '• Rapid relief from cough, cold, flu, and sore throat\n• Natural antioxidant and cellular shield\n• Relieves seasonal allergies\n• Promotes lung capacity and clean breath',
    usageInstructions: 'Mix 2-3 drops in a glass of warm water, tea, or milk twice daily.',
    precautions: 'Do not exceed 10 drops per day.',
    ayurvedicFormulation: AyurvedicFormulation.KWATHA,
    ayushLicenseNo: 'UP-AYUR-2024-823',
    fssaiLicenseNo: '12724001000903',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_pt_25ml', sku: 'AE-PT-25ML', sizeLabel: '25ml Dropper Pack', mrp: 180, sellingPrice: 150, costPrice: 60, stock: 200, isDefault: true },
    ],
    images: [
      { id: 'img_pt_01', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 6. PR Drops / Paurush Rasayan Drops (From PDF Pg 1, 2)
  {
    id: 'prod_pr_drops',
    categoryId: 'cat_immunity_rasayana',
    name: 'PR Drops (Paurush Rasayan Energy & Stamina Drops)',
    slug: 'pr-drops-paurush-rasayan-vitality',
    skuPrefix: 'AE-PRD',
    shortDescription: 'Potent aphrodisiac tonic drops formulated with Ashwagandha, Ginseng, Safed Musli, Maca Root, Horny Goat Weed, and Cordyceps.',
    fullDescription: 'Formulated to restore peak vitality, endurance, and hormonal harmony. It increases red blood cell count, eliminates mental and physical exhaustion, and supports reproductive vigor.',
    ingredients: 'Ashwagandha, Korean Ginseng, Safed Musli, Maca Root, Horny Goat Weed, Tongkat Ali, Akarkara, Cordyceps, Pure Forest Honey.',
    benefits: '• Restores physical strength, energy, and stamina\n• Corrects reproductive debility and fatigue\n• Promotes healthy testosterone and vitality\n• Sharpens mental alertness',
    usageInstructions: 'Take 5 to 10 drops in half a glass of lukewarm milk or water twice daily.',
    precautions: 'Keep out of reach of children. Intended for adult usage.',
    ayurvedicFormulation: AyurvedicFormulation.KWATHA,
    ayushLicenseNo: 'UP-AYUR-2024-824',
    fssaiLicenseNo: '12724001000904',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_prd_25ml', sku: 'AE-PRD-25ML', sizeLabel: '25ml Dropper', mrp: 190, sellingPrice: 160, costPrice: 65, stock: 130, isDefault: true },
    ],
    images: [
      { id: 'img_prd_01', url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 7. 19 Berries Super Antioxidant Juice (From PDF Pg 1)
  {
    id: 'prod_19_berries',
    categoryId: 'cat_syrups_juices',
    name: '19 Wonder Berries Antioxidant Super Juice',
    slug: '19-wonder-berries-antioxidant-juice',
    skuPrefix: 'AE-19B',
    shortDescription: 'Ultra-concentrated blend of 19 therapeutic wild berries rich in polyphenols, anthocyanins, and bioflavonoids for cellular longevity.',
    fullDescription: 'Crafted with Acai berry, Goji, Sea Buckthorn, Bilberry, Cranberry, Blueberry, Blackberry, Mulberry, and Ayurvedic herbs. It rejuvenates damaged cells, neutralizes oxidative stress, and boosts natural collagen.',
    ingredients: 'Acai Berry, Goji Berry, Sea Buckthorn, Bilberry, Blackberry, Cranberry, Elderberry, Raspberry, Strawberry, Amla, Aloe Vera base.',
    benefits: '• Highest ORAC score super-antioxidant\n• Enhances radiant skin texture and eye health\n• Boosts metabolic energy without caffeine\n• Protects cardiovascular and cellular health',
    usageInstructions: 'Drink 20-30ml mixed with 100ml water on an empty stomach every morning.',
    precautions: 'Shake well before use. Refrigerate after opening and consume within 30 days.',
    ayurvedicFormulation: AyurvedicFormulation.SYRUP,
    ayushLicenseNo: 'UP-AYUR-2024-825',
    fssaiLicenseNo: '12724001000905',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    variants: [
      { id: 'var_19b_500ml', sku: 'AE-19B-500ML', sizeLabel: '500ml Glass Bottle', mrp: 1170, sellingPrice: 950, costPrice: 420, stock: 80, isDefault: true },
    ],
    images: [
      { id: 'img_19b_01', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 8. Lipid Care Syrup (From PDF Pg 3)
  {
    id: 'prod_lipid_care',
    categoryId: 'cat_syrups_juices',
    name: 'Lipid Care Ayurvedic Cholesterol & Heart Syrup',
    slug: 'lipid-care-ayurvedic-cholesterol-syrup',
    skuPrefix: 'AE-LC',
    shortDescription: 'Synergistic formulation with Arjuna, Guggul, Shankhpushpi, Allicin, and Pushkarmool to regulate lipid profile and blood pressure.',
    fullDescription: 'Formulated to manage healthy cholesterol and triglyceride levels, dissolve arterial plaque, improve micro-circulation, and reduce the risk of cardiovascular events.',
    ingredients: 'Bhringraj, Kasni, Sarpunkha, Bhumi Amla, Aloe Vera, Haritaki, Punarnava, Kalmegh, Giloy, Kutki, Papaya, Saunth, Arjuna, Brahmi, Ashwagandha, Guggul, Pushkarmool, Allicin.',
    benefits: '• Helps balance LDL and HDL cholesterol ratios\n• Reduces high blood pressure and arterial stiffness\n• Strengthens heart muscles and cardiac rhythm\n• Eliminates metabolic stagnation',
    usageInstructions: '10 to 20ml twice daily 1 hour after meals with lukewarm water.',
    precautions: 'Persons on blood thinners should consult their physician.',
    ayurvedicFormulation: AyurvedicFormulation.SYRUP,
    ayushLicenseNo: 'UP-AYUR-2024-826',
    fssaiLicenseNo: '12724001000906',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_lc_200ml', sku: 'AE-LC-200ML', sizeLabel: '200ml Bottle', mrp: 220, sellingPrice: 190, costPrice: 80, stock: 120, isDefault: false },
      { id: 'var_lc_500ml', sku: 'AE-LC-500ML', sizeLabel: '500ml Bottle', mrp: 480, sellingPrice: 399, costPrice: 160, stock: 85, isDefault: true },
      { id: 'var_lc_1000ml', sku: 'AE-LC-1000ML', sizeLabel: '1000ml Value Pack', mrp: 580, sellingPrice: 499, costPrice: 200, stock: 45, isDefault: false },
    ],
    images: [
      { id: 'img_lc_01', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 9. Joint Re-Builder Extra Strong Liniment (From PDF Pg 1, 5)
  {
    id: 'prod_joint_rebuilder_oil',
    categoryId: 'cat_herbal_oils',
    name: 'Joint Re-Builder Extra Strong Pain Liniment (Oil)',
    slug: 'joint-rebuilder-pain-liniment-oil',
    skuPrefix: 'AE-JRO',
    shortDescription: 'Deep-penetrating herbal liniment with Sesame, Flax, Wintergreen, Eucalyptus, Turpentine, Boswellia, and Turmeric oils.',
    fullDescription: 'Delivers rapid transdermal absorption to soothe stiff, inflamed joints, repair cartilage wear, relieve cervical and lumbar backache, and restore joint mobility.',
    ingredients: 'Sesame oil, Flaxseed oil, Wintergreen oil, Eucalyptus oil, Ajwain oil, Camphor oil, Turpentine oil, Peppermint oil, Boswellia serrata oil, Turmeric oil.',
    benefits: '• Fast relief from arthritis, joint stiffness, and sciatica\n• Reduces synovial inflammation and swelling\n• Non-sticky and deeply absorbed\n• Ideal for elderly joint mobility and sports sprains',
    usageInstructions: 'Gently massage 5-10ml over affected joint area in circular motion. Apply gentle warm compress for enhanced relief.',
    precautions: 'For external application only. Do not apply on open cuts or broken skin.',
    ayurvedicFormulation: AyurvedicFormulation.TAILA,
    ayushLicenseNo: 'UP-AYUR-2024-827',
    fssaiLicenseNo: '12724001000907',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_jro_75ml', sku: 'AE-JRO-75ML', sizeLabel: '75ml Bottle', mrp: 210, sellingPrice: 175, costPrice: 70, stock: 160, isDefault: true },
      { id: 'var_jro_100ml', sku: 'AE-JRO-100ML', sizeLabel: '100ml Value Pack', mrp: 270, sellingPrice: 225, costPrice: 90, stock: 110, isDefault: false },
    ],
    images: [
      { id: 'img_jro_01', url: 'https://images.unsplash.com/photo-1608248597359-009f4f1074e2?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 10. Liver Reactivator Hepatic Detox Syrup (From PDF Pg 4)
  {
    id: 'prod_liver_reactivator',
    categoryId: 'cat_syrups_juices',
    name: 'Liver Reactivator Hepatic Detox Syrup',
    slug: 'liver-reactivator-hepatic-detox-syrup',
    skuPrefix: 'AE-LR',
    shortDescription: 'Clinically proven hepatic revitalizer with Bhringraj, Kasni, Sarpunkha, Bhumi Amla, Kalmegh, and Kutki for fatty liver and jaundice.',
    fullDescription: 'Comprehensive liver therapy prepared from 14 hepatoprotective botanicals. It clears bilirubin excess, reverses non-alcoholic fatty liver changes, improves digestive appetite, and shields against drug-induced toxicity.',
    ingredients: 'Bhringraj, Kasni, Sarpunkha, Bhumi Amla, Aloe Vera, Haritaki, Punarnava, Kalmegh, Giloy, Kutki, Papaya, Saunth, Ajwain, Marich, Syonak.',
    benefits: '• Highly beneficial for jaundice, fatty liver, and sluggish digestion\n• Normalizes elevated SGOT and SGPT liver enzyme levels\n• Stimulates bile secretion and natural appetite\n• Enhances metabolic detoxification',
    usageInstructions: 'Take 10ml to 15ml twice daily with water before or after meals.',
    precautions: 'Safe for long-term usage with ongoing allopathic treatments.',
    ayurvedicFormulation: AyurvedicFormulation.SYRUP,
    ayushLicenseNo: 'UP-AYUR-2024-828',
    fssaiLicenseNo: '12724001000908',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_lr_200ml', sku: 'AE-LR-200ML', sizeLabel: '200ml Bottle', mrp: 160, sellingPrice: 135, costPrice: 55, stock: 175, isDefault: false },
      { id: 'var_lr_500ml', sku: 'AE-LR-500ML', sizeLabel: '500ml Bottle', mrp: 380, sellingPrice: 320, costPrice: 130, stock: 120, isDefault: true },
    ],
    images: [
      { id: 'img_lr_01', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 11. Sugar Normal Anti-Diabetic Juice (From PDF Pg 6)
  {
    id: 'prod_sugar_normal',
    categoryId: 'cat_syrups_juices',
    name: 'Sugar Normal Anti-Diabetic Glycemic Juice',
    slug: 'sugar-normal-anti-diabetic-juice',
    skuPrefix: 'AE-SN',
    shortDescription: 'Potent glycemic balancer containing Gudmar, Jamun, Vijaysar, Chirata, Kutki, Punarnava, and Ashwagandha.',
    fullDescription: 'Natural botanical complex that supports pancreatic beta-cell health, minimizes post-meal blood sugar spikes, reduces sweet cravings, and counters diabetic fatigue and neuropathic weakness.',
    ingredients: 'Gudmar, Bhumi Amla, Punarnava, Makoy, Kasni, Jamun seed, Dalchini, Vijaysar, Chirata, Kutki, Ashwagandha.',
    benefits: '• Regulates blood sugar spikes and HbA1c levels\n• Curbs sugar cravings naturally\n• Relieves diabetic lethargy, thirst, and frequent urination\n• Protects micro-vascular health',
    usageInstructions: 'Drink 20ml to 30ml in half a glass of warm water on an empty stomach every morning and evening.',
    precautions: 'Monitor blood sugar levels regularly when taking with hypoglycemic medications.',
    ayurvedicFormulation: AyurvedicFormulation.SYRUP,
    ayushLicenseNo: 'UP-AYUR-2024-829',
    fssaiLicenseNo: '12724001000909',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_sn_500ml', sku: 'AE-SN-500ML', sizeLabel: '500ml Bottle', mrp: 580, sellingPrice: 490, costPrice: 195, stock: 110, isDefault: true },
      { id: 'var_sn_1000ml', sku: 'AE-SN-1000ML', sizeLabel: '1000ml Value Pack', mrp: 980, sellingPrice: 799, costPrice: 320, stock: 65, isDefault: false },
    ],
    images: [
      { id: 'img_sn_01', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 12. Curcumin 95% Extract Capsules (From PDF Pg 12)
  {
    id: 'prod_curcumin_95',
    categoryId: 'cat_capsules',
    name: 'Curcumin 95% Standardized Turmeric Extract Capsules',
    slug: 'curcumin-95-standardized-turmeric-capsules',
    skuPrefix: 'AE-CUR95',
    shortDescription: 'High-potency standardized 95% Curcuminoids with Piperine for maximum bio-absorption, anti-inflammatory and cellular longevity.',
    fullDescription: 'Concentrated active fraction of Curcuma longa. It provides profound joint relief, neutralizes systemic cellular inflammation, supports healthy liver metabolism, and acts as a powerful oncological antioxidant shield.',
    ingredients: 'Standardized Curcumin (Curcuma longa rhizome extract 95% Curcuminoids) 450mg, Piperine (Black Pepper Extract 95%) 5mg.',
    benefits: '• Superior joint flexibility and anti-inflammatory relief\n• Powerful cellular protector and antioxidant\n• Enhances insulin sensitivity and liver detoxification\n• Supports cardiovascular health and clear brain function',
    usageInstructions: 'Take 1 capsule twice daily with warm milk or after meals.',
    precautions: 'Do not exceed recommended daily dosage. Keep in a cool, dry place.',
    ayurvedicFormulation: AyurvedicFormulation.CAPSULE,
    ayushLicenseNo: 'UP-AYUR-2024-830',
    fssaiLicenseNo: '12724001000910',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    variants: [
      { id: 'var_cur_60c', sku: 'AE-CUR-60C', sizeLabel: '60 Veg Capsules Bottle', mrp: 980, sellingPrice: 799, costPrice: 310, stock: 95, isDefault: true },
    ],
    images: [
      { id: 'img_cur_01', url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 13. Silymarine Milk Thistle High Potency Capsules (From PDF Pg 13)
  {
    id: 'prod_silymarine_capsules',
    categoryId: 'cat_capsules',
    name: 'Silymarine Milk Thistle Liver Detox Capsules',
    slug: 'silymarine-milk-thistle-liver-detox-capsules',
    skuPrefix: 'AE-SMT',
    shortDescription: 'Standardized 80% Silymarin seed extract for deep liver regeneration, gallbladder health, and toxin clearance.',
    fullDescription: 'High-grade Silybum marianum extract that stimulates hepatocyte protein synthesis, protects liver membranes from lipid peroxidation, and aids gallbladder bile flow.',
    ingredients: 'Silymarin (Milk Thistle Seed Extract 80% Silymarin) 400mg, Kutki, Bhumi Amla, Dandelion root.',
    benefits: '• Shields and rebuilds damaged liver cells\n• Promotes natural detoxification of alcohol and pharmaceuticals\n• Supports gallbladder and renal health\n• Enhances skin clarity and metabolic vitality',
    usageInstructions: '1 capsule twice daily with meals.',
    precautions: 'Pregnant or nursing mothers should consult a physician.',
    ayurvedicFormulation: AyurvedicFormulation.CAPSULE,
    ayushLicenseNo: 'UP-AYUR-2024-831',
    fssaiLicenseNo: '12724001000911',
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    variants: [
      { id: 'var_smt_60c', sku: 'AE-SMT-60C', sizeLabel: '60 Veg Capsules', mrp: 720, sellingPrice: 599, costPrice: 240, stock: 85, isDefault: true },
    ],
    images: [
      { id: 'img_smt_01', url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 14. Kesar Gold Royal Chyawanprash (From PDF Pg 14)
  {
    id: 'prod_chyawanprash_kesar',
    categoryId: 'cat_immunity_rasayana',
    name: 'Kesar Gold Royal Chyawanprash with 48 Herbs',
    slug: 'kesar-gold-royal-chyawanprash-48-herbs',
    skuPrefix: 'AE-KGC',
    shortDescription: 'Sacred Ayurvedic rasayana cooked in copper vessels with fresh Amalaki, Kashmiri Kesar, Dashmool, Vanshlochan, and Pure Cow Ghee.',
    fullDescription: 'Prepared strictly according to Charaka Samhita Rasayana Adhyaya. It strengthens Ojas (innate immunity), nourishes all 7 Dhatus, enhances lung vitality, and sustains youthful physical and mental stamina.',
    ingredients: 'Fresh Amla pulp, Kashmiri Saffron (Kesar), Dashmool, Pippali, Ashwagandha, Shatavari, Vanshlochan, Cardamom, Honey, Pure Desi Cow Ghee, 48 Classical Herbs.',
    benefits: '• Builds formidable resistance against viral infections and seasonal coughs\n• Enhances memory, focus, and mental retention\n• Delays biological aging (Vayasthapana)\n• Nourishes bone tissue, skin, and respiratory tract',
    usageInstructions: '1-2 teaspoons daily in the morning followed by a glass of warm milk.',
    precautions: 'Store in a dry place. Use a clean, dry spoon.',
    ayurvedicFormulation: AyurvedicFormulation.AWALEHA,
    ayushLicenseNo: 'UP-AYUR-2024-832',
    fssaiLicenseNo: '12724001000912',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_kgc_1kg', sku: 'AE-KGC-1KG', sizeLabel: '1kg Royal Jar', mrp: 880, sellingPrice: 749, costPrice: 320, stock: 75, isDefault: true },
    ],
    images: [
      { id: 'img_kgc_01', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
  // 15. Dento Strong Ayurvedic Toothpaste (From PDF Pg 14)
  {
    id: 'prod_dento_strong',
    categoryId: 'cat_digestive_health',
    name: 'Dento Strong Ayurvedic Herbal Toothpaste',
    slug: 'dento-strong-ayurvedic-herbal-toothpaste',
    skuPrefix: 'AE-DST',
    shortDescription: '100% natural herbal oral care formulation with Vajradanti, Clove, Camphor, Babool, Majuphal, and Tomar.',
    fullDescription: 'Holistic Ayurvedic dental therapy that relieves tooth sensitivity, stops bleeding gums (pyorrhea), eliminates oral bacteria, and strengthens dental enamel without synthetic fluorides.',
    ingredients: 'Vajradanti, Camphor (Kapoor), Clove (Laung), Choti Pippali, Haldi, Baibidang, Babool, Majuphal, Akarkara, Tomar seed, Mulethi, Pudina satva.',
    benefits: '• Cures bleeding gums, gingivitis, and bad breath\n• Relieves sensitivity to hot and cold foods\n• Natural enamel strengthening\n• 100% vegetarian & fluoride free',
    usageInstructions: 'Brush thoroughly at least twice daily with a soft toothbrush.',
    precautions: 'Do not swallow. Suitable for all age groups.',
    ayurvedicFormulation: AyurvedicFormulation.OTHER,
    ayushLicenseNo: 'UP-AYUR-2024-833',
    fssaiLicenseNo: '12724001000913',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    variants: [
      { id: 'var_dst_100g', sku: 'AE-DST-100G', sizeLabel: '100g Tube', mrp: 160, sellingPrice: 135, costPrice: 45, stock: 220, isDefault: true },
    ],
    images: [
      { id: 'img_dst_01', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', isPrimary: true, sortOrder: 0 },
    ],
  },
];
