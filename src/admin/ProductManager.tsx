import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "gold",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Load products from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save to localStorage
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  // Handle image upload
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Add or edit product
  const handleSave = () => {
    if (!form.name || !form.price || !form.description || !form.image) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    let updated: Product[];
    if (editingId) {
      updated = products.map((p) =>
        p.id === editingId ? { ...p, ...form } : p
      );
      setEditingId(null);
    } else {
      updated = [{ id: Date.now().toString(), ...form }, ...products];
    }

    saveProducts(updated);
    setForm({ name: "", price: "", description: "", category: "gold", image: "" });
    setPreview(null);
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
    });
    setPreview(p.image);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", price: "", description: "", category: "gold", image: "" });
    setPreview(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Manage Products</h1>

      {/* Form */}
      <motion.div
        layout
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <textarea
            className="border p-2 rounded md:col-span-2"
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="diamond">Diamond</option>
            <option value="gems">Gems</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImage} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded border"
            />
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            {editingId ? "Save Changes" : "Add Product"}
          </button>
          {editingId && (
            <button
              onClick={handleCancel}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-1"
            >
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </motion.div>

      {/* Product List */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-600">${p.price}</p>
              <p className="text-sm text-gray-500 mt-1 capitalize">
                {p.category}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 flex items-center justify-center gap-1"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 flex items-center justify-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
