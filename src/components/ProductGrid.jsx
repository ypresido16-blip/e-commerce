import ProductCard from "./ProductCard"
import classicSneakers from '../assets/classicsneakers.jpg'
import backpack from '../assets/backpack.jpg'
import jacket from '../assets/jacket.jpg'
import sneakers from '../assets/sneakers.jpg'
import { useState } from "react"


const products = [
  { id: 1, name: " Sneakers", price: 59, image: sneakers, qty:1 },
  { id: 2, name: "Leather Backpack", price: 89, image: backpack, qty:1 },
  { id: 3, name: "Denim Jacket", price: 75, image: jacket, qty:1 },
  { id: 4, name: "Classic Sneakers", price: 120, image:classicSneakers, qty:1 }, 
]

const ProductGrid = () => {
  const [cart, setCart] = useState([])


   const getCartQty = (product) => {
    return cart.find((item) => item.id === product.id)?.qty || 0
  }
  const addToCart = (product) => {
  const isPresent = cart.find((item) => item.id === product.id)
  if (isPresent) {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return {...item, qty: item.qty + 1}
      }
      return item
    })
    setCart(updatedCart)
  } else {
    setCart([...cart, {...product, qty: 1}])
  }
}
  const decreaseQty = (product) => {
  const isPresent = cart.find((item) => item.id === product.id)
  if (isPresent) {
    if (isPresent.qty <= 1) {
    
      setCart(cart.filter((item) => item.id !== product.id))
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {...item, qty: item.qty - 1}
        }
        return item
      })
      setCart(updatedCart)
    }
  }
}
 const increaseQty = (product) => {
  const isPresent = cart.find((item) => item.id === product.id)
  if (isPresent) {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return {...item, qty: item.qty + 1}
      }
      return item
    })
    setCart(updatedCart)
  }
}




  return (
   <>
  <div className="flex justify-between items-center px-10 pt-6">
    <h2 className="text-xl font-semibold">Clothes</h2>
    <a href="#" className="text-sm text-amber-600 hover:underline">View All</a>
  </div>

  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-10">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={addToCart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        cartQty={getCartQty(product)}
      />
    ))}
  </section>

 
</>
    
  )
}
  
export default ProductGrid