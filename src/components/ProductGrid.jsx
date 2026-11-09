import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import classicSneakers from "../assets/classicsneakers.jpg";
import backpack from "../assets/backpack.jpg";
import jacket from "../assets/jacket.jpg";
import sneakers from "../assets/sneakers.jpg";

const API_URL = "https://e-commerce-9jtc.onrender.com";
const CATEGORIES = ["Clothes", "Bags", "Shoes", "Others"];

const ProductGrid = () => {
  const [cart, setCart] = useState([]);
  const [Products, setProducts] = useState([]);

  const productImages = {
    "sneakers.jpg": sneakers,
    "backpack.jpg": backpack,
    "jacket.jpg": jacket,
    "classicsneakers.jpg": classicSneakers,
  };

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const getCartQty = (product) => {
    return cart.find((item) => item._id === product._id)?.qty || 0;
  };

  const addToCart = (product) => {
    const isPresent = cart.find((item) => item._id === product._id);

    if (isPresent) {
      const updatedCart = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const isPresent = cart.find((item) => item._id === product._id);

    if (isPresent) {
      if (isPresent.qty <= 1) {
        setCart(cart.filter((item) => item._id !== product._id));
      } else {
        const updatedCart = cart.map((item) => {
          if (item._id === product._id) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        });

        setCart(updatedCart);
      }
    }
  };

  const increaseQty = (product) => {
    const isPresent = cart.find((item) => item._id === product._id);

    if (isPresent) {
      const updatedCart = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      setCart(updatedCart);
    }
  };

  return (
    <>
      {CATEGORIES.map((category) => {
        const items = Products.filter(
          (p) => (p.category || "Others") === category
        );

        if (items.length === 0) return null;

        return (
          <div key={category} className="mb-14 px-4 md:px-10">
            <div className="flex items-center gap-4 mb-6">
              <h2
                className="text-2xl md:text-3xl font-semibold"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {category}
              </h2>
              <div className="flex-1 "></div>
            </div>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                />
              ))}
            </section>
          </div>
        );
      })}
    </>
  );
};

export default ProductGrid;