import { Heart } from "lucide-react"

const ProductCard = ({ product, onAddToCart, decreaseQty, increaseQty, cartQty }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 text-center">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-[40vh] object-cover rounded-[20px] mb-3" 
        />
        <button className="absolute top-2 right-2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors">
          <Heart size={18} />
        </button>
      </div>
      
      <h3 className="font-semibold">{product.name}</h3>
      <p className="font-bold my-2">${product.price}</p>
      <p className="font-bold my-2">Quantity: {cartQty}</p>

      {
        cartQty === 0 ? (
          <button
            className="bg-gray-800 active:bg-amber-500 hover:bg-amber-200 cursor-pointer m-1 rounded-2xl text-white h-[5vh] w-[99%] rounded-[10px]"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center">
            <button onClick={() => decreaseQty(product)}>-</button>
            <span className="mx-2">{cartQty}</span>
            <button onClick={() => increaseQty(product)}>+</button>
          </div>
        )
      }
    </div>
  )
}

export default ProductCard