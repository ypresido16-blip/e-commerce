import { Heart, Plus, Minus } from "lucide-react";

const ProductCard = ({ product, onAddToCart, decreaseQty, increaseQty, cartQty }) => {
  return (
    <div className="group relative mb-5 isolate overflow-hidden rounded-[26px] border border-white/25 bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] p-3 backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(255,255,255,0.08),0_10px_35px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-white/40">

      {/* Glass Reflection */}
      <div className="absolute inset-0 -z-10 pointer-events-none rounded-[26px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.22),transparent_55%)]" />

      {/* Bottom Glass Reflection */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 -z-10 pointer-events-none bg-gradient-to-t from-white/[0.07] to-transparent" />

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-[20px]  border border-white/15">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[190px] md:h-[300px] object-cover transition-transform duration-700  group-hover:scale-105"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 rounded-full border border-white/30 bg-white/15 p-2.5 text-white backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] hover:text-amber-400 transition-colors">
          <Heart size={18} />
        </button>
      </div>

      {/* Product Details */}
      <div className="relative pt-4 text-left">

        <h3
          className="text-black text-lg md:text-xl font-semibold truncate"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {product.name}
        </h3>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between gap-2 mt-3">

          <p className="font-semibold text-amber-300 text-sm md:text-base whitespace-nowrap">
            ₦{Number(product.price).toLocaleString()}
          </p>

          {cartQty === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="rounded-full  bg-yellow-300 px-3 md:px-4 py-2 text-black text-xs md:text-sm backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] hover:bg-amber-400 transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full px-3 py-2 backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)]">

              <button
                onClick={() => decreaseQty(product)}
                className="text-black"
              >
                <Minus size={16} />
              </button>

              <span className="text-gold text-sm font-semibold">
                {cartQty}
              </span>

              <button
                onClick={() => increaseQty(product)}
                className="text-black hover:text-amber-400"
              >
                <Plus size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;