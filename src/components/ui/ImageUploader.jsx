import { useState } from "react";
import { FiPlus, FiTrash, FiCamera } from "react-icons/fi";

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
      <div className="flex flex-wrap gap-4 sm:gap-2 justify-between">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-24 sm:w-36 h-24 sm:h-36 border border-gray-300 rounded-md bg-gray-200 flex items-center justify-center"
          >
            {image ? (
              <div className="relative w-full h-full">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FiTrash />
                </button>
              </div>
            ) : index === images.findIndex((img) => img === null) ? (
              <>
                <label
                  htmlFor={`image-upload-${index}`}
                  className="flex flex-col items-center justify-center w-full h-full text-gray-500 cursor-pointer"
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
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
