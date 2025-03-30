import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/data/properties";
import { ArrowLeftIcon } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Markdown from "react-markdown";

const PropertyPage = async ({ params }: { params: Promise<Params> }) => {
  const { propertyId } = await params;
  const property = await getPropertyById(propertyId!.toString());

  return (
    <div className="grid grid-cols-[1fr_400px]">
      <div>
        carousel{" "}
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <Button>
            <ArrowLeftIcon /> Back
          </Button>
          <Markdown>{property.description}</Markdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky">property details</div>
    </div>
  );
};

export default PropertyPage;
