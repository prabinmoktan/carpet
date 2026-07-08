import persianHeritage from "../../public/persianHeritage.png";
import abstractImage from "../../public/abstractImage.png";
import persianImage from "../../public/persianImage.png";
import scandinavianImage from "../../public/scandinavianImage.png";
import emeraldImage from "../../public/emeraldImage.png";
import runnerImage from "../../public/runnerImage.png";
import burgundyPrayer from "../../public/burgundyPrayer.png";
import emeraldPrayer from "../../public/emeraldPrayer.png";
import creamPrayer from "../../public/creamPrayer.png";
import pm4 from "../../public/pm4.png";

import { LayoutDashboard } from "lucide-react";
import { Settings } from "lucide-react";
import { Boxes } from "lucide-react";
import { Mail } from "lucide-react";
import { ChartColumnDecreasing } from "lucide-react";
// import {  } from "./admin/AdminType";
import { Column } from "./admin/AdminUi/ProductTable/ProductTable";
import { ProductFormValues } from "./admin/AdminType";
import OptimizedImage from "./(public)/components/OptimizedImage/OptimizedImage";

import {
   ShoppingCart, Package, Users, BarChart3,
  
} from "lucide-react";

export const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Prayer Mats", href: "/prayerMats" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const products = [
  {
    id: "1",
    name: "Persian Heritage Collection",
    price: 2850,
    rating: 4.8,
    reviews: 24,
    image: persianHeritage,
    category: "Oriental",
    description:
      "An exquisite hand-knotted Persian rug featuring traditional medallion design with rich navy blues and gold accents.",
    specs: {
      size: "8' x 10'",
      material: "100% Wool",
      knots: "Hand-knotted, 120 knots per square inch",
      origin: "Iran",
      weight: "45 lbs",
    },
    inStock: true,
  },
  {
    id: "2",
    name: "Abstract Dream",
    category: "Contemporary",
    price: 1950,
    image: abstractImage,
    description:
      "Modern abstract design with bold shapes and layered textures for statement interiors.",
    specs: {
      size: "8' x 10'",
      material: "100% Wool",
      knots: "Hand-knotted, 120 knots per square inch",
      origin: "Iran",
      weight: "45 lbs",
    },
  },
  {
    id: "3",
    name: "Royal Medallion",
    category: "Traditional",
    price: 3200,
    image: persianImage,
    isNew: true,
    description:
      "Classic central medallion rug with detailed borders and a luxurious, timeless feel.",
    specs: {
      size: "8' x 10'",
      material: "100% Wool",
      knots: "Hand-knotted, 120 knots per square inch",
      origin: "Iran",
      weight: "45 lbs",
    },
  },
  {
    id: "4",
    name: "Nordic Minimal",
    category: "Modern",
    price: 1450,
    image: scandinavianImage,
    description:
      "Scandinavian-inspired minimal rug with clean lines and a soft neutral palette.",
    specs: {
      size: "8' x 10'",
      material: "100% Wool",
      knots: "Hand-knotted, 120 knots per square inch",
      origin: "Iran",
      weight: "45 lbs",
    },
  },
  {
    id: "5",
    name: "Emerald Luxury",
    category: "Contemporary",
    price: 2100,
    image: emeraldImage,
    description:
      "Deep emerald tones with subtle sheen, perfect for adding a touch of luxury.",
    specs: {
      size: "8' x 10'",
      material: "100% Wool",
      knots: "Hand-knotted, 120 knots per square inch",
      origin: "Iran",
      weight: "45 lbs",
    },
  },
  {
    id: "6",
    name: "Tribal Runner",
    category: "Vintage",
    price: 1650,
    image: runnerImage,
    description:
      "Narrow tribal runner with geometric patterns, ideal for hallways and entryways.",
    specs: {
      size: "8' x 10'",
      material: "100% Wool",
      knots: "Hand-knotted, 120 knots per square inch",
      origin: "Iran",
      weight: "45 lbs",
    },
  },
];

