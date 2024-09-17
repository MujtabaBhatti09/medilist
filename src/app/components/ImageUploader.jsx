import React, { useState } from 'react';
import { MdOutlineFileCopy } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const ImageUploader = ({
  dropAreaText = "Drag & Drop Multiple Images here or",
  selectButtonText = "Select",
  onImagesChange,
}) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const maxSize = 0.5 * 1024 * 1024; // 5 MB in bytes

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.some(file => file.size > maxSize)) {
      setError("Upload under 2MB size");
      toast.warning(error)
    } else {
      setError("");
      toast.success("Image Uploaded")
      const updatedImages = [...images, ...files];
      setImages(updatedImages);
      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.some(file => file.size > maxSize)) {
      setError("Upload under 2MB size");
      toast.warning(error)
    } else {
      setError("");
      toast.success("Image Uploaded")
      const updatedImages = [...images, ...files];
      setImages(updatedImages);
      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 bg-transparent">
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-center h-60"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <ToastContainer position={'top-center'} draggable draggablePercent={40} />
        <div className="text-6xl text-gray-500 mb-4"><MdOutlineFileCopy /></div>
        <p className="text-gray-500 mb-2">{dropAreaText}</p>
        <label className="text-blue-600 cursor-pointer">
          {selectButtonText}
          <input type="file" multiple className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;