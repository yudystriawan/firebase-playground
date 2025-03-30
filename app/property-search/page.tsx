import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersForm from "./_components/filters-form";

const PropertySearch = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold py-5">Property Search</h1>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FiltersForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySearch;