export const prayerMats = [
  {
    id: "pm-1",
    name: "Emerald Blessings",
    price: 180,
    image: emeraldPrayer,
    isNew: true,
    description:
      "Luxurious emerald-toned prayer mat with detailed border motifs for a refined, spiritual ambiance.",
  },
  {
    id: "pm-2",
    name: "Burgundy Heritage",
    price: 165,
    image: burgundyPrayer,
    description:
      "Rich burgundy mat inspired by traditional patterns, offering comfort and timeless elegance.",
  },
  {
    id: "pm-3",
    name: "Cream Serenity",
    price: 175,
    image: creamPrayer,
    isNew: true,
    description:
      "Soft cream-colored mat with subtle detailing, designed to create a calm and peaceful space.",
  },
  {
    id: "pm-4",
    name: "Serenity",
    price: 175,
    image: pm4,
    isNew: true,
    description:
      "Classic prayer mat with gentle tones and a soothing design, ideal for daily use.",
  },
];

export const shopFooter = [
  {
    name: "All Rugs",
    id: 1,
    link: "/products",
  },
  { name: " New Arrivals", id: 2, link: "/products" },
  { name: "sale", id: 3, link: "/products" },
];

export const aboutFooter = [
  { name: " Our Story", id: 1, link: "/about" },
  { name: "craftmanship", id: 2, link: "/about" },
  { name: "Contact", id: 3, link: "/contact" },
];

export const carpetSize = ["80 * 120",];

export const SpecificationHeader = [
  { value: "specs", label: "specification" },
  { value: "care guide", label: "care guide" },
  { value: "shipping info", label: "shipping info" },
];

export const inspirationPosts = [
  {
    id: 1,
    title: "Layering Rugs: The Art of Contemporary Design",
    excerpt:
      "Discover how to layer multiple rugs to create depth and visual interest in modern interiors.",
    content: `Layering rugs has become one of the most innovative techniques in contemporary interior design. By combining different textures, patterns, and colors, you can create a visually dynamic space that tells a story of your personal style.
  
  The Art of Balance
  When layering rugs, it's essential to maintain visual balance. Start with a larger, neutral base rug that anchors the room. This foundational piece should complement your existing decor without overwhelming the space. Consider colors that are present in your furniture or wall art to create a cohesive look.
  
  Playing with Patterns and Textures
  The beauty of layering lies in mixing different patterns and textures. Pair a solid neutral base with a patterned accent rug on top. The key is ensuring the colors complement each other while maintaining visual interest. A traditional Persian rug layered with a modern geometric piece creates an intriguing contrast that modern design enthusiasts love.
  
  Size Matters
  The size of your layered rugs significantly impacts the overall effect. Generally, your base rug should be large enough to anchor furniture on at least three sides. The accent rug placed on top should be smaller, typically around 25-30% of the base rug's size.
  
  Creating Focal Points
  Layering rugs naturally creates focal points in your room. Position your accent rug in areas that draw attention—under a coffee table, beneath a seating arrangement, or to define a specific zone in an open floor plan. This technique not only adds visual interest but also helps organize space functionally.
  
  Practical Considerations
  Ensure that layered rugs are secured properly. Use a rug pad under each layer to prevent shifting and protect your flooring. This maintains both safety and the aesthetic appeal of your design.`,
    category: "Design Tips",
    date: "Dec 15, 2024",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    author: "Sarah Mitchell",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Boho Elegance: Creating a Moroccan-Inspired Home",
    excerpt:
      "Explore traditional patterns and warm tones that bring global elegance to your space.",
    content: `Moroccan design has captured the hearts of interior enthusiasts worldwide with its rich colors, intricate patterns, and warm, inviting aesthetic. Creating a Moroccan-inspired home is about more than just choosing the right rug—it's about embracing a lifestyle of comfort and global appreciation.
  
  The Foundation: Colors and Warmth
  Moroccan design is characterized by warm, earthy tones mixed with jewel-toned accents. Think burnt orange, deep reds, warm terracotta, and rich blues. These colors work together to create a space that feels both luxurious and comfortable. Start by selecting a quality Moroccan rug as your color anchor, then build your room around these tones.
  
  Textiles and Layering
  Beyond rugs, Moroccan style celebrates layered textiles. Pair your rug with patterned cushions, intricate tapestries, and woven throws. These elements add depth and texture, creating a space that invites touch and comfort. The goal is to create layers of visual interest that draw the eye and create a sense of abundance.
  
  Geometric Patterns and Symbolism
  Moroccan patterns are more than decorative—they carry cultural significance. Diamond patterns symbolize protection, while chevron patterns represent strength. By incorporating these traditional patterns through your rug choice, you're bringing meaningful design elements into your space.
  
  Furniture and Accessories
  Low-profile furniture, ornate brass accents, and carved wooden pieces complement Moroccan rugs beautifully. Lanterns, poufs, and carved screens add authenticity and complete the aesthetic. The arrangement should feel relaxed and inviting, not formal or rigid.
  
  Lighting
  Moroccan design emphasizes warm, diffused lighting. Lanterns and pendant lights with intricate metalwork create beautiful shadows that enhance the richness of your rug patterns. This lighting approach adds drama and warmth to the space.
  
  Creating Your Own Moroccan Sanctuary
  The key to authentic Moroccan design is creating a space that feels welcoming and lived-in. Your Moroccan rug should serve as the centerpiece that ties all these elements together, creating a cohesive, inviting atmosphere.`,
    category: "Style Guide",
    date: "Dec 8, 2024",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    author: "Elena Rodriguez",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "The Psychology of Color in Home Design",
    excerpt:
      "Learn how different rug colors influence mood and perception in interior spaces.",
    content: `Color psychology is a powerful tool in interior design. The colors you choose for your rugs and home directly influence your mood, energy levels, and overall well-being. Understanding the psychological effects of different colors can help you create the perfect ambiance for your space.
  
  Warm Colors: Energy and Comfort Warm colors like red, orange, and yellow evoke feelings of warmth, energy, and comfort. A rug in warm tones creates an inviting, energetic space—perfect for living rooms and dining areas where family gathers. These colors are known to stimulate appetite and conversation, making them ideal for social spaces.
  
  Cool Colors: Calm and Serenity Blues, greens, and purples have a calming effect on the mind. These colors lower blood pressure and heart rate, creating a peaceful atmosphere. Cool-toned rugs work wonderfully in bedrooms, bathrooms, and meditation spaces where relaxation is the goal.
  
  Neutral Palettes: Balance and Flexibility
  Neutrals like beige, gray, and cream provide balance and flexibility. They serve as excellent foundations that allow other design elements to shine. A neutral rug creates a versatile backdrop that adapts to changing seasons and decor styles.
  
  The Impact of Saturation
  The saturation level of a color affects its psychological impact. Saturated, bold colors create more dramatic effects, while muted, desaturated colors provide subtlety and sophistication. Consider your room's purpose when choosing the saturation level of your rug.
  
  Cultural Color Associations
  Different cultures associate different meanings with colors. In Western design, white represents purity and simplicity, while in Eastern cultures, white can symbolize mourning. Understanding these associations helps you make intentional color choices.
  
  Personal Preferences Matter
  While color psychology provides guidelines, your personal preference and emotional response to colors matter most. Choose a rug color that makes you feel good when you walk into the room. After all, your home should reflect your personality and bring you joy.`,
    category: "Design Tips",
    date: "Dec 1, 2024",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    author: "Dr. James Patterson",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Sustainability in Luxury: Ethical Rug Sourcing",
    excerpt:
      "Understanding our commitment to fair trade and eco-friendly rug production methods.",
    content: `In today's world, luxury is no longer just about aesthetics—it's about responsibility. Sustainable and ethical rug sourcing is not a trend; it's a commitment to creating beautiful products while respecting people and the planet.
  
  Our Ethical Commitment
  At Luxury Carpets & Rugs, we believe that true luxury comes from knowing your purchase makes a positive impact. We work directly with artisan communities, ensuring fair wages, safe working conditions, and respect for traditional craftsmanship.
  
  Traditional Handcraftsmanship
  Many of our rugs are hand-knotted by master artisans who have inherited their skills through generations. By supporting these artisans, we help preserve cultural heritage while creating employment opportunities in developing communities. Each rug tells a story of human skill and dedication.
  
  Sustainable Materials
  We source natural, renewable materials whenever possible. Wool from sustainably managed herds, plant-based dyes, and eco-friendly production processes reduce our environmental footprint. These materials are not only better for the planet—they create superior, longer-lasting rugs.
  
  Fair Trade Practices
  Fair trade ensures that artisans receive fair compensation for their work and operate in safe, respectful conditions. We maintain transparent relationships with our producers and conduct regular audits to ensure standards are met.
  
  Environmental Impact
  The rug industry has historically been resource-intensive. We've implemented water conservation techniques, natural dye practices, and waste reduction programs. Our goal is to create luxury products that don't compromise environmental integrity.
  
  Your Role in Sustainability
  When you choose a Luxury Carpets & Rugs product, you're making a statement about the kind of world you want to live in. You're supporting artisans, preserving traditions, and protecting the environment. That's the true meaning of sustainable luxury.`,
    category: "About Us",
    date: "Nov 24, 2024",
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    author: "Michael Chen",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Timeless Classics: Investing in Heirloom Rugs",
    excerpt:
      "Why traditional hand-knotted rugs are investments that appreciate over time.",
    content: `Unlike most home furnishings that depreciate over time, high-quality hand-knotted rugs appreciate in value. A well-maintained rug can become an heirloom piece passed down through generations, increasing in worth and sentimental value.
  
  Understanding Rug Investment Value
  The value of a rug is determined by several factors: age, material quality, dye authenticity, knot density, and condition. Antique rugs in excellent condition often sell for significantly more than their original purchase price. This makes them one of the few home items that function as both beautiful decor and financial investment.
  
  Craftsmanship and Materials
  Hand-knotted rugs made from pure wool and natural dyes hold their value better than machine-made alternatives. Each knot is tied by hand, creating a durable product that withstands decades of use. The time investment in creating these pieces is reflected in their longevity and value.
  
  Authenticity Matters
  Rugs made by known artisans or from specific regions (Persian, Turkish, Afghan) often have documented provenance that increases their value. The story behind your rug—where it was made, who created it, what traditions it represents—adds to its investment appeal.
  
  Proper Care Increases Value
  Maintaining your rug properly is essential for preserving its value. Regular gentle cleaning, proper storage, and professional restoration when needed can keep your rug looking beautiful for decades. A well-maintained rug retains its colors and structural integrity, directly impacting its resale value.
  
  Passing Down Traditions
  Many families treasure rugs that have been in their homes for generations. These pieces become tied to family memories and history, taking on intangible value that money can't measure. An investment rug becomes a legacy piece that tells your family's story.
  
  Making Your Investment Choice
  When considering a rug as an investment, choose pieces from reputable sources with documented authenticity. Focus on quality materials, excellent craftsmanship, and timeless designs that won't feel dated. Your investment today becomes tomorrow's family heirloom.`,
    category: "Style Guide",
    date: "Nov 17, 2024",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    author: "Victoria Stone",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Minimalist Interiors: Less is More",
    excerpt:
      "How to choose the perfect rug for a minimalist aesthetic without compromising elegance.",
    content: `Minimalism is not about having an empty space—it's about intentionality. Every piece should serve a purpose and contribute to the overall harmony of your room. When it comes to rugs, minimalist design focuses on simplicity, quality, and functional beauty.
  
  The Minimalist Rug Philosophy
  In minimalist design, a rug is more than decoration—it's a functional piece that defines space and adds warmth. Choose a single, high-quality rug rather than multiple pieces. A minimalist rug should have clean lines, a limited color palette, and exceptional craftsmanship.
  
  Color Palettes for Minimalism
  Neutral colors dominate minimalist interiors. Think whites, grays, soft beiges, and muted taupes. These colors create a calm, cohesive backdrop that allows other quality pieces in your room to stand out. A neutral rug serves as the foundation upon which your minimalist design is built.
  
  Pattern Considerations
  While minimalism often emphasizes solidity, subtle patterns can add interest without clutter. Geometric designs with limited color variations, natural textures, or tone-on-tone patterns work beautifully in minimalist spaces. The key is restraint—let the quality of materials and craftsmanship speak for itself.
  
  Quality Over Quantity
  Invest in one exceptional rug rather than multiple mediocre pieces. Choose pure materials—wool, silk, or natural fibers—that age beautifully and improve with time. A quality minimalist rug becomes an anchor piece that elevates your entire interior.
  
  Functional Space Definition
  In minimalist design, rugs serve the practical purpose of defining spaces and adding acoustic warmth. In an open floor plan, a well-chosen rug creates distinct zones without visual clutter. It grounds furniture arrangements and ties your room together.
  
  The Beauty of Simplicity
  Minimalist design celebrates the beauty found in simplicity. Your rug doesn't need bold patterns or vibrant colors to be stunning. The right minimalist rug—with perfect proportions, quality materials, and subtle elegance—becomes a focal point through sheer refinement.`,
    category: "Design Tips",
    date: "Nov 10, 2024",
    image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    author: "David Minimalist",
    readTime: "5 min read",
  },
];

