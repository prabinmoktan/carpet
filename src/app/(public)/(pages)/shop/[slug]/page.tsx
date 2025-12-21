/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
import { prayerMats, products } from "@/app/constant";
import { StaticImageData } from "next/image";
import ProductDetail from "./_components/ProductDetail/ProductDetail";
import ProductSpec from "./_components/ProductSpec/ProductSpec";

// Define the specs interface separately
interface ProductSpecs {
  size: string;
  material: string;
  pattern: string;
  abstract: string;
  origin: string;
  weight: number;
  thickness: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | StaticImageData | undefined;
  isNew: boolean;
  specs: ProductSpecs; // Use the specs interface here
  description?: string;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface paramsTypes {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: paramsTypes) => {
  const { slug } = await params;

  const product =
    products.find((p) => p.id === slug) ||
    prayerMats.find((p) => p.id === slug);
    
  if (!product) {
    return <h1>No product found</h1>;
  }

  // Pass specs directly - no need for tabs variable
  return (
    <section className="md:px-10 px-2">
      <ProductDetail product={product} />
     
      {/* @ts-ignore */}
      {product?.specs && <ProductSpec specs={product?.specs} />}
    </section>
  );
};

export default page;
