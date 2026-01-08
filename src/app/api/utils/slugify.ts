import Product from "@/app/admin/lib/models/product.model";
import slugify from "slugify";

export async function generateSlug(title: string) {
  const base = slugify(title, {
    lower: true,
    strict: true,
    replacement: "-",
  });
  let slug = base;
  let counter = 1;

  while (await Product.exists({ slug })) {
    slug = `${base}- ${counter++}`;
  }
  return slug;
}
