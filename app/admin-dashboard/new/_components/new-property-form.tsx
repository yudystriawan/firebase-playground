"use client";

import { propertyFormSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import PropertyForm from "./property-form";

const NewPropertyForm = () => {
  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    console.log("Form submitted with data:", data);
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
