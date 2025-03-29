"use server";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { propertyFormSchema } from "@/validation/propertySchema";

export const updateProperty = async (data: Property, authToken: string) => {
  const { id, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(authToken);
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

  await firestore
    .collection("properties")
    .doc(id)
    .update({
      ...propertyData,
      updatedAt: new Date(),
    });

  return {
    message: "Property updated successfully",
    status: 200,
  };
};
