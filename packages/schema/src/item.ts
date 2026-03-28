import { z } from "zod";

export const itemIdParamsSchema = z.object({
	id: z.string().trim().min(1),
});

export const itemInputSchema = z.object({
	name: z.string().trim().min(1, "name is required").max(255),
});

export const createItemSchema = itemInputSchema;
export const updateItemSchema = itemInputSchema;

export type ItemIdParams = z.infer<typeof itemIdParamsSchema>;
export type ItemInput = z.infer<typeof itemInputSchema>;
