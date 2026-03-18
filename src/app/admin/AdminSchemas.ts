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




// ─── Reusable field validators ────────────────────────────────────────────────

const nameField = (label: string) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must be at most 50 characters`)
    .regex(/^[a-zA-Z\s'-]+$/, `${label} contains invalid characters`);

const phoneField = z
  .string({ error: "Phone number is required" })
  .trim()
  .regex(
    /^\+?[1-9]\d{6,14}$/,
    "Enter a valid phone number (e.g. +97412345678)"
  );

const zipField = z
  .string({ error: "ZIP / Postal code is required" })
  .trim()
  .min(3, "ZIP code must be at least 3 characters")
  .max(10, "ZIP code must be at most 10 characters")
  .regex(/^[a-zA-Z0-9\s-]+$/, "ZIP code contains invalid characters");

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const contactInfoSchema = z.object({
  firstName: nameField("First name"),
  lastName: nameField("Last name"),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .email("Enter a valid email address")
    .toLowerCase(),
  phone: phoneField,
});

const shippingAddressSchema = z.object({
  addressLine1: z
    .string({ error: "Address is required" })
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),

  addressLine2: z
    .string()
    .trim()
    .max(100, "Address line 2 must be at most 100 characters")
    .optional(),

  city: z
    .string({ error: "City is required" })
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters"),

  state: z
    .string({ error: "State / Province is required" })
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be at most 50 characters"),

  zip: zipField,

  country: z
    .string({ error: "Country is required" })
    .trim()
    .min(2, "Select a valid country"),
});

const paymentMethodSchema = z.discriminatedUnion("method", [
  // ── Credit / Debit Card ──────────────────────────────────────────────────
  z.object({
    method: z.literal("card"),
    cardHolder: nameField("Cardholder name"),
    cardNumber: z
      .string({ error: "Card number is required" })
      .trim()
      .regex(/^\d{4}(\s?\d{4}){3}$/, "Enter a valid 16-digit card number"),
    expiryDate: z
      .string({ error: "Expiry date is required" })
      .regex(
        /^(0[1-9]|1[0-2])\/(\d{2})$/,
        "Enter a valid expiry date (MM/YY)"
      )
      .refine((val) => {
        const [month, year] = val.split("/").map(Number);
        const expiry = new Date(2000 + year, month - 1);
        return expiry > new Date();
      }, "Card has expired"),
    cvv: z
      .string({ error: "CVV is required" })
      .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  }),

  // ── Cash on Delivery ─────────────────────────────────────────────────────
  z.object({
    method: z.literal("cod"),
  }),

  // ── Bank Transfer ────────────────────────────────────────────────────────
  z.object({
    method: z.literal("bank_transfer"),
    bankName: z
      .string({ error: "Bank name is required" })
      .trim()
      .min(2, "Enter a valid bank name"),
    accountNumber: z
      .string({ error: "Account number is required" })
      .trim()
      .regex(/^\d{8,20}$/, "Account number must be 8–20 digits"),
  }),
]);

const orderSummarySchema = z.object({
  notes: z
    .string()
    .trim()
    .max(300, "Order notes must be at most 300 characters")
    .optional(),

  agreeToTerms: z.literal(true, {
    error: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

// ─── Root checkout schema ─────────────────────────────────────────────────────

export const checkoutSchema = z.object({
  contact: contactInfoSchema,
  shipping: shippingAddressSchema,
  payment: paymentMethodSchema,
  order: orderSummarySchema,

  // Optional: billing same as shipping toggle
  billingSameAsShipping: z.boolean(),

  // Optional: separate billing address (only required when toggle is false)
  billing: shippingAddressSchema.optional(),
});

// Enforce billing address when billingSameAsShipping is false
export const checkoutSchemaRefined = checkoutSchema.superRefine((data, ctx) => {
  if (!data.billingSameAsShipping && !data.billing) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Billing address is required when different from shipping",
      path: ["billing"],
    });
  }
});

// ─── TypeScript types (inferred from schema) ──────────────────────────────────

export type CheckoutFormValues = z.infer<typeof checkoutSchemaRefined>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type OrderSummary = z.infer<typeof orderSummarySchema>;
