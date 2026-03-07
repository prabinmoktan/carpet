import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("First name is required")
    .min(2, "First name is too short")
    .max(20),
  lastName: z
    .string()
    .trim()
    .nonempty("Last name is required")
    .min(2, "Last name is too short")
    .max(20),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20)
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/[0-9]/, "Password must contain a number"),
  confirmPassword: z
    .string()
    .nonempty("Password Confirmation is required")
    .min(6, "Confirm password is required"),
});

export const RegisterSchemaWithConfirm = RegisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

export type RegisterInput = z.infer<typeof RegisterSchemaWithConfirm>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const specsSchema = z.object({
  size: z.string().min(1, "Size is required"),
  material: z.string().min(1, "Material is required"),
  country: z.string().min(1, "Country is required"),
});

const saleSchema = z.object({
  startsAt: z.string().min(1, "Starting Date is required"),
  endsAt: z.string().min(1, "Sale Ending date is required"),
  percentage: z.coerce
    .number()
    .min(1, "Percentage must be at least 1%")
    .max(100, "Percentage cannot exceed 100%"),
});

const baseProduct = {
  title: z.string().min(2, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(5, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  specs: specsSchema,
  // isLatest: false,
  images: z
    .array(z.instanceof(File))
    .min(1, "At least 1 images required")
    .max(5, "Max 5 images allowed")
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: "Invalid file type (PNG/JPG/WebP only)" }
    ),
};

// export const productSchema = z.discriminatedUnion("isSale", [
//   // ❌ NOT ON SALE
//   z.object({
//     ...baseProduct,

//     sale: z.undefined(),
//   }),

//   // ✅ ON SALE
//   z.object({
//     ...baseProduct,

//     sale: saleSchema,
//   }),
// ]);
export const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(5, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  specs: specsSchema,
  // isLatest: false,
  images: z
  .array(
    z.union([z.instanceof(File), z.string()]) // ✅ each item can be File OR string
  )
  .min(1, "At least 1 image required")
  .max(5, "Max 5 images allowed")
  .refine(
    (files) =>
      files.every(
        (file) =>
          typeof file === "string" || // ✅ existing URLs pass through
          ACCEPTED_IMAGE_TYPES.includes((file as File).type)
      ),
    { message: "Invalid file type (PNG/JPG/WebP only)" }
  ),
  
  sale: z
    .object({
      startsAt: z.string().optional(),
      endsAt: z.string().optional(),
      discountPercent: z.coerce.number().min(1).max(90).optional(), // ✅ was likely z.unknown() or mistyped
      isActive: z.boolean().optional(),
    })
    .nullable()
    .optional(), // ✅ .nullable() allows null, .optional() allows undefined
    isSale: z.boolean().optional()
});

export type ProductFormValues = z.infer<typeof productSchema>;

// AdminSchemas.ts

// const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

// const specsSchema = z.object({
//   size: z.string().min(1, "Size is required"),
//   material: z.string().min(1, "Material is required"),
//   country: z.string().min(1, "Country is required"),
// });

// const saleSchema = z.object({
//   startsAt: z.string().min(1, "Starting Date is required"),
//   endsAt: z.string().min(1, "Sale Ending date is required"),
//   percentage: z.coerce
//     .number()
//     .min(1, "Percentage must be at least 1%")
//     .max(100, "Percentage cannot exceed 100%"),
// });

// // ✅ Use a simple object with refine instead of discriminatedUnion
// export const productSchema = z
//   .object({
//     title: z.string().min(2, "Title is required"),
//     category: z.string().min(1, "Category is required"),
//     description: z.string().min(5, "Description is required"),
//     price: z.coerce.number().min(1, "Price must be greater than 0"),
//     stock: z.coerce.number().min(0, "Stock cannot be negative"),
//     specs: specsSchema,
//     images: z
//       .array(z.instanceof(File))
//       .min(1, "At least 1 image required")
//       .max(5, "Max 5 images allowed")
//       .refine(
//         (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
//         { message: "Invalid file type (PNG/JPG/WebP only)" }
//       ),
//     isSale: z.boolean().default(false),
//     sale: saleSchema.optional(),
//   })
//   .refine(
//     (data) => {
//       // If isSale is true, sale must be fully filled
//       if (data.isSale) {
//         return !!(
//           data.sale?.percentage &&
//           data.sale?.startsAt &&
//           data.sale?.endsAt
//         );
//       }
//       return true;
//     },
//     {
//       message: "All sale fields are required when 'On Sale' is checked",
//       path: ["sale"],
//     }
//   );

// export type ProductFormValues = z.infer<typeof productSchema>;
