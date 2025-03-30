"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyFormSchema } from "@/validation/propertySchema";
import { z } from "zod";

export const createProperty = async (
  data: {
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    status: "for-sale" | "draft" | "withdrawn" | "sold";
  },
  authToken: string
) => {
  const verifiedToken = await auth.verifyIdToken(authToken);
  if (!verifiedToken.admin) {
    return {
      message: "You are not authorized to perform this action.",
      status: 403,
    };
  }

  const validation = propertyFormSchema.safeParse(data);
  if (!validation.success) {
    return {
      message: validation.error.issues[0]?.message ?? "Invalid data",
      status: 400,
    };
  }

  const property = await firestore.collection("properties").add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    propertyId: property.id,
    message: "Property created successfully",
    status: 200,
  };
};

export const createPropertyImages = async (
  {
    propertyId,
    images,
  }: {
    propertyId: string;
    images: string[];
  },
  authToken: string
) => {
  const verifiedToken = await auth.verifyIdToken(authToken);
  if (!verifiedToken.admin) {
    return {
      message: "You are not authorized to perform this action.",
      status: 403,
    };
  }

  const schema = z.object({
    propertyId: z.string(),
    images: z.array(z.string()),
  });

  const validation = schema.safeParse({ propertyId, images });
  if (!validation.success) {
    return {
      message: validation.error.issues[0]?.message ?? "Invalid data",
      status: 400,
    };
  }

  await firestore.collection("properties").doc(propertyId).update({
    images,
  });
};
