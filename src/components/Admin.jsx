import React, { useState, useEffect, useRef } from "react";

const API_URL = "https://e-commerce-9jtc.onrender.com";
const CATEGORIES = ["Clothes", "Shoes", "Bags", "Others"];

const Admin = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // on-screen message (toast)
  const [message, setMessage] = useState({ text: "", type: "" });
  const timerRef = useRef(null);

  // delete confirmation box
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showMessage = (text, type = "success") => {
    clearTimeout(timerRef.current);
    setMessage({ text, type });
    timerRef.current = setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  const loadProducts = () => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => showMessage("Could not load products", "error"));
  };

  useEffect(() => {
    loadProducts();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      showMessage("Please select a product image", "error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      // Upload image to Cloudinary
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Image upload failed");
      }

      // Save product to MongoDB
      const productResponse = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          price: Number(product.price),
          category: product.category,
          image: data.imageUrl,
        }),
      });

      const savedProduct = await productResponse.json();

      if (!productResponse.ok) {
        throw new Error(savedProduct.message || "Failed to save product");
      }

      showMessage("Product added successfully");
      loadProducts();

      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
      });

      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      showMessage(error.message || "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(`${API_URL}/api/products/${deleteTarget._id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      showMessage("Product deleted successfully");
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showMessage(error.message || "Failed to delete product", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#222] flex">

      {/* MESSAGE (TOAST) */}
      {message.text && (
        <div
          role="status"
          className={`fixed top-5 right-5 z-[60] flex items-center gap-4 px-6 py-3 text-sm shadow-lg border ${
            message.type === "success"
              ? "bg-green-50 border-green-300 text-green-800"
              : "bg-red-50 border-red-300 text-red-700"
          }`}
        >
          <span>{message.text}</span>
          <button
            onClick={() => setMessage({ text: "", type: "" })}
            className="text-lg leading-none opacity-60 hover:opacity-100"
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm p-8 border border-gray-200">
            <h3 className="text-xl font-serif">Delete product?</h3>

            <p className="text-sm text-gray-500 mt-3">
              You are about to delete{" "}
              <span className="font-medium text-[#222]">
                {deleteTarget.name}
              </span>
              . This cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="border border-gray-300 px-6 py-2 text-sm hover:bg-gray-100 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-600 text-white px-6 py-2 text-sm hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-50 bg-[#111] text-white min-h-screen hidden md:flex flex-col px-6 py-8">

        <div className="mb-10">
          <h1
            className="text-2xl font-bold tracking-widest text-[#c9a45c]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            HOUSE OF ALTHEA
          </h1>
          <p className="text-[10px] tracking-[4px] text-gray-400 mt-2">
            ADMINISTRATION
          </p>
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">
          Main Menu
        </p>

        <nav className="space-y-3">

          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 bg-[#c9a45c] text-black rounded-sm"
          >
            <span>＋</span>
            Add Product
          </a>

          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-[#c9a45c] transition"
          >
            <span>⌂</span>
            View Store
          </a>

        </nav>

        <div className="mt-auto border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500">HOUSE OF ALTHEA</p>
          <p className="text-sm text-gray-400 mt-2">
            Elegance
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Luxury
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Craftmanship <span className="text-green-700"> Timelessness</span>
          </p>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">

        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-gray-200 px-6 md:px-10 py-5 flex justify-between items-center">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Administration
            </p>
            <h2 className="text-xl font-serif mt-1">
              Product Management
            </h2>
          </div>

          <a
            href="/"
            className="text-sm border border-[#c9a45c] px-5 py-2 hover:active:bg-[#47340e] hover:bg-[#c9a45c] hover:text-white transition"
          >
            Visit Store
          </a>

        </header>

        {/* DASHBOARD CONTENT */}
        <section className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* WELCOME */}
          <div className="mb-10">
            <p className="text-[#f1a71d] font-bold text-xs uppercase tracking-[4px] mb-3">
              House of Althea
            </p>

            <h1
              className="text-4xl font-extrabold md:text-4xl"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Add New Product
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              Introduce a new piece to your collection.
            </p>
          </div>

          {/* DASHBOARD CARDS */}
          <div className="flex gap-3 sm:grid-cols-2 mb-4">

            <div className="bg-white p-6 rounded-3xl border border-gray-200">
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Management
              </p>

              <h2 className="text-2xl font-serif mt-3">
                Products
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Manage your fashion collection.
              </p>
            </div>

            <div className="bg-[#171717] rounded-3xl text-white p-6">
              <p className="text-xs text-[#c9a45c] uppercase tracking-widest">
                Quick Action
              </p>

              <h2 className="text-2xl font-serif mt-3">
                New Collection
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Upload and publish your latest designs.
              </p>
            </div>

          </div>

          {/* PRODUCT FORM */}
          <div className="bg-white border border-gray-200">

            <div className="border-b border-gray-200 px-6 md:px-8 py-6">
              <h2 className="text-xl font-serif">
                Product Information
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Fill in the details below to add a product.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT SIDE */}
                <div className="space-y-6">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Classic Leather Sneakers"
                      value={product.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#c9a45c] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product Price (₦)
                    </label>

                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      placeholder="25000"
                      value={product.price}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#c9a45c] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>

                    <select
                      name="category"
                      required
                      value={product.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#c9a45c] transition bg-white"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product Description
                    </label>

                    <textarea
                      name="description"
                      rows="6"
                      placeholder="Describe the product..."
                      value={product.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#c9a45c] transition resize-none"
                    />
                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div>

                  <label className="block text-sm font-medium mb-3">
                    Product Image
                  </label>

                  <div className="border-2 border-dashed border-gray-300 min-h-[320px] flex flex-col items-center justify-center p-6 text-center hover:border-[#c9a45c] transition relative">

                    {preview ? (
                      <img
                        src={preview}
                        alt="Product preview"
                        className="w-full h-[280px] object-contain"
                      />
                    ) : (
                      <>
                        <div className="text-5xl text-[#c9a45c] mb-4">
                          ＋
                        </div>

                        <h3 className="font-serif text-lg">
                          Upload Product Image
                        </h3>

                        <p className="text-xs text-gray-400 mt-2">
                          PNG, JPG or WEBP (Maximum 5MB)
                        </p>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                  </div>

                  {image && (
                    <p className="text-xs text-gray-500 mt-3">
                      Selected: {image.name}
                    </p>
                  )}

                </div>

              </div>

              {/* BUTTONS */}
              <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-end gap-4">

                <button
                  type="button"
                  onClick={() => {
                    setProduct({
                      name: "",
                      price: "",
                      description: "",
                      category: "",
                    });
                    setImage(null);
                    setPreview(null);
                  }}
                  className="border border-gray-300 px-8 py-3 text-sm hover:bg-gray-100 transition"
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#171717] text-[#c9a45c] px-10 py-3 text-sm tracking-widest uppercase hover:bg-[#c9a45c] hover:text-black transition disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Save Product"}
                </button>

              </div>

            </form>

          </div>

          {/* ALL PRODUCTS */}
          <div className="bg-white border border-gray-200 mt-10">
            <div className="border-b border-gray-200 px-6 md:px-8 py-6">
              <h2 className="text-xl font-serif">All Products</h2>
            </div>

            {products.length === 0 ? (
              <p className="p-6 md:p-8 text-sm text-gray-400">
                No products yet.
              </p>
            ) : (
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item) => (
                  <div key={item._id} className="border border-gray-200 p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover mb-3"
                    />
                    <p className="text-[10px] text-[#c9a45c] uppercase tracking-widest mb-1">
                      {item.category || "Others"}
                    </p>
                    <h3 className="font-serif">{item.name}</h3>
                    <p className="text-sm text-gray-500">₦{item.price}</p>

                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="mt-3 border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>

      </main>

    </div>
  );
};

export default Admin;