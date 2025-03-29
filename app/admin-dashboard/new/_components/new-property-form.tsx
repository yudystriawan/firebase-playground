"use client";

import { useAuth } from "@/context/auth";
import { propertyFormSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { createProperty } from "../actions";
import PropertyForm from "./property-form";

const NewPropertyForm = () => {
  const auth = useAuth();
  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    console.log("Form submitted with data:", data);

    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await createProperty({
      ...data,
      token: token,
    });

    console.log("Response from createProperty:", response);
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
