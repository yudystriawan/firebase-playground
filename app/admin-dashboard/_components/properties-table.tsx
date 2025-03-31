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
import { getProperties } from "@/data/properties";
import { formatPrice } from "@/lib/price-format";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import PropertyStatusBadge from "../../../components/property-status-badge";

const PropertiesTable = async ({ page = 1 }: { page?: number }) => {
  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 2,
    },
  });

  if (!data || data.length === 0) {
    return (
      <h1 className="text-center text-zinc-400 py-20 font-bold text-3xl">
        No properties found.
      </h1>
    );
  }

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Listing Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => {
          const address = [
            property.address1,
            property.address2,
            property.city,
            property.postcode,
          ]
            .filter((a) => !!a)
            .join(", ");

          return (
            <TableRow key={property.id}>
              <TableCell>{address}</TableCell>
              <TableCell>{formatPrice(property.price)}</TableCell>
              <TableCell>
                <PropertyStatusBadge status={property.status} />
              </TableCell>
              <TableCell className="flex gap-1 justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/properties/${property.id}`}>
                    <EyeIcon />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin-dashboard/edit/${property.id}`}>
                    <PencilIcon />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                className="mx-1"
                disabled={page === index + 1}
                asChild={page !== index + 1}
              >
                <Link href={`/admin-dashboard?page=${index + 1}`}>
                  {index + 1}
                </Link>
              </Button>
            ))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default PropertiesTable;
