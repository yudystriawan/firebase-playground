import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavorites } from "@/data/favorites";
import { getPropertiesByIds } from "@/data/properties";
import { EyeIcon } from "lucide-react";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import { redirect } from "next/navigation";
import RemoveFavoriteButton from "./_components/remove-favorite-button";

const MyFavoritesPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  // Extract the "page" query parameter from the searchParams
  const { page }: { page?: string } = await props.searchParams;

  // Parse the page number, defaulting to 1 if not provided
  const parsedPage = parseInt(page || "1");

  // Define the number of items per page
  const pageSize = 1;

  // Fetch the user's favorites from the data source
  const favorites = await getUserFavorites();

  // Get the IDs of all favorites
  const favoriteIds = Object.keys(favorites);

  // Calculate the total number of pages based on the page size
  const totalPages = Math.ceil(favoriteIds.length / pageSize);

  // Slice the favorite IDs to get only the items for the current page
  const paginatedFavorites = favoriteIds.slice(
    (parsedPage - 1) * pageSize,
    parsedPage * pageSize
  );

  // If the parsed page number is greater than the total pages, redirect to the last page
  if (!paginatedFavorites.length && parsedPage > 1) {
    redirect(`/account/my-favorites?page=${totalPages}`);
  }

  // Fetch the properties corresponding to the paginated favorite IDs
  const properties = await getPropertiesByIds(paginatedFavorites);

  return (
    <div className="max-w-screen-lg mx-auto ">
      <h1 className="text-4xl font-bold py-4">My Favorites</h1>
      {!paginatedFavorites.length && (
        <h2 className="text-center text-zinc-400 text-3xl font-bold py-10">
          You have no favorited property
        </h2>
      )}
      {!!paginatedFavorites.length && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFavorites.map((favoriteId) => {
              const property = properties.find(
                (property) => property.id === favoriteId
              );
              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ]
                .filter((address) => !!address)
                .join(", ");

              if (!property) return null;

              return (
                <TableRow key={favoriteId}>
                  <TableCell>{address}</TableCell>
                  <TableCell>
                    {property.status && (
                      <PropertyStatusBadge status={property?.status} />
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button variant="outline" asChild>
                      <Link href={`/properties/${property?.id}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <RemoveFavoriteButton propertyId={property.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="mx-1"
                      disabled={parsedPage === index + 1}
                      asChild={parsedPage !== index + 1}
                    >
                      <Link href={`/account/my-favorites?page=${index + 1}`}>
                        {index + 1}
                      </Link>
                    </Button>
                  );
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default MyFavoritesPage;
