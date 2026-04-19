import { assetPath } from '../lib/asset-path';

// Product type
export interface Product {
  id: string;
  name: string;
  grade: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  bestFor: string;
  tone: string;
  // Extended detail fields
  fullDescription: string;
  strength: number;        // MPa compressive strength
  settingTime: string;
  weightPerBag: string;
  applications: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  customerFavorite?: boolean;
  tag?: string;            // e.g. "Most Popular", "Eco Friendly", "Budget Pick"
}

// Cart item type
export interface CartItem extends Product {
  quantity: number;
}

// Products data
export const products: Product[] = [
  {
    id: 'opc53',
    name: 'UltraTech OPC 53 Grade',
    grade: '53',
    description: 'High strength concrete, columns, slabs',
    price: 425,
    image: assetPath('/product_opc53.jpg'),
    badge: 'High strength',
    bestFor: 'Columns, beams, slabs',
    tone: 'linear-gradient(135deg, rgba(255,77,46,0.3), rgba(11,12,15,0.95))',
    fullDescription: 'UltraTech OPC 53 Grade is the preferred cement for high-strength structural applications. It achieves 53 MPa compressive strength at 28 days, making it ideal for RCC structures, high-rise buildings, and heavy-load bearing components like columns and beams. Trusted by engineers and contractors across Tamil Nadu for premium quality and consistent performance.',
    strength: 53,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['RCC Structures', 'High-rise buildings', 'Bridges & flyovers', 'Columns & beams', 'Pre-stressed concrete', 'Pre-cast elements'],
    features: ['Highest compressive strength', 'Rapid strength gain', 'Low water demand', 'Excellent finish quality', 'IS 12269 compliant'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 53 MPa' },
      { label: 'Fineness', value: '≥ 225 m²/kg' },
      { label: 'Initial Setting Time', value: '≥ 30 minutes' },
      { label: 'Soundness', value: '≤ 10 mm' },
      { label: 'Standard', value: 'IS 12269:2013' }
    ],
    customerFavorite: true,
    tag: 'Most Popular'
  },
  {
    id: 'opc43',
    name: 'UltraTech OPC 43 Grade',
    grade: '43',
    description: 'General construction, plaster, masonry',
    price: 395,
    image: assetPath('/product_opc43.jpg'),
    badge: 'All-purpose',
    bestFor: 'Homes, walls, plaster',
    tone: 'linear-gradient(135deg, rgba(246,247,249,0.18), rgba(11,12,15,0.96))',
    fullDescription: 'UltraTech OPC 43 Grade cement is the go-to choice for general construction projects. Offering a well-balanced combination of strength and workability, it is perfect for residential buildings, plastering, flooring, and non-structural applications. It provides smooth finish and easy mixing, making it a contractor favorite.',
    strength: 43,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['Residential construction', 'Plastering & rendering', 'Flooring & tiling', 'Boundary walls', 'General masonry', 'Pathway construction'],
    features: ['Excellent workability', 'Smooth plastering finish', 'Balanced strength-to-cost ratio', 'Easy to mix', 'IS 8112 compliant'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 43 MPa' },
      { label: 'Fineness', value: '≥ 225 m²/kg' },
      { label: 'Initial Setting Time', value: '≥ 30 minutes' },
      { label: 'Soundness', value: '≤ 10 mm' },
      { label: 'Standard', value: 'IS 8112:2013' }
    ],
    customerFavorite: true,
    tag: 'Best Value'
  },
  {
    id: 'ppc',
    name: 'UltraTech PPC Cement',
    grade: 'PPC',
    description: 'Eco-friendly, durable, sulfate-resistant',
    price: 380,
    image: assetPath('/product_ppc.jpg'),
    badge: 'Long-life mix',
    bestFor: 'Foundations, masonry, mass concrete',
    tone: 'linear-gradient(135deg, rgba(255,135,58,0.22), rgba(11,12,15,0.96))',
    fullDescription: 'UltraTech Portland Pozzolana Cement (PPC) is an eco-friendly cement blended with fly ash. It offers superior long-term strength, excellent resistance to sulfate and chloride attacks, and reduced heat of hydration. Ideal for mass concrete works, foundations, and coastal construction where durability matters most.',
    strength: 33,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['Mass concrete', 'Foundations & footings', 'Dam construction', 'Coastal projects', 'Underground structures', 'Water tanks'],
    features: ['Eco-friendly with fly ash', 'Reduced heat of hydration', 'Sulfate & chloride resistant', 'Superior long-term strength', 'IS 1489 compliant'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 33 MPa' },
      { label: 'Fly Ash Content', value: '15-35%' },
      { label: 'Initial Setting Time', value: '≥ 30 minutes' },
      { label: 'Drying Shrinkage', value: '≤ 0.15%' },
      { label: 'Standard', value: 'IS 1489 (Part 1):2015' }
    ],
    tag: 'Eco Friendly'
  },
  {
    id: 'psc',
    name: 'UltraTech PSC Cement',
    grade: 'PSC',
    description: 'Durable performance for coastal, humid, and foundation-heavy projects.',
    price: 365,
    image: assetPath('/product_ppc.jpg'),
    badge: 'Coastal-ready',
    bestFor: 'Basements, marine and humid zones',
    tone: 'linear-gradient(135deg, rgba(54,95,145,0.34), rgba(11,12,15,0.96))',
    fullDescription: 'UltraTech Portland Slag Cement (PSC) contains ground granulated blast furnace slag for exceptional durability in aggressive environments. Its low heat of hydration and superior resistance to sulfate and chemical attacks make it perfect for coastal areas, marine structures, and industrial foundations.',
    strength: 40,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['Marine construction', 'Coastal buildings', 'Industrial foundations', 'Sewage treatment plants', 'Chemical plants', 'Underground construction'],
    features: ['Excellent chemical resistance', 'Low heat of hydration', 'Marine-grade durability', 'Crack-resistant', 'IS 455 compliant'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 33 MPa' },
      { label: 'Slag Content', value: '25-65%' },
      { label: 'Initial Setting Time', value: '≥ 30 minutes' },
      { label: 'Sulfate Resistance', value: 'High' },
      { label: 'Standard', value: 'IS 455:2015' }
    ]
  },
  {
    id: 'masonry',
    name: 'UltraTech Masonry Cement',
    grade: 'MC',
    description: 'Smooth workable mix for blockwork, plastering, and repair-focused jobs.',
    price: 350,
    image: assetPath('/product_opc43.jpg'),
    badge: 'Finishing work',
    bestFor: 'Plaster, brickwork, patch repair',
    tone: 'linear-gradient(135deg, rgba(160,116,72,0.28), rgba(11,12,15,0.96))',
    fullDescription: 'UltraTech Masonry Cement is specifically formulated for masonry applications. Its superior workability and plasticity make it ideal for brick and block laying, plastering, stucco work, and tile fixing. It provides excellent bond strength and a smooth, professional finish that doesn\'t crack or peel.',
    strength: 30,
    settingTime: '90 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['Brick & block laying', 'Internal plastering', 'External rendering', 'Tile fixing', 'Stucco work', 'Patch repairs'],
    features: ['Superior workability', 'Excellent bond strength', 'Crack-resistant finish', 'Easy to apply', 'Smooth consistency'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 5 MPa' },
      { label: 'Air Content', value: '8-21%' },
      { label: 'Initial Setting Time', value: '≥ 90 minutes' },
      { label: 'Water Retention', value: '≥ 70%' },
      { label: 'Standard', value: 'IS 3466:1988' }
    ],
    tag: 'Finishing Special'
  },
  {
    id: 'bulk-supply',
    name: 'UltraTech Bulk Site Supply',
    grade: 'BULK',
    description: 'Priority dispatch stock for contractor schedules and recurring site pours.',
    price: 415,
    image: assetPath('/product_opc53.jpg'),
    badge: 'Project dispatch',
    bestFor: 'Commercial projects and repeat loads',
    tone: 'linear-gradient(135deg, rgba(255,77,46,0.22), rgba(60,18,12,0.95))',
    fullDescription: 'UltraTech Bulk Site Supply is tailored for large-scale construction projects requiring consistent, high-volume cement delivery. Get priority dispatch, dedicated fleet allocation, and flexible scheduling for commercial developments, apartment complexes, and infrastructure projects. Each batch is OPC 53 grade for maximum structural integrity.',
    strength: 53,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg (or loose bulk)',
    applications: ['Commercial buildings', 'Apartment complexes', 'Infrastructure projects', 'Industrial plants', 'Road construction', 'Government tenders'],
    features: ['Priority dispatch', 'Flexible scheduling', 'Volume discounts', 'Dedicated fleet', 'Invoice & GST billing'],
    specifications: [
      { label: 'Base Grade', value: 'OPC 53' },
      { label: 'Minimum Order', value: '100 bags' },
      { label: 'Delivery', value: 'Same day / Next day' },
      { label: 'Payment Terms', value: 'Credit available' },
      { label: 'Invoicing', value: 'GST compliant' }
    ],
    tag: 'Contractor Pick'
  },
  {
    id: 'weather-plus',
    name: 'UltraTech Weather Plus',
    grade: 'WP',
    description: 'Water-repellent cement for exterior walls and rain-exposed surfaces.',
    price: 440,
    image: assetPath('/product_ppc.jpg'),
    badge: 'Waterproof',
    bestFor: 'Exterior walls, terraces, wet zones',
    tone: 'linear-gradient(135deg, rgba(56,189,248,0.25), rgba(11,12,15,0.96))',
    fullDescription: 'UltraTech Weather Plus is a premium water-repellent cement designed to protect exterior walls and rain-exposed structures from moisture penetration. Its advanced hydrophobic formula ensures long-lasting protection against dampness, efflorescence, and fungal growth, keeping your walls dry and beautiful for years.',
    strength: 43,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['Exterior walls', 'Terrace waterproofing', 'Boundary walls', 'Balconies', 'Water tanks', 'Bathroom walls'],
    features: ['Water-repellent formula', 'Anti-efflorescence', 'Fungus resistant', 'UV stable', 'Long-lasting protection'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 43 MPa' },
      { label: 'Water Absorption', value: '≤ 3%' },
      { label: 'Initial Setting Time', value: '≥ 30 minutes' },
      { label: 'Hydrophobic Rating', value: 'High' },
      { label: 'Standard', value: 'IS 8112 + Water Repellent' }
    ],
    customerFavorite: true,
    tag: 'Customer Favourite'
  },
  {
    id: 'super-build',
    name: 'UltraTech Super Build',
    grade: 'SB',
    description: 'Premium multi-purpose cement with enhanced crack resistance.',
    price: 460,
    image: assetPath('/product_opc53.jpg'),
    badge: 'Premium',
    bestFor: 'Complete home construction',
    tone: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(11,12,15,0.96))',
    fullDescription: 'UltraTech Super Build is a premium multi-purpose cement engineered with advanced micro-filler technology for superior crack resistance and exceptional finish quality. Whether it\'s foundations, walls, or roofing—Super Build delivers consistent performance at every stage of home construction. The go-to cement for homeowners who want the best.',
    strength: 50,
    settingTime: '30 min initial / 600 min final',
    weightPerBag: '50 kg',
    applications: ['Complete home building', 'Foundations to roofing', 'Swimming pools', 'Decorative concrete', 'Garden structures', 'Renovation work'],
    features: ['Micro-filler technology', 'Enhanced crack resistance', 'Superior finish', 'Multi-stage suitability', 'Premium formulation'],
    specifications: [
      { label: 'Compressive Strength (28 days)', value: '≥ 50 MPa' },
      { label: 'Fineness', value: '≥ 300 m²/kg' },
      { label: 'Initial Setting Time', value: '≥ 30 minutes' },
      { label: 'Crack Resistance', value: 'Enhanced' },
      { label: 'Standard', value: 'IS 12269 + Premium' }
    ],
    customerFavorite: true,
    tag: 'Premium Pick'
  }
];
