"use server";

import { auth, firestore } from "@/firebase/server";

export const addFavorite = async (propertyId: string, authToken: string) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  await firestore
    .collection("favorites")
    .doc(verifiedToken.uid)
    .set(
      {
        [propertyId]: true,
      },
      { merge: true }
    );
};
