import { Heart, Plus, Minus } from "lucide-react";

const ProductCard = ({ product, onAddToCart, decreaseQty, increaseQty, cartQty }) => {
  return (
    <div className="w-[48%] shrink-0 snap-start md:w-auto group relative mb-5 overflow-hidden rounded-[26px] border border-white/20 p-1 md:p-3 transition-all duration-500">

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-[20px] h-[190px] md:h-[380px]">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 rounded-full border border-white/30 bg-white/20 p-2.5 text-white backdrop-blur-xl hover:text-amber-400 transition-colors">
          <Heart size={18} />
        </button>

        {/* Product Details */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">

          <h3
            className="text-base md:text-xl font-semibold truncate"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {product.name}
          </h3>

          {/* Price and Cart Button */}
          <div className="mt-2 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">

            <p className="font-semibold text-white text-sm md:text-base whitespace-nowrap">
              ₦{Number(product.price).toLocaleString()}
            </p>

            {cartQty === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="w-full md:w-auto text-center rounded-full bg-white px-3 md:px-5 py-2 text-black text-xs md:text-sm font-medium hover:bg-amber-300 transition-all duration-300 active:scale-95 whitespace-nowrap"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex w-full items-center justify-between md:w-auto md:justify-start gap-3 rounded-full bg-white px-3 py-2 text-black">

                <button
                  onClick={() => decreaseQty(product)}
                  className="hover:text-amber-500"
                >
                  <Minus size={16} />
                </button>

                <span className="text-sm font-semibold">
                  {cartQty}
                </span>

                <button
                  onClick={() => increaseQty(product)}
                  className="hover:text-amber-500"
                >
                  <Plus size={16} />
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;