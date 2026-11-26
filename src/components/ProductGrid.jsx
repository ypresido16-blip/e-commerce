import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import classicSneakers from "../assets/classicsneakers.jpg";
import backpack from "../assets/backpack.jpg";
import jacket from "../assets/jacket.jpg";
import sneakers from "../assets/sneakers.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "https://e-commerce-9jtc.onrender.com";
const WHATSAPP_NUMBER = "2348066131958";
const CATEGORIES = ["Clothes", "Bags", "Shoes", "Others"];

const productImages = {
  "sneakers.jpg": sneakers,
  "backpack.jpg": backpack,
  "jacket.jpg": jacket,
  "classicsneakers.jpg": classicSneakers,
};

const ProductGrid = ({ searchTerm }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const gridRef = useRef(null);

  const loadProducts = useCallback(() => {
    setStatus("loading");

    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Product scroll animation: runs when products load, not on every search key
  useEffect(() => {
    if (status !== "ready") return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("section > *").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [products, status]);

  const getCartQty = (product) => {
    return cart.find((item) => item._id === product._id)?.qty || 0;
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item._id === product._id);

      if (found) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (product) => addToCart(product);

  const decreaseQty = (product) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item._id !== product._id) return [item];
        if (item.qty <= 1) return [];
        return [{ ...item, qty: item.qty - 1 }];
      }),
    );
  };

  // Order product through WhatsApp
  const handleOrder = (product, quantity, totalPrice) => {
    const message = `Hello House of Althea, I want to order:

Product: ${product.name}
Quantity: ${quantity}
Unit Price: ₦${Number(product.price).toLocaleString()}
Total: ₦${totalPrice.toLocaleString()}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const term = (searchTerm || "").trim().toLowerCase();

  const sections = CATEGORIES.map((category) => ({
    category,
    items: products.filter((p) => {
      const productCategory = p.category || "Others";

      if (productCategory !== category) return false;

      return (
        (p.name || "").toLowerCase().includes(term) ||
        productCategory.toLowerCase().includes(term)
      );
    }),
  })).filter((section) => section.items.length > 0);

  if (status === "loading") {
    return (
      <div id="shop" className="px-6 py-20 text-center text-gray-500">
        <p className="text-lg">Loading products...</p>
        <p className="mt-1 text-sm">
          The store may take a few seconds to wake up.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div id="shop" className="px-6 py-20 text-center">
        <p className="text-lg">We could not load the products.</p>
        <p className="mt-1 text-sm text-gray-500">
          Check your connection and try again.
        </p>
        <button
          onClick={loadProducts}
          className="mt-5 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black active:scale-95 transition"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div id="shop" ref={gridRef}>
      {sections.length === 0 && (
        <p className="px-6 py-20 text-center text-gray-500">
          {term ? `No products found for "${searchTerm}".` : "No products yet."}
        </p>
      )}

      {sections.map(({ category, items }) => (
        <div key={category} className="px-3 md:px-8">
          <div className="flex items-center gap-4 mb-6">
            <h2
              className="text-2xl md:text-3xl font-semibold"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {category}
            </h2>
          </div>

          <section className="flex overflow-x-auto flex-nowrap gap-4 pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
            {items.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  image: productImages[product.image] || product.image,
                }}
                onAddToCart={addToCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                cartQty={getCartQty(product)}
                onOrder={handleOrder}
              />
            ))}
          </section>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;