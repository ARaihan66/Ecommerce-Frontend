import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCloudUploadSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";

interface UploadProductProps {
  onClose: () => void;
}

interface ProductFormData {
  productName: string;
  brandName: string;
  category: string;
  productImage: File[];
  description: string;
  price: string;
  sellingPrice: string;
}

const UploadProduct: React.FC<UploadProductProps> = ({ onClose }) => {
  const [data, setData] = useState<ProductFormData>({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleOnChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    console.log(files);

    if (!files) return;

    setData((prev) => ({
      ...prev,
      productImage: Array.from(files),
    }));
  };

  const handleDeleteImage = (removeIndex: number): void => {
    setData((prev) => ({
      ...prev,
      productImage: prev.productImage.filter(
        (_, index) => index !== removeIndex
      ),
    }));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(data);

    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("brandName", data.brandName);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("sellingPrice", data.sellingPrice);
    formData.append("description", data.description);

    if (data.productImage.length > 0) {
      data.productImage.forEach((file) => {
        formData.append("productImage", file);
      });
    }

    console.log(data.productImage);

    const response = await fetch(SummaryApi.productUpload.url, {
      method: SummaryApi.productUpload.method,
      credentials: "include",
      body: formData,
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <div className="flex justify-center items-center fixed  w-full h-full bg-slate-200/50 top-0 bottom-0 left-0 right-0">
      <div className="max-w-lg w-full max-h-[80vh] bg-white shadow rounded flex flex-col">
        {/* Header */}
        <div className=" flex justify-between mx-5 mt-5">
          <h3 className="text-lg font-bold">Upload Product</h3>
          <button onClick={onClose}>
            <IoMdClose className="text-xl hover:text-red-400 cursor-pointer" />
          </button>
        </div>
        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 mt-5 grid gap-2 overflow-y-auto pb-10"
        >
          <label htmlFor="productName" className="font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            name="productName"
            onChange={handleOnChange}
            className="outline-none bg-slate-100 pl-1 py-2  rounded"
          />
          <label htmlFor="brandName" className="font-medium">
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="outline-none bg-slate-100 pl-1 py-2  rounded"
          />
          <label htmlFor="category" className="font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className=" outline-none bg-slate-100 pl-1 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <label className="font-medium">Upload Image</label>
          <label htmlFor="uploadImage">
            <div className="border-2 border-gray-300 border-dashed p-10 flex justify-center items-center flex-col cursor-pointer rounded-md">
              <p className="text-2xl text-gray-400">
                <IoCloudUploadSharp />
              </p>
              <p className="text-gray-600">
                Choose a file or drag & drop it here
              </p>
              <input
                id="uploadImage"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </label>
          <div className="mt-2">
            {data.productImage.length > 0 &&
              data.productImage.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="my-1 bg-gray-100 px-2 flex justify-between items-center"
                  >
                    <p>{item.name}</p>
                    <p>
                      <MdDelete
                        className="opacity-50 cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      />
                    </p>
                  </div>
                );
              })}
          </div>

          <label htmlFor="price" className="font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className=" no-spinner outline-none bg-slate-100 pl-1 py-2  rounded"
          />
          <label htmlFor="sellingPrice" className="font-medium">
            Selling Price
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="no-spinner outline-none bg-slate-100 pl-1 py-2  rounded"
          />

          <label htmlFor="description" className="font-medium">
            Product Description
          </label>
          <textarea
            id="description"
            placeholder="Describe about your product....."
            value={data.description}
            name="description"
            rows={10}
            onChange={handleOnChange}
            className="outline-none bg-slate-100 pl-1 py-2 rounded h-70"
          />
          <button
            type="submit"
            className="p-2 mt-5 w-32 mx-auto rounded-full bg-amber-600 hover:scale-110 hover:transition-all cursor-pointer font-semibold"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
