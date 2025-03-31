import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFavorites } from "@/data/favorites";
import { auth } from "@/firebase/server";
import { formatPrice } from "@/lib/price-format";
import { storageUrlMapper } from "@/lib/storage-url-mapper";
import { Property } from "@/types/property";
import { DecodedIdToken } from "firebase-admin/auth";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ToggleFavoriteButton from "./toggle-favorite-button";

const PropertyCard = async (props: { property: Property }) => {
  const property = props.property;

  const addressLine = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ]
    .filter((addressLine) => !!addressLine)
    .join(", ");

  const favorites = await getUserFavorites();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  let verifiedToken: DecodedIdToken | null = null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

  return (
    <Card key={property.id} className="py-0 overflow-hidden">
      <CardContent className="px-0">
        <div className="h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center">
          {(!verifiedToken || !verifiedToken.admin) && (
            <ToggleFavoriteButton
              propertyId={property.id}
              isFavorite={favorites[property.id] || false}
            />
          )}
          {!!property.images?.[0] && (
            <Image
              fill
              className="object-cover"
              src={storageUrlMapper(property.images[0])}
              alt={`Property image ${property.id}`}
            />
          )}
          {!property.images?.[0] && (
            <>
              <HomeIcon />
              <small>No Image</small>
            </>
          )}
        </div>
        <div className="flex flex-col gap-5 p-5">
          <p>{addressLine}</p>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms}
            </div>
            <div className="flex gap-2">
              <BathIcon /> {property.bathrooms}
            </div>
          </div>
          <p>{formatPrice(property.price)}</p>
          <Button asChild>
            <Link href={`/properties/${property.id}`}>View Property</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
