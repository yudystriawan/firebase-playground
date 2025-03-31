"use client";

import { useAuth } from "@/context/auth";
import { HeartIcon } from "lucide-react";
import { addFavorite } from "../actions";

const ToggleFavoriteButton = (props: {
  propertyId: string;
  isFavorite: boolean;
}) => {
  const auth = useAuth();

  const toggleFavorite = async () => {
    const tokenResult = await auth?.currentUser?.getIdTokenResult();
    if (!tokenResult) return;

    await addFavorite(props.propertyId, tokenResult.token);
  };
  return (
    <button
      className="absolute top-0 right-0 z-10 p-2"
      onClick={toggleFavorite}
    >
      <HeartIcon fill={props.isFavorite ? "pink" : "white"} />
    </button>
  );
};

export default ToggleFavoriteButton;
