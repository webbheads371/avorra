export const HERO_SLIDES = [
  {
    id: 'shampoo-hero',
    tagline: 'PURE CARE BRIGHTER YOU',
    headline: 'Naturally Healthier Hair',
    subtitle: 'Clean ingredients. Real results.\nCare for today, a healthier tomorrow.',
    buttonText: 'Shop Shampoo',
    image: '/assets/hero_shampoo_bottle.jpg',
    productName: 'AVORA Nourishing Shampoo',
    price: 34.00,
    features: [
      { id: 1, icon: 'Leaf', label: 'Naturally Derived' },
      { id: 2, icon: 'FlaskConical', label: 'No Harsh Chemicals' },
      { id: 3, icon: 'Heart', label: 'Kind to You & the Planet' }
    ],
    details: {
      volume: '300 ml e 10.1 fl oz',
      scent: 'Wild Bergamot & Eucalyptus',
      ingredients: 'Organic Aloe Vera, Cold-Pressed Jojoba Oil, Silk Amino Acids, Moroccan Argan Oil, Botanical Extract Blend.'
    }
  },
  {
    id: 'conditioner-hero',
    tagline: 'INTENSE HYDRATION & REPAIR',
    headline: 'Silky Soft Botanical Shine',
    subtitle: 'Deeply restores moisture without heavy residue.\nFormulated for all hair textures.',
    buttonText: 'Shop Conditioner',
    image: '/assets/personal_care_category.jpg',
    productName: 'AVORA Botanical Conditioner',
    price: 36.00,
    features: [
      { id: 1, icon: 'Droplets', label: 'Deep Hydration' },
      { id: 2, icon: 'Shield', label: 'Color Safe' },
      { id: 3, icon: 'Sparkles', label: 'Weightless Softness' }
    ],
    details: {
      volume: '300 ml e 10.1 fl oz',
      scent: 'Rosemary & French Lavender',
      ingredients: 'Shea Butter, Hydrolyzed Wheat Protein, Plant Squalane, Vitamin E.'
    }
  },
  {
    id: 'baby-hero',
    tagline: 'PURE & ULTRA GENTLE',
    headline: 'Nurturing Sensitive Skin',
    subtitle: 'Hypoallergenic soothing care for mother and baby.\nDermatologist tested & approved.',
    buttonText: 'Shop Baby Care',
    image: '/assets/mother_baby_category.jpg',
    productName: 'AVORA Gentle Baby Wash',
    price: 28.00,
    features: [
      { id: 1, icon: 'Feather', label: 'Hypoallergenic' },
      { id: 2, icon: 'Sun', label: 'Tear-Free Formula' },
      { id: 3, icon: 'CheckCircle2', label: 'Pediatrician Approved' }
    ],
    details: {
      volume: '250 ml e 8.5 fl oz',
      scent: 'Fragrance-Free / Subtle Chamomile',
      ingredients: 'Colloidal Oatmeal, Organic Calendula, Golden Chamomile, Sweet Almond Oil.'
    }
  }
];

export const CATEGORIES = [
  {
    id: 'personal-care',
    title: 'Personal Care',
    description: 'Everyday essentials for a healthier you.',
    linkText: 'Shop Now',
    bgColor: '#e2e8df', // Muted sage green tint
    textColor: '#2d3829',
    image: '/assets/personal_care_category.jpg',
    count: '18 Products'
  },
  {
    id: 'food-nutrition',
    title: 'Food & Nutrition',
    description: 'Wholesome nutrition for a brighter tomorrow.',
    linkText: 'Shop Now',
    bgColor: '#f6ebe1', // Warm cream peach tint
    textColor: '#3a2d24',
    image: '/assets/food_nutrition_category.jpg',
    count: '12 Products'
  },
  {
    id: 'mother-baby',
    title: 'Mother & Baby',
    description: 'Gentle care for their brighter tomorrow.',
    linkText: 'Shop Now',
    bgColor: '#f4ebe2', // Soft beige tint
    textColor: '#382f28',
    image: '/assets/mother_baby_category.jpg',
    count: '15 Products'
  }
];

export const BESTSELLERS = [
  {
    id: 'p1',
    name: 'Nourishing Shampoo',
    subtitle: 'With Plant Botanicals',
    category: 'Personal Care',
    price: 1499.00,
    originalPrice: 1799.00,
    rating: 4.9,
    reviewsCount: 128,
    image: '/assets/hero_shampoo_bottle.jpg',
    badge: 'Best Seller',
    description: 'Cleanse, strengthen, and replenish hair with cold-pressed jojoba, aloe vera, and botanical extracts.'
  },
  {
    id: 'p2',
    name: 'Daily Botanical Lotion',
    subtitle: 'Hand & Body Hydration',
    category: 'Personal Care',
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.8,
    reviewsCount: 94,
    image: '/assets/personal_care_category.jpg',
    badge: 'Popular',
    description: 'Fast-absorbing natural lotion infused with shea butter and eucalyptus essential oil.'
  },
  {
    id: 'p3',
    name: 'Organic Oats & Seed Blend',
    subtitle: 'Wholefood Daily Nutrition',
    category: 'Food & Nutrition',
    price: 899.00,
    originalPrice: 1099.00,
    rating: 5.0,
    reviewsCount: 215,
    image: '/assets/food_nutrition_category.jpg',
    badge: 'Organic',
    description: 'Artisanal blend of organic steel-cut oats, chia, pumpkin seeds, and wild berry extracts.'
  },
  {
    id: 'p4',
    name: 'Gentle Baby Care Set',
    subtitle: 'Natural Wash & Soothing Cream',
    category: 'Mother & Baby',
    price: 2499.00,
    originalPrice: 2899.00,
    rating: 4.9,
    reviewsCount: 86,
    image: '/assets/mother_baby_category.jpg',
    badge: 'Award Winner',
    description: 'Complete organic baby care set featuring hypoallergenic lotion, wash, and plush organic bunny.'
  }
];

export const INGREDIENTS = [
  {
    name: 'Cold-Pressed Jojoba',
    role: 'Deep Scalp Moisture',
    desc: 'Mimics natural scalp oils to hydrate hair roots without clogging follicles.',
    icon: 'Droplet'
  },
  {
    name: 'Organic Aloe Vera',
    role: 'Soothing Hydration',
    desc: 'Calms skin irritation and provides antioxidant-rich botanical moisture.',
    icon: 'Sparkle'
  },
  {
    name: 'Silk Amino Acids',
    role: 'Strand Fortification',
    desc: 'Strengthens cuticles and improves elasticity to reduce breakage.',
    icon: 'ShieldCheck'
  },
  {
    name: 'Moroccan Argan',
    role: 'Natural Shine & Smoothness',
    desc: 'Rich in essential fatty acids and Vitamin E to tame frizz naturally.',
    icon: 'SunMedium'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "AVORA transformed my hair completely. My scalp feels nourished and healthy without any artificial heavy buildup. The aesthetic and ingredients are pure perfection.",
    author: "Elena Rostova",
    title: "Verified Buyer",
    rating: 5
  },
  {
    id: 2,
    quote: "The Gentle Baby Wash is a game changer for my newborn's sensitive skin. So soothing, zero harsh chemicals, and the minimal packaging looks beautiful in our bath space.",
    author: "Sarah Jenkins",
    title: "Mother of Two",
    rating: 5
  },
  {
    id: 3,
    quote: "DTC beauty done right. The food & nutrition oat blend is delicious, and the personal care line feels like a 5-star luxury spa at home.",
    author: "Marcus Chen",
    title: "Wellness Advocate",
    rating: 5
  }
];
