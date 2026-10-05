
import { useEffect, useRef, useState } from "react"
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import gsap from "gsap"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState(null)
  const [checkedItems, setCheckedItems] = useState([])

  const sidebarRef = useRef(null)
  const overlayRef = useRef(null)
  const sidebarContentRef = useRef(null)

  const categories = [
    {
      name: "CLOTHING",
      subcategories: [
        "READY TO WEAR",
        "DRESSES",
        "TOPS",
        "TROUSERS",
        "SKIRTS"
      ]
    },
    {
      name: "FOOTWEAR",
      subcategories: [
        "HANDMADE SHOES",
        "SANDALS",
        "SLIPPERS"
      ]
    },
    {
      name: "ACCESSORIES",
      subcategories: [
        "BAGS",
        "JEWELRY",
        "HEADWEAR"
      ]
    }
  ]

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.set(sidebarRef.current, {
        x: "100%"
      })

      gsap.set(overlayRef.current, {
        opacity: 0
      })

      gsap.set(".sidebar-content", {
        opacity: 0,
        y: 30
      })

      const tl = gsap.timeline()

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.in"
      })

      tl.to(
        sidebarRef.current,
        {
          x: "0%",
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.2"
      )

      tl.to(
        ".sidebar-content",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.3"
      )
    }
  }, [isSidebarOpen])

  const closeSidebar = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSidebarOpen(false)
      }
    })

    tl.to(".sidebar-content", {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in"
    })

    tl.to(
      sidebarRef.current,
      {
        x: "100%",
        duration: 0.4,
        ease: "power3.in"
      },
      "-=0.1"
    )

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25
      },
      "-=0.2"
    )
  }

  const toggleCategory = (category) => {
    setOpenCategory(
      openCategory === category ? null : category
    )
  }

  const handleCheck = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(
        checkedItems.filter((checked) => checked !== item)
      )
    } else {
      setCheckedItems([...checkedItems, item])
    }
  }

  return (
    <div className="bg-black text-white">

      {/* HEADER */}

      <nav className="flex md:grid md:grid-cols-3 items-center justify-between px-4 md:px-8 py-3">

        {/* LOGO */}

        <div className="flex flex-col items-start md:items-center md:order-2">

          <span
            className="text-gold font-bold tracking-widest whitespace-nowrap text-[10px] sm:text-base md:text-xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            HOUSE OF ALTHEA
          </span>

          <span className="text-white tracking-widest whitespace-nowrap text-[9px] sm:text-[10px]">
            LUXURY READY TO WEAR
          </span>

        </div>


        {/* DESKTOP NAVIGATION */}

        <div className="hidden md:flex items-center gap-6 text-sm tracking-wide md:order-1">

          <a
            href="#"
            className="hover:text-amber-600 transition-colors"
          >
            Shop
          </a>

          <a
            href="#"
            className="hover:text-amber-600 transition-colors"
          >
            About Us
          </a>

          <a
            href="#"
            className="hover:text-amber-600 transition-colors"
          >
            Contact Us
          </a>

        </div>


        {/* ICONS */}

        <div className="flex items-center justify-end gap-3 md:gap-4 md:order-3">

          <button className="hover:text-amber-600 transition-colors">
            <Search size={20} />
          </button>

          <button className="hover:text-amber-600 transition-colors">
            <User size={20} />
          </button>

          <button className="hover:text-amber-600 transition-colors">
            <Heart size={20} />
          </button>

          <button className="hover:text-amber-600 transition-colors">
            <ShoppingCart size={20} />
          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden hover:text-amber-600 transition-colors"
          >
            <Menu size={22} />
          </button>

        </div>

      </nav>


      {/* MOBILE SEARCH */}

      <div className="w-full px-4 py-2 md:hidden">

        <div className="flex items-center gap-2 border border-gray-600 rounded-2xl px-3 py-2">

          <Search
            size={18}
            className="text-gray-400 shrink-0"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none text-sm bg-transparent text-white placeholder-gray-400"
          />

        </div>

      </div>


      {/* SIDEBAR */}

      {isSidebarOpen && (

        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/70"
          onClick={closeSidebar}
        >

          <div
            ref={sidebarRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 h-screen w-[58%] sm:w-[70%] bg-black text-white overflow-y-auto"
          >

            {/* SIDEBAR HEADER */}

            <div className="sidebar-content flex items-center justify-between px-6 py-6 border-b border-gray-800">

              <div>

                <h2
                  className="text-amber-600 text-xl tracking-widest font-bold"
                  style={{ 
                    fontFamily: "Cormorant Garamond, serif"
                  }}
                >
                  HOUSE OF ALTHEA
                </h2>

                <p className="text-[9px] tracking-[0.3em] text-gray-400">
                  SHOP COLLECTION
                </p>

              </div>

              <button
                onClick={closeSidebar}
                className="hover:text-amber-600 transition-colors"
              >
                <X size={26} />
              </button>

            </div>


            {/* CATEGORIES */}

            <div className="px-6 py-8">

              <p className="sidebar-content text-xs text-amber-600 tracking-[0.3em] mb-6">
                CATEGORIES
              </p>


              {categories.map((category) => (

                <div
                  key={category.name}
                  className="sidebar-content border-b border-gray-800"
                >

                  <button
                    onClick={() =>
                      toggleCategory(category.name)
                    }
                    className="w-full flex items-center justify-between py-5 text-left"
                  >

                    <span className="flex items-center gap-3">

                      <span className="tracking-widest text-sm">
                        {category.name}
                      </span>

                    </span>


                    {openCategory === category.name ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}

                  </button>


                  {/* SUBCATEGORIES */}

                  {openCategory === category.name && (

                    <div className="pb-5 pl-7 flex flex-col gap-4">

                      {category.subcategories.map((item) => (

                        <label
                          key={item}
                          className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors"
                        >

                          <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() =>
                              handleCheck(item)
                            }
                            className="accent-amber-600"
                          />

                          <span>
                            {item}
                          </span>

                        </label>

                      ))}

                    </div>

                  )}

                </div>

              ))}

            </div>


            {/* QUICK ACCESS */}

            <div className="sidebar-content px-6 pb-10">

              <p className="text-xs text-amber-600 tracking-[0.3em] mb-5">
                QUICK ACCESS
              </p>

              <div className="flex flex-col gap-5 text-sm tracking-widest">

                <a
                  href="#"
                  className="hover:text-amber-600 transition-colors"
                >
                  ABOUT US
                </a>

                <a
                  href="#"
                  className="hover:text-amber-600 transition-colors"
                >
                  CONTACT US
                </a>

                <a
                  href="#"
                  className="hover:text-amber-600 transition-colors"
                >
                  MY CART
                </a>

                <a
                  href="#"
                  className="hover:text-amber-600 transition-colors"
                >
                  WISHLIST
                </a>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Header
