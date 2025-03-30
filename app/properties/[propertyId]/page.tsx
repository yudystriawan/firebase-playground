import PropertyStatusBadge from "@/app/admin-dashboard/_components/property-status-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import { storageUrlMapper } from "@/lib/storage-url-mapper";
import { BathIcon, BedIcon } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Markdown from "react-markdown";
import { formatPrice } from "../../../lib/price-format";
import BackButton from "./_components/back-button";

const PropertyPage = async ({ params }: { params: Promise<Params> }) => {
  const { propertyId } = await params;
  const property = await getPropertyById(propertyId!.toString());

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((line) => !!line);

  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div>
        {!!property.images && (
          <Carousel>
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[80vh] min-h-80">
                    <Image
                      src={storageUrlMapper(image)}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="translate-x-24 size-12" />
                <CarouselNext className="-translate-x-24 " />
              </>
            )}
          </Carousel>
        )}
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
          <Markdown>{property.description}</Markdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky top-0 grid place-items-center p-10">
        <div className="flex flex-col gap-10 w-full">
          <PropertyStatusBadge status={property.status} className="text-base" />
          <h1 className="text-4xl font-semibold">
            {addressLines.map((addressLine, index) => (
              <div key={index}>
                {addressLine} {index < addressLines.length - 1 && ","}
              </div>
            ))}
          </h1>
          <h2 className="text-3xl font-light">{formatPrice(property.price)}</h2>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex gap-2">
              <BathIcon /> {property.bathrooms} Bathrooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
