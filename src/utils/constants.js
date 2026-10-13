/**
 * Application Constants & Configuration Settings
 * Strictly zero hardcoding - all parameters, bounds, and defaults are centralized here.
 */

export const APP_CONFIG = {
  BRAND_NAME: 'TimberCraft',
  TAGLINE: 'Handcrafted Wooden Doors & Architectural Side Frames (Choukaths)',
  SUPPORT_PHONE: '+91 98765 43210',
  WHATSAPP_NUMBER: '919876543210', // digits only for wa.me API
  SUPPORT_EMAIL: 'concierge@timbercraftdoors.com',
  CURRENCY_SYMBOL: '₹',
  CURRENCY_CODE: 'INR',
  DEFAULT_TAX_RATE: 0.18, // 18% GST estimate
  WARRANTY_YEARS: 10,
  ESTIMATED_DELIVERY_DAYS: '14-21 Business Days',
};

export const DIMENSION_LIMITS = {
  MIN_HEIGHT_INCHES: 72,   // 6 feet
  MAX_HEIGHT_INCHES: 120,  // 10 feet
  DEFAULT_HEIGHT_INCHES: 84, // 7 feet standard

  MIN_WIDTH_INCHES: 28,    // 2.33 feet
  MAX_WIDTH_INCHES: 60,    // 5 feet
  DEFAULT_WIDTH_INCHES: 38, // 3.16 feet standard

  MIN_THICKNESS_MM: 32,
  MAX_THICKNESS_MM: 60,
  DEFAULT_THICKNESS_MM: 40,
};

export const CATEGORIES = [
  { id: 'all', label: 'All Doors & Side Frames', description: 'Complete artisan doors & choukath portfolio' },
  { id: 'wooden-frames', label: 'Wooden Side Frames (Choukaths)', description: 'Ornate hand-carved & precision-milled timber door frames' },
  { id: 'pooja-doors', label: 'Carved Pooja Sanctum Doors', description: 'Deepalakshmi, Ganesha, temple bells & sacred jali shutters' },
  { id: 'main-entrance', label: 'Main Entrance & Double Doors', description: 'Heavy solid teak grand entrance & double leaf doors' },
  { id: 'internal-flush', label: 'Interior & Raised Panel Doors', description: 'Classic arched panel (Model 0406) & sleek veneer doors' },
  { id: 'sliding-barn', label: 'Sliding & Barn Doors', description: 'Space-saving rustic and loft sliding doors' },
];

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured & Popular' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Customer Rating' },
  { id: 'name-asc', label: 'Alphabetical: A to Z' },
];

export const WOOD_SPECIES_LIST = [
  {
    id: 'burma-teak',
    name: 'Burma Teak (Grade 1)',
    origin: 'Myanmar / Certified Sustainable',
    density: 'High (680 kg/m³)',
    grain: 'Dense, natural oils, termite-resistant',
    pricePerSqFt: 1450,
    frameRatePerRft: 680,
    colorHex: '#8c531b',
    badge: 'Ultimate Luxury',
  },
  {
    id: 'african-teak',
    name: 'African Teak (Iroko)',
    origin: 'West Africa',
    density: 'Medium-High (660 kg/m³)',
    grain: 'Golden amber with rich interlocked grain',
    pricePerSqFt: 980,
    frameRatePerRft: 480,
    colorHex: '#b46522',
    badge: 'Popular Choice',
  },
  {
    id: 'honne-wood',
    name: 'Honne (Indian Kino)',
    origin: 'Western Ghats, India',
    density: 'Very High (780 kg/m³)',
    grain: 'Coarse texture, exceptionally durable for frames',
    pricePerSqFt: 850,
    frameRatePerRft: 420,
    colorHex: '#9a4714',
    badge: 'Best for Frames & Choukaths',
  },
  {
    id: 'american-walnut',
    name: 'American Black Walnut',
    origin: 'North America',
    density: 'Medium (640 kg/m³)',
    grain: 'Deep dark espresso hues, silky smooth finish',
    pricePerSqFt: 1650,
    frameRatePerRft: 750,
    colorHex: '#3d2b22',
    badge: 'Contemporary Elite',
  },
  {
    id: 'white-oak',
    name: 'European White Oak',
    origin: 'Central Europe',
    density: 'High (720 kg/m³)',
    grain: 'Prominent medullary rays, Scandinavian aesthetic',
    pricePerSqFt: 1200,
    frameRatePerRft: 560,
    colorHex: '#c49a6c',
    badge: 'Architect Favorite',
  },
  {
    id: 'red-meranti',
    name: 'Red Meranti',
    origin: 'Southeast Asia',
    density: 'Medium (550 kg/m³)',
    grain: 'Uniform reddish brown, budget friendly interior wood',
    pricePerSqFt: 620,
    frameRatePerRft: 310,
    colorHex: '#a04838',
    badge: 'Value Selection',
  },
];

export const FINISH_OPTIONS = [
  {
    id: 'natural-polish',
    name: 'Natural Honey Teak Polish',
    description: 'Brings out warm golden amber growth rings with natural gloss',
    priceAddon: 0,
    luster: 'Satin Amber Glow',
  },
  {
    id: 'high-gloss-pu',
    name: 'High-Gloss Italian PU Polish',
    description: 'Mirror-like glassy lacquer as seen on luxury Model 0406',
    priceAddon: 2400,
    luster: '95% Mirror Gloss',
  },
  {
    id: 'raw-unpolished',
    name: 'Raw Seasoned Wood (Unpolished)',
    description: 'Planed and sand-buffed smooth, ready for your custom site painter',
    priceAddon: -1000,
    luster: 'Natural Raw Timber',
  },
  {
    id: 'antique-matte',
    name: 'Antique Traditional Matte Finish',
    description: 'Subtle darkened shadow effects highlighting intricate carving details',
    priceAddon: 1800,
    luster: 'Heritage Matte',
  },
];

