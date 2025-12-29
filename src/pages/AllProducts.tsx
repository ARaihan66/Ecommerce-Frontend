import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";

interface IProductImage {
  _id: string;
  fileName: string;
  path: string;
}
interface IProduct {
  _id: string;
  productName: string;
  brandName: string;
  category: string;
  description: string;
  productImage: IProductImage[];
  price: number;
  sellingPrice: number;
}

interface IGetAllProductsResponse {
  success: boolean;
  message: string;
  products: IProduct[];
}

export const AllProducts: React.FC = () => {
  const [isUploadProductModalOpen, setIsUploadProductModalOpen] =
    useState<boolean>(false);
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);

  const fetchAllProduct = async (): Promise<void> => {
    const response = await fetch(SummaryApi.getAllProduct.url);

    const result: IGetAllProductsResponse = await response.json();
    if (result.success) {
      setAllProduct(result.products);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  console.log(allProduct);

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
