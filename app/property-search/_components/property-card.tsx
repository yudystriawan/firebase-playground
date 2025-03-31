import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/price-format";
import { storageUrlMapper } from "@/lib/storage-url-mapper";
import { Property } from "@/types/property";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ToggleFavoriteButton from "./toggle-favorite-button";

const PropertyCard = (props: { property: Property; isFavorite: boolean }) => {
  const property = props.property;

  const addressLine = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ]
    .filter((addressLine) => !!addressLine)
    .join(", ");

  return (
    <Card key={property.id} className="py-0 overflow-hidden">
      <CardContent className="px-0">
        <div className="h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center">
          <ToggleFavoriteButton
            propertyId={property.id}
            isFavorite={props.isFavorite}
          />
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