// export function getInspirationById(id: number): InspirationPost | undefined {
//   return inspirationPosts.find((post) => post.id === id);
// }

export const SidebarItem = [
  { name: "dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "orders", icon: ShoppingCart, href: "/admin/orders" },
  { name: "products", icon: Package, href: "/admin/products" },
  { name: "inquiries", icon: Mail, href: "/admin/inquiry" },
  { name: "analytics", icon: BarChart3  , href: "/admin/analytics" },
  { name: "settings", icon: Settings, href: "/admin/settings" },
];

export const category = [{ name: "Select option", id: "none" },{ id: "prayer-mat", name: "prayer-mat" }];





// ✅ Make sure accessor keys match your actual data keys exactly
export const ProductTableHeader: Column<ProductFormValues>[] = [
  
  {
    header: "Images", 
    accessor: (item)=> {

      const public_id = item?.images?.[0];
      return (

        <OptimizedImage publicId={public_id as string} alt={item.title} width={35} height={45}/>
      )
    }
    
  },
  {
    header: "Title",
    accessor: "title",
  },
  // {
  //   header: "Category",
  //   accessor: "category",
  // },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Stock",
    accessor: "stock",
  },
  // {
  //   header: "Description",
  //   accessor: "description",
  // },
  // {
  //   header: "Size",
  //   // ✅ specs.size is nested, so use function accessor
  //   accessor: (item) => item.specs?.size,
  // },
  // {
  //   header: "Material",
  //   accessor: (item) => item.specs?.material,
  // },
  // {
  //   header: "Country",
  //   accessor: (item) => item.specs?.country,
  // },
  
  {
    header: "On Sale",
    accessor: (item) => (item?.sale?.isActive ? "Yes" : "No"),
  },
];


export const priceRanges = [
  { label: "QAR 3000 - QAR 4000 ", minPrice: 3000, maxPrice: 4000 },
  { label: "QAR 4000 - QAR 5500 ", minPrice: 4000, maxPrice: 5500 },
  { label: " QAR 5500 - QAR 7000 ", minPrice: 5500, maxPrice: 7000 },
];

export const sortOptions =[
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
]

export const COUNTRIES = [
  { id: "QA", name: "Qatar" },
  { id: "AE", name: "United Arab Emirates" },
  { id: "SA", name: "Saudi Arabia" },
  { id: "KW", name: "Kuwait" },
  { id: "BH", name: "Bahrain" },
  { id: "LB", name: "Lebanon" },
];

export const combinedOptions = [
  {name: "Prayer-Mat", id: 1}
]

