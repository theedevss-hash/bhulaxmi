import React, { useState } from "react";
import {
  getAllProducts,
  Product,
  products as initialProducts,
} from "@/data/products"; // adjust path if needed

export default function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(getAllProducts());
  const [filter, setFilter] = useState<"all" | Product["category"]>("all");

  const handleDelete = (id: string) => {
    const updated = productList.filter((p) => p.id !== id);
    setProductList(updated);
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: "New Product",
      price: 0,
      image: "https://via.placeholder.com/150",
      description: "Custom jewelry product",
      category: "gold",
    };
    setProductList([newProduct, ...productList]);
  };

  const filtered =
    filter === "all"
      ? productList
      : productList.filter((p) => p.category === filter);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="diamond">Diamond</option>
            <option value="gems">Gems</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3 capitalize">{p.category}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
