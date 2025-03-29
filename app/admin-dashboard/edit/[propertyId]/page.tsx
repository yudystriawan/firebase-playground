import BreadCrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import { Params } from "next/dist/server/request/params";

const EditPropertyPage = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  const propertyId = resolvedParams.propertyId as string;
  const property = await getPropertyById(propertyId);

  console.log("Property data:", property);

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
          {/* <EditPropertyForm /> */}
          Edit
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPropertyPage;
