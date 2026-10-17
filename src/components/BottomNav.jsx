import { Home, Store, Heart, ShoppingBag, User } from "lucide-react"
import { useState } from "react"

const BottomNav = () => {
    const [activeTab, setActiveTab] = useState(0)
    const tabList = [
        { name: "Home", icon: Home },
        { name: "Shop", icon: Store },
        { name: "Wishlist", icon: Heart },
        { name: "Cart", icon: ShoppingBag },
        { name: "Profile", icon: User },
    ]
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white border-t border-gray-200 py-2 flex justify-around items-center">
        {tabList.map((tab, index) => (
            <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center justify-center text-gray-500 hover:text-gold transition-colors ${
                    activeTab === index ? "text-gold" : ""
                }`}
            >
                <tab.icon size={25} />
                <span className="text-xs">{tab.name}</span>
            </button>
        ))}
     
    </nav>
  )
}

export default BottomNav