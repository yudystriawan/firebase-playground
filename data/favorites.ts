import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import "server-only";

export const getUserFavorites = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) return {};

  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken) return {};

  try {
    const snaps = await firestore
      .collection("favorites")
      .doc(verifiedToken.uid)
      .get();

    const data = snaps.data();
    return data || {};
  } catch (error) {
    console.error("Error getUserFavorites", error);
    return {};
  }
};
