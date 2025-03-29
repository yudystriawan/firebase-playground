import { firestore, getTotalPages } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import "server-only";

type GetPropertiesOptions = {
  filters?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    minBedrooms?: number | null;
    status?: PropertyStatus[] | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};
export const getProperties = async (options?: GetPropertiesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, minBedrooms, status } = options?.filters || {};

  let query = firestore.collection("properties").orderBy("createdAt", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    query = query.where("price", ">=", minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    query = query.where("price", "<=", maxPrice);
  }

  if (minBedrooms !== null && minBedrooms !== undefined) {
    query = query.where("bedrooms", ">=", minBedrooms);
  }

  if (status && status.length > 0) {
    query = query.where("status", "in", status);
  }

  const totalPages = await getTotalPages(query, pageSize);

  const snapshot = await query
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const properties = snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Property)
  );

  return { data: properties, totalPages };
};
