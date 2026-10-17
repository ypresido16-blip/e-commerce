import { Home, Store, Heart, ShoppingBag, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState(0)
  const pillRef = useRef(null)

  const tabList = [
    { name: "Home", icon: Home },
    { name: "Shop", icon: Store },
    { name: "Wishlist", icon: Heart },
    { name: "Cart", icon: ShoppingBag },
    { name: "Profile", icon: User },
  ]

  useEffect(() => {
    gsap.to(pillRef.current, {
      xPercent: activeTab * 100,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [activeTab])

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white border-t border-gray-200 py-2 flex items-center">

      {/* sliding pill */}
      <div
        ref={pillRef}
        className="absolute left-0 top-0 h-full w-1/5 flex items-center justify-center pointer-events-none"
      >
        <span className="w-[4.5rem] h-14 rounded-2xl bg-gold/20"></span>
      </div>

      {tabList.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`relative z-10 flex-1 flex flex-col items-center justify-center py-1 transition-colors duration-300 ${
            activeTab === index ? "text-gold" : "text-gray-500"
          }`}
        >
          <tab.icon
            size={24}
            
          />
          <span className="text-xs mt-0.5">{tab.name}</span>
        </button>
      ))}

    </nav>
  )
}

export default BottomNav