import { DEFAULT_LIMIT, DEFAULT_PAGE } from "src/constant/default-query";
import { z } from "zod";

export const findAllSchema = z.object({
    page: z.string().optional().default(DEFAULT_PAGE),
    limit: z.string().default(DEFAULT_LIMIT),
    search: z.string().default(""),
});

export type findAllSchemaDto = z.infer<typeof findAllSchema>;

export const createProductSchema = z.object({
  CategoryId: z.number().int().nonnegative(),
  categoryName: z.string().min(1),
  sku: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  weight: z.number().int().nonnegative(),
  width: z.number().int().nonnegative(),
  length: z.number().int().nonnegative(),
  height: z.number().int().nonnegative(),
  image: z.string().optional(),
  harga: z.number().int().nonnegative(),
});

// The inferred TypeScript type from the schema
export type createProductDto = z.infer<typeof createProductSchema>;