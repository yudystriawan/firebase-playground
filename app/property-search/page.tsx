import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProperties } from "@/data/properties";
import { storageUrlMapper } from "@/lib/storage-url-mapper";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { formatPrice } from "../../lib/price-format";
import FiltersForm from "./_components/filters-form";

const PropertySearch = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchParams = await props.searchParams;

  const parsedPage = parseInt(searchParams?.page as string);
  const parsedMinPrice = parseInt(searchParams?.minPrice as string);
  const parsedMaxPrice = parseInt(searchParams?.maxPrice as string);
  const parsedMinBedrooms = parseInt(searchParams?.minBedrooms as string);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const properties = await getProperties({
    pagination: {
      page,
      pageSize: 3,
    },
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"],
    },
  });

  const { data, totalPages } = properties;

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold py-5">Property Search</h1>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <FiltersForm />
          </Suspense>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 mt-5 gap-5">
        {data.map((property) => {
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
              <CardContent className="px-0 ">
                <div className="h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center">
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
                    <Link href={`/properties/${property.id}`}>
                      View Property
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PropertySearch;
