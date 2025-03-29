"use client";

import { useAuth } from "@/context/auth";
import { propertyFormSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import PropertyForm from "../../_components/property-form";
import { createProperty } from "../actions";

const NewPropertyForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await createProperty(data, token);

    if (response.status !== 200) {
      toast.error("Opps", {
        description:
          response.message || "An error occurred while creating the property",
      });
      return;
    }

    toast.success("Success", {
      description: "Property created successfully",
    });
    router.push("/admin-dashboard");
  };
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon /> Create Property
          </>
        }
      />
    </div>
  );
};

export default NewPropertyForm;
