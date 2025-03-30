"use server";
import { auth, firestore } from "@/firebase/server";
import { z } from "zod";

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
