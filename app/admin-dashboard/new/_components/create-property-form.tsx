"use client";

import { useAuth } from "@/context/auth";
import { storage } from "@/firebase/client";
import { propertySchema } from "@/validation/propertySchema";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import PropertyForm from "../../_components/property-form";
import { createPropertyImages } from "../../actions";
import { createProperty } from "../actions";

const CreatePropertyForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      console.error("No token found");
      return;
    }

    const { images, ...rest } = data;

    const response = await createProperty(rest, token);

    if (response.status !== 200 || !response.propertyId) {
      toast.error("Opps", {
        description:
          response.message || "An error occurred while creating the property",
      });
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];
    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${
          response.propertyId
        }/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);

        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);
    await createPropertyImages(
      { propertyId: response.propertyId, images: paths },
      token
    );

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

export default CreatePropertyForm;
