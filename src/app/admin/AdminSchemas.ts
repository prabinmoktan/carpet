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




// Specs schema
const specsSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

// Sale schema
const saleSchema = z.object({
  percentage: z
    .number({ message: "Sale percentage is required" })
    .min(1, { message: "Percentage must be at least 1%" })
    .max(100, { message: "Percentage cannot exceed 100%" }),
  startsAt: z.string({ message: "Start date is required" }),
  endsAt: z.string({ message: "End date is required" }),
});

// Main product schema
export const productSchema = z
  .object({
    title: z.string().min(2, { message: "Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    description: z.string().min(5, { message: "Description is required" }),
    price: z
      .number("Price is required")
      .min(1, { message: "Price must be greater than 0" }),
    stock: z
      .number( "Stock is required" )
      .min(0, { message: "Stock cannot be negative" }),
    specs: specsSchema,
    images: z
      .array(z.instanceof(File))
      .min(1, { message: "At least one image is required" })
      .max(10, { message: "Maximum 10 images allowed" }),
    isSale: z.boolean().optional(),
    sale: z.union([saleSchema]), // conditional requirement handled in refine
  })
  .refine(
    (data) => {
      // Sale fields are required only if isSale = true
      if (data.isSale) {
        return (
          data.sale.percentage !== undefined &&
          !!data.sale.startsAt &&
          !!data.sale.endsAt
        );
      }
      return true;
    },
    {
      message: "Sale fields are required when 'On Sale' is checked",
      path: ["sale"],
    }
  );

// Infer TypeScript type directly from schema
export type ProductFormValues = z.infer<typeof productSchema>;



