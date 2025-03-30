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

const PropertyStatusBadge = ({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) => {
  const label = statusLabel[status];

  return (
    <Badge variant={variant[status]} className={className}>
      {label}
    </Badge>
  );
};

export default PropertyStatusBadge;
