import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProperties } from "@/data/properties";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import { Suspense } from "react";
import FiltersForm from "./_components/filters-form";
import PropertyCard from "./_components/property-card";

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
        {data.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <div className="flex gap-2 items-center justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => {
          const newSearchParams = new URLSearchParams();

          if (minPrice) newSearchParams.set("minPrice", minPrice.toString());
          if (maxPrice) newSearchParams.set("maxPrice", maxPrice.toString());
          if (minBedrooms)
            newSearchParams.set("minBedrooms", minBedrooms.toString());
          newSearchParams.set("page", (index + 1).toString());

          return (
            <Button
              key={index}
              asChild={page !== index + 1}
              disabled={page === index + 1}
              variant="outline"
            >
              <Link
                key={index}
                href={`/property-search?${newSearchParams.toString()}`}
              >
                {index + 1}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertySearch;