export const FRAME_PROFILES = [
  {
    id: 'none',
    name: 'No Wooden Frame (Door Shutter Only)',
    dimensions: 'N/A',
    description: 'For retrofit into existing door choukath or subframe',
    rateMultiplier: 0,
    rebateType: 'None',
  },
  {
    id: 'gajalakshmi-carved',
    name: 'Gajalakshmi Carved Temple Frame & Lintel',
    dimensions: '125mm x 100mm (5" x 4") + Ornate Architrave',
    description: 'Master hand-carved Gaja-Lakshmi top lintel, peacocks & floral pillar jambs',
    rateMultiplier: 2.4,
    rebateType: 'Double Rebate (Main Shutter + Safety Screen)',
  },
  {
    id: 'ak982-spiral-braid',
    name: 'AK-982 Spiral Braid & Lotus Carved Frame Jambs',
    dimensions: '125mm x 75mm (5" x 3")',
    description: 'Continuous carved lotus rosette ribbon braid on left, right jambs & deity header',
    rateMultiplier: 1.9,
    rebateType: 'Single/Double Rebate',
  },
  {
    id: 'frame-4x25',
    name: 'Standard Clean Choukath (4" x 2.5")',
    dimensions: '100mm x 65mm',
    description: 'Ideal for internal rooms, bedrooms, and clean contemporary walls',
    rateMultiplier: 1.0,
    rebateType: 'Single Rebate (35mm Shutter)',
  },
  {
    id: 'frame-5x3',
    name: 'Heavy Entrance Choukath (5" x 3")',
    dimensions: '125mm x 75mm',
    description: 'Solid heavy entrance jambs with high load-bearing capacity',
    rateMultiplier: 1.35,
    rebateType: 'Single Rebate (40mm-45mm Shutter)',
  },
  {
    id: 'frame-5x4-double',
    name: 'Grand Double Rebate Choukath (5" x 4")',
    dimensions: '125mm x 100mm',
    description: 'Accommodates main wooden door + exterior mosquito mesh safety door',
    rateMultiplier: 1.75,
    rebateType: 'Double Rebate (Main + Mesh Door)',
  },
];

export const HARDWARE_PACKAGES = [
  {
    id: 'standard-brass',
    name: 'Solid Brass Architectural Set',
    description: 'Heavy cast-brass mortise handle, high-security lock cylinder, and 3 heavy ball-bearing hinges',
    price: 4500,
    finish: 'Brushed Satin Brass',
  },
  {
    id: 'traditional-bells-latches',
    name: 'Temple Brass Bells & Antique Tower Bolts',
    description: 'Solid cast brass mandir bells, antique aldrop sliding latch, and ornamental rosettes',
    price: 5200,
    finish: 'Antique Cast Brass',
  },
  {
    id: 'stainless-steel-lever',
    name: 'Modern Stainless Steel Plate Handle & Mortise (Model 0406 Style)',
    description: 'Heavy-gauge SS-304 satin lever handle on backplate with euro-profile brass cylinder',
    price: 3600,
    finish: 'Brushed Stainless Steel',
  },
  {
    id: 'smart-digital-lock',
    name: 'Smart Biometric + Brass Pull Handle',
    description: 'Fingerprint, RFID, Passcode, and Keyless smart lock with 24" luxury vertical pull handle',
    price: 14200,
    finish: 'Smoked Gunmetal & Brass',
  },
  {
    id: 'hardware-none',
    name: 'Door Leaf / Frame Only (Exclude Hardware)',
    description: 'Supply your own locks, hinges, and handles during carpentry fitting',
    price: 0,
    finish: 'None',
  },
];

export const ROOM_ENVIRONMENTS = [
  {
    id: 'traditional-mandir',
    name: 'Traditional Teak Pooja Room',
    wallColor: '#fbf4ea',
    floorColor: '#c8a27a',
    lighting: 'Warm Brass Glow',
    bgClass: 'bg-gradient-to-b from-amber-50 to-orange-100',
  },
  {
    id: 'modern-villa',
    name: 'Modern Stone Villa Entrance',
    wallColor: '#2b2d30',
    floorColor: '#e0ded9',
    lighting: 'Warm Ambient Spotlights',
    bgClass: 'bg-gradient-to-b from-stone-800 to-stone-900',
  },
  {
    id: 'scandi-interior',
    name: 'Minimalist Scandinavian Hall',
    wallColor: '#f3f4f6',
    floorColor: '#d6c7b2',
    lighting: 'Soft Daylight',
    bgClass: 'bg-gradient-to-b from-slate-100 to-stone-200',
  },
  {
    id: 'luxury-hallway',
    name: 'Italian Marble Luxury Foyer',
    wallColor: '#1e293b',
    floorColor: '#f1f5f9',
    lighting: 'Dramatic Chandelier Contrast',
    bgClass: 'bg-gradient-to-b from-slate-900 via-stone-900 to-neutral-950',
  },
];

export const STORAGE_KEYS = {
  CART: 'timbercraft_cart_v1',
  WISHLIST: 'timbercraft_wishlist_v1',
  RECENT_CONFIG: 'timbercraft_custom_config_v1',
};
