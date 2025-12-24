import React, { useState } from "react";
import UploadProduct from "../components/UploadProduct";

export const AllProducts: React.FC = () => {
  const [isUploadProductModalOpen, setIsUploadProductModalOpen] =
    useState(false);

  return (
    <div className="flex justify-between items-center mx-10">
      <h3 className="text-center text-xl font-bold">All Product's</h3>
      <button
        className="border-2 px-3 py-1 rounded-full border-red-600 font-medium hover:bg-red-600 hover:text-white transition-all cursor-pointer"
        onClick={() => setIsUploadProductModalOpen(true)}
      >
        Upload Product
      </button>
      {isUploadProductModalOpen && (
        <UploadProduct onClose={() => setIsUploadProductModalOpen(false)} />
      )}
    </div>
  );
};
