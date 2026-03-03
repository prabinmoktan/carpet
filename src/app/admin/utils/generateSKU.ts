// lib/utils/sku.ts

import crypto from "crypto";

interface SKUOptions {
  category: string;     // "prayer-mat"
  material?: string;    // "cotton"
}

const CATEGORY_CODES: Record<string, string> = {
  "prayer-mat": "PM",
  carpet: "CP",
  rug: "RG",
};

const MATERIAL_CODES: Record<string, string> = {
  cotton: "CT",
  velvet: "VT",
  wool: "WL",
};

export function generateSKU({ category, material }: SKUOptions): string {
  const cat = CATEGORY_CODES[category.toLowerCase()] || "PR";
  const mat = material
    ? MATERIAL_CODES[material.toLowerCase()] || material.slice(0, 2).toUpperCase()
    : "";

  const date = new Date();
  const dateCode = date.toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD

  const random = crypto.randomBytes(2).toString("hex").toUpperCase();

  return [cat, mat, dateCode, random]
    .filter(Boolean)
    .join("-");
}