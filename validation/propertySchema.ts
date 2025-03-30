import { z } from "zod";

export const propertyFormSchema = z.object({
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  city: z.string().min(3, "City is required"),
  postcode: z.string().refine((postcode) => {
    const postcodeRegex = /^[0-9]{5}$/;
    return postcodeRegex.test(postcode);
  }, "Invalid Indonesian postcode"),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z
    .string()
    .min(40, "Description must be at least 40 characters long"),
  bedrooms: z.coerce.number().min(0, "Bedrrooms must be at least 0"),
  bathrooms: z.coerce.number().min(0, "Bathrooms must be at least 0"),
  status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
});

export const propertyImageSchema = z.object({
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      file: z.instanceof(File).optional(),
    })
  ),
});

export const propertySchema = propertyFormSchema.and(propertyImageSchema);
