import { Badge } from "@/components/ui/badge";
import { PropertyStatus } from "@/types/propertyStatus";

const statusLabel = {
  "for-sale": "For Sale",
  draft: "Draft",
  withdrawn: "Withdrawn",
  sold: "Sold",
};

const variant: {
  [key: string]: "primary" | "secondary" | "destructive" | "success";
} = {
  "for-sale": "primary",
  draft: "secondary",
  withdrawn: "destructive",
  sold: "success",
};

const PropertyStatusBadge = ({ status }: { status: PropertyStatus }) => {
  const label = statusLabel[status];

  return <Badge variant={variant[status]}>{label}</Badge>;
};

export default PropertyStatusBadge;
