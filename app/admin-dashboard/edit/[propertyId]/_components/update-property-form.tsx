"use client";

import PropertyForm from "@/app/admin-dashboard/_components/property-form";
import { useAuth } from "@/context/auth";
import { Property } from "@/types/property";
import { propertyFormSchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { updateProperty } from "../actions";

type Props = Property;

const UpdatePropertyForm = ({
  id,
  address1,
  address2,
  city,
  postcode,
  price,
  description,
  bedrooms,
  bathrooms,
  status,
  images = [],
}: Props) => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      console.error("No token found");
      return;
    }
    const response = await updateProperty({ ...data, id }, token);

    if (response.status !== 200) {
      toast.error("Opps", {
        description:
          response.message || "An error occurred while creating the property",
      });
      return;
    }
    toast.success("Success", {
      description: "Property updated successfully",
    });
    router.push("/admin-dashboard");
  };
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <SaveIcon /> Save Property
          </>
        }
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          price,
          description,
          bedrooms,
          bathrooms,
          status,
          images: images.map((image) => ({
            id: image,
            url: image,
          })),
        }}
      />
    </div>
  );
};

export default UpdatePropertyForm;
