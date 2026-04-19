import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000),
  price: z.number().positive().optional(),
  categoryId: z.string().uuid(),
  condition: z.enum(['NEW', 'USED', 'REFURBISHED', 'EX_DISPLAY', 'TRADE_STOCK']),
  listingType: z.enum(['FOR_SALE', 'WANTED', 'HIRE_RENTAL', 'SERVICE_REQUEST']),
});

export const updateListingSchema = createListingSchema.partial();

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
