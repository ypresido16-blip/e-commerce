import React, { useState } from "react";

const API_URL = "https://e-commerce-9jtc.onrender.com";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      alert("Please select a product image");
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
          image: data.imageUrl,
        }),
      });

      const savedProduct = await productResponse.json();

      if (!productResponse.ok) {
        throw new Error(savedProduct.message || "Failed to save product");
      }

      alert("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        description: "",
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#222] flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111] text-white min-h-screen hidden md:flex flex-col px-6 py-8">

        <div className="mb-16">
          <h1 className="text-2xl font-serif tracking-widest text-[#c9a45c]">
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
            Luxury • Elegance • Craft
          </p>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">

        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-gray-200 px-6 md:px-10 py-5 flex justify-between items-center">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Administration / Products
            </p>
            <h2 className="text-xl font-serif mt-1">
              Product Management
            </h2>
          </div>

          <a
            href="/"
            className="text-sm border border-[#c9a45c] px-5 py-2 hover:bg-[#c9a45c] hover:text-white transition"
          >
            Visit Store
          </a>

        </header>

        {/* DASHBOARD CONTENT */}
        <section className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* WELCOME */}
          <div className="mb-10">
            <p className="text-[#b18b43] text-xs uppercase tracking-[4px] mb-3">
              House of Althea
            </p>

            <h1 className="text-3xl md:text-4xl font-serif">
              Add New Product
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              Introduce a new piece to your collection.
            </p>
          </div>

          {/* DASHBOARD CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

            <div className="bg-white p-6 border border-gray-200">
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

            <div className="bg-[#171717] text-white p-6">
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

        </section>

      </main>

    </div>
  );
};

export default AddProduct;