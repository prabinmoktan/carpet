import { products } from "@/app/constant";
import { StaticImageData } from "next/image";
import ProductDetail from "./_components/ProductDetail";
import { fetchProduct } from "@/app/(public)/lib/fetchProduct";

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
  params: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string | StaticImageData;
    isNew: boolean;
    specs: ProductSpecs; // Use the specs interface here
    description?: string;
  };
}

// export async function generateMetadata({params}: {params: {id: string}}) {
//   const product = await fetchProduct(params?.id)
//   if(!product){
//     return {
//       title: "NO PRODUCT FOUND"
//     };
//   }
//   return {
//     title: product?.title,
//     description: product.description,
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       images: product.images,
//     },
//   }
// }

interface paramsTypes {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: paramsTypes) => {
  const { slug } = await params;

  if (!slug) {
    return <h1>No product found</h1>;
  }

  return (
    <section className="md:px-10 px-2">
      <ProductDetail slug={slug} />
    </section>
  );
};

export default Page;
