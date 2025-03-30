import { useRef } from "react";
import { Button } from "./ui/button";

export type ImageUpload = {
  id: string;
  url: string;
  file?: File;
};

type Props = {
  images?: ImageUpload[];
  onImagesChange: (images: ImageUpload[]) => void;
};

const MultiImageUploader = ({ images = [], onImagesChange }: Props) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  console.log("images", images);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const newImages = files.map(
      (file, index) =>
        ({
          id: `${Date.now()}-${index}-${file.name}`,
          url: URL.createObjectURL(file),
          file,
        } as ImageUpload)
    );

    onImagesChange([...images, ...newImages]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <input
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        ref={uploadInputRef}
        onChange={handleImageUpload}
      />
      <Button type="button" onClick={() => uploadInputRef?.current?.click()}>
        Upload images
      </Button>
    </div>
  );
};

export default MultiImageUploader;
