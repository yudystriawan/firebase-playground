import BreadCrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./_components/new-property-form";

const NewPropertyPage = () => {
  return (
    <div>
      <BreadCrumbs
        items={[
          { href: "/admin-dashboard", label: "Dashboard" },
          { label: "New Property" },
        ]}
      />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <NewPropertyForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPropertyPage;
