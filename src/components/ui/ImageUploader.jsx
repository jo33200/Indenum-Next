import { useState } from "react";
import { FiPlus, FiTrash, FiCamera } from "react-icons/fi";
import Image from "next/image";

const ImageUploader = ({ maxImages = 3, onImagesChange }) => {
  const [images, setImages] = useState(Array(maxImages).fill(null));
  const [error, setError] = useState("");

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
    setError(""); // Reset error message
    if (onImagesChange) onImagesChange(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    setError(""); // Reset error message
    if (onImagesChange) onImagesChange(newImages);
  };

  const handleAddImageClick = () => {
    const nextIndex = images.findIndex((image) => image === null);
    if (nextIndex === -1) {
      setError(`Vous ne pouvez ajouter que ${maxImages} images.`);
    }
  };

  return (
    <div className="my-8">
      <div className="flex flex-wrap justify-between gap-4 sm:gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative flex h-24 w-24 items-center justify-center rounded-md border border-gray-300 bg-gray-200 sm:h-36 sm:w-36"
          >
            {image ? (
              <div className="relative h-full w-full">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  width={150}
                  height={150}
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-sm text-white"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FiTrash />
                </button>
              </div>
            ) : index === images.findIndex((img) => img === null) ? (
              <>
                <label
                  htmlFor={`image-upload-${index}`}
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-500"
                >
                  <FiPlus size={24} />
                  <span className="text-sm">Ajouter</span>
                </label>
                <input
                  id={`image-upload-${index}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files.length > 0 &&
                    handleImageChange(index, e.target.files[0])
                  }
                />
              </>
            ) : (
              <FiCamera size={24} className="text-gray-500" />
            )}
          </div>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
