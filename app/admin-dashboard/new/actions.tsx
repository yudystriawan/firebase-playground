"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyFormSchema } from "@/validation/propertySchema";

export const createProperty = async (data: {
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: "for-sale" | "draft" | "withdrawn" | "sold";
  token: string;
}) => {
  const { token, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken.admin) {
    return {
      message: "You are not authorized to perform this action.",
      status: 403,
    };
  }

  const validation = propertyFormSchema.safeParse(propertyData);
  if (!validation.success) {
    return {
      message: validation.error.issues[0]?.message ?? "Invalid data",
      status: 400,
    };
  }

  const property = await firestore.collection("properties").add({
    ...propertyData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    propertyId: property.id,
  };
};
