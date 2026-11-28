import { z } from "zod";

export const uuidSchema = z.string().uuid("ID tidak valid");
export const positiveDecimal = z
  .number()
  .nonnegative("Kuantitas tidak boleh negatif");
export const emailSchema = z.string().email("Email tidak valid");

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(50),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
