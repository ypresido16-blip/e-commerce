import { Heart, Plus, Minus } from "lucide-react";

const ProductCard = ({
  product,
  onAddToCart,
  decreaseQty,
  increaseQty,
  cartQty,
  onOrder,
}) => {
  const originalPrice = Number(product.price);
  const totalPrice = originalPrice * cartQty;

  const handleOrder = () => {
    onOrder(product, cartQty, totalPrice);
  };

  return (
    <div className="product-card w-[calc(50%-8px)] shrink-0 snap-start md:w-auto group relative mb-5 overflow-hidden rounded-[26px] border border-white/20 p-1 md:p-1.5 transition-all duration-500">

      <div className="relative h-[300px] md:h-[440px] overflow-hidden rounded-[22px]">

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 rounded-full bg-white/85 p-2 text-red-500 backdrop-blur-md transition-colors hover:bg-white"
        >
          <Heart size={16} />
        </button>

        {/* Blurred bottom panel */}
        <div className="absolute inset-x-0 bottom-0 h-[58%] backdrop-blur-md [mask-image:linear-gradient(to_top,black_65%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Details */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white">

          <h3
            className="truncate text-base md:text-xl font-semibold tracking-wide drop-shadow-md"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-1 line-clamp-2 text-[11px] md:text-xs leading-snug text-white/80">
              {product.description}
            </p>
          )}

          <div className="mt-3 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">

            {/* Price */}
            <div className="leading-tight">
              <p className="text-[10px] md:text-xs text-white/70">
                {cartQty === 0 ? "Price" : "Total"}
              </p>
              <p className="text-sm md:text-lg font-semibold whitespace-nowrap">
                ₦{(cartQty === 0 ? originalPrice : totalPrice).toLocaleString()}
              </p>
            </div>

            {/* Add to Cart, then Minus and Plus */}
            {cartQty === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="w-full md:w-auto text-center whitespace-nowrap rounded-full bg-white px-4 md:px-6 py-2.5 text-xs md:text-sm font-semibold text-black transition-all duration-300 hover:bg-amber-100 active:scale-95"
              >
                Add To Cart
              </button>
            ) : (
              <div className="flex w-full md:w-auto items-center justify-between gap-3 rounded-full bg-white px-3 py-2 text-black">
                <button
                  onClick={() => decreaseQty(product)}
                  aria-label="Decrease quantity"
                  className="rounded-full p-1 transition-all hover:text-amber-600 active:scale-75"
                >
                  <Minus size={16} />
                </button>

                <span className="min-w-[16px] text-center text-sm font-semibold">
                  {cartQty}
                </span>

                <button
                  onClick={() => increaseQty(product)}
                  aria-label="Increase quantity"
                  className="rounded-full p-1 transition-all hover:text-amber-600 active:scale-75"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Order on WhatsApp */}
          {cartQty > 0 && (
            <button
              onClick={handleOrder}
              className="mt-2 w-full rounded-full border border-white/60 py-2 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-95"
            >
              Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;