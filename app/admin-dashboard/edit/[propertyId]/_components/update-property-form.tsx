"use client";

import PropertyForm from "@/app/admin-dashboard/_components/property-form";
import { createPropertyImages } from "@/app/admin-dashboard/actions";
import { useAuth } from "@/context/auth";
import { storage } from "@/firebase/client";
import { Property } from "@/types/property";
import { propertySchema } from "@/validation/propertySchema";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
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

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      console.error("No token found");
      return;
    }

    const { images: newImages, ...rest } = data;
    const response = await updateProperty({ ...rest, id }, token);

    if (response.status !== 200) {
      toast.error("Opps", {
        description:
          response.message || "An error occurred while creating the property",
      });
      return;
    }

    const storageTask: (UploadTask | Promise<void>)[] = [];
    const imagesToDelete = images.filter(
      (image) => !newImages.find((img) => img.url === image)
    );

    imagesToDelete.forEach((image) => {
      storageTask.push(deleteObject(ref(storage, image)));
    });

    const paths: string[] = [];
    newImages.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${id}/${Date.now()}-${index}-${
          image.file.name
        }`;
        paths.push(path);

        const storageRef = ref(storage, path);
        storageTask.push(uploadBytesResumable(storageRef, image.file));
      } else {
        paths.push(image.url);
      }
    });

    await Promise.all(storageTask);
    await createPropertyImages(
      {
        propertyId: id,
        images: paths,
      },
      token
    );

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
