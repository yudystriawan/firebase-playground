import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProperties } from "@/data/properties";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";
import FiltersForm from "./_components/filters-form";

const PropertySearch = async (props: { searchParams: SearchParams }) => {
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
      pageSize: 2,
    },
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"],
    },
  });

  console.log("Properties:", { properties });

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
    </div>
  );
};

export default PropertySearch;
