import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function ProductImages({ images, setImages }) {
  return (
    <div>
      <label className="block text-sm font-medium">Images URLs</label>
      {images.map((img, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            type="text"
            value={img}
            onChange={(e) => {
              const newImgs = [...images];
              newImgs[idx] = e.target.value;
              setImages(newImgs);
            }}
            className="flex-1 border rounded-lg p-2"
          />
          <button
            type="button"
            onClick={() => setImages(images.filter((_, i) => i !== idx))}
            className="text-red-500"
          >
            <FiTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setImages([...images, ""])}
        className="mt-2 text-primary flex items-center gap-1"
      >
        <FiPlus /> Add Image
      </button>
    </div>
  );
}