"use client";

import { useAuth } from "@/context/auth";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addFavorite, removeFavorite } from "../actions";

const ToggleFavoriteButton = (props: {
  propertyId: string;
  isFavorite: boolean;
}) => {
  const auth = useAuth();
  const router = useRouter();

  const toggleFavorite = async () => {
    const tokenResult = await auth?.currentUser?.getIdTokenResult();
    if (!tokenResult) {
      router.push("/login");
      return;
    }

    if (props.isFavorite) {
      await removeFavorite(props.propertyId, tokenResult.token);
    } else {
      await addFavorite(props.propertyId, tokenResult.token);
    }

    toast.success(
      `Property ${props.isFavorite ? "removed from" : "added to"} favorites`
    );
    router.refresh();
  };
  return (
    <button
      className="absolute top-0 right-0 z-10 p-2 bg-white rounded-bl-lg hover:cursor-pointer"
      onClick={toggleFavorite}
    >
      <HeartIcon
        fill={props.isFavorite ? "#db2777" : "white"}
        className="text-black"
      />
    </button>
  );
};

export default ToggleFavoriteButton;
