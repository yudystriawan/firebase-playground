"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { MoveIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Badge } from "./ui/badge";
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
      <Button
        className="w-full"
        type="button"
        variant="outline"
        onClick={() => uploadInputRef?.current?.click()}
      >
        Upload images
      </Button>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="property-images" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="relative p-2"
                    >
                      <div className="bg-gray-100 rounded-lg flex gap-2 items-center overflow-hidden">
                        <div className="size-16 relative">
                          <Image
                            src={image.url}
                            alt="as"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium">
                            Image {index + 1}
                          </p>
                          {index === 0 && (
                            <Badge variant="success">Featured Image</Badge>
                          )}
                        </div>
                        <div className="flex items-center p-2">
                          <button className="text-red-500 p-2">
                            <XIcon />
                          </button>
                          <div className="text-gray-500">
                            <MoveIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MultiImageUploader;
