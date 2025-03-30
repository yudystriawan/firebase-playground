import BreadCrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import { Params } from "next/dist/server/request/params";
import UpdatePropertyForm from "./_components/update-property-form";

const EditPropertyPage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  const propertyId = resolvedParams.propertyId as string;
  const property = await getPropertyById(propertyId);

  return (
    <div>
      <BreadCrumbs
        items={[
          {
            href: "/admin-dashboard",
            label: "Dashboard",
          },
          {
            label: "Edit Property",
          },
        ]}
      />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdatePropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            city={property.city}
            description={property.description}
            postcode={property.postcode}
            price={property.price}
            status={property.status}
            images={property.images || []}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPropertyPage;
