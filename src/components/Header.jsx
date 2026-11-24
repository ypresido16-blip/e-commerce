import { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import gsap from "gsap";

const WHATSAPP_NUMBER = "234XXXXXXXXXX";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const sidebarContentRef = useRef(null);

  const categories = [
    { name: "CLOTHES", id: "clothes" },
    { name: "BAGS", id: "bags" },
    { name: "SHOES", id: "shoes" },
    { name: "OTHERS", id: "others" },
  ];

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.set(sidebarRef.current, {
        x: "100%",
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      gsap.set(".sidebar-content", {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.in",
      });

      tl.to(
        sidebarRef.current,
        {
          x: "0%",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      );

      tl.to(
        ".sidebar-content",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3",
      );
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      gsap.to(searchRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(searchRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isSearchOpen]);

  const closeSidebar = (afterClose) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSidebarOpen(false);
        if (typeof afterClose === "function") afterClose();
      },
    });

    tl.to(".sidebar-content", {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    });

    tl.to(
      sidebarRef.current,
      {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      },
      "-=0.1",
    );

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25,
      },
      "-=0.2",
    );
  };

  const goToCategory = (category) => {
    setActiveCategory(category.name);

    closeSidebar(() => {
      let target = document.getElementById(category.id);

      if (!target) {
        target = [...document.querySelectorAll("h1, h2, h3")].find(
          (heading) => heading.textContent.trim().toLowerCase() === category.id,
        );
      }

      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello House of Althea, I would like to place an order.",
  )}`;

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
          <a href="#shop" className="hover:text-gold transition-colors">
            Shop
          </a>

          <a href="#about" className="hover:text-gold transition-colors">
            About Us
          </a>

          <a
            href="#contact us"
            className="hover:text-gold transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* ICONS */}

        <div className="flex items-center justify-end gap-3 md:gap-4 md:order-3">
        <button
  onClick={() => setIsSearchOpen(!isSearchOpen)}
  className="hover:text-gold transition-colors"
>
  {isSearchOpen ? <X size={20} /> : <Search size={20} />}
</button>
          

          <button className="hover:text-gold transition-colors">
            <User size={20} />
          </button>

          <button className="hover:text-gold transition-colors">
            <Heart size={20} />
          </button>

          <button className="hover:text-gold transition-colors">
            <ShoppingCart size={20} />
          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden hover:text-gold transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>



      {/* MOBILE SEARCH */}

      <div
        ref={searchRef}
        className="w-full px-4 py-2 md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex items-center gap-2 border border-gray-600 rounded-2xl px-3 py-2">
          <Search size={18} className="text-gray-400 shrink-0" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          onClick={() => closeSidebar()}
        >
          <div
            ref={sidebarRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 h-screen w-[85%] max-w-md flex flex-col bg-black text-white overflow-y-auto"
          >
            {/* SIDEBAR HEADER */}

            <div className="sidebar-content flex items-center justify-between px-6 py-6 border-b border-gray-800">
              <div>
                <h2
                  className="text-gold text-xl tracking-widest font-bold"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  HOUSE OF ALTHEA
                </h2>

                <p className="text-[9px] tracking-[0.3em] text-gray-400">
                  SHOP COLLECTION
                </p>
              </div>

              <button
                onClick={() => closeSidebar()}
                className="hover:text-gold transition-colors"
              >
                <X size={26} />
              </button>
            </div>

            {/* CATEGORIES */}

            <div className="px-6 py-8">
              <p className="sidebar-content text-xs text-gold tracking-[0.3em] mb-6">
                CATEGORIES
              </p>

              {categories.map((category) => (
                <div
                  key={category.name}
                  className="sidebar-content border-b border-gray-800"
                >
                  <button
                    onClick={() => goToCategory(category)}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span
                      className={`tracking-widest text-sm transition-colors ${
                        activeCategory === category.name ? "text-gold" : ""
                      }`}
                    >
                      {category.name}
                    </span>

                    <ChevronRight
                      size={18}
                      className={
                        activeCategory === category.name ? "text-gold" : ""
                      }
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* QUICK ACCESS */}

            <div className="sidebar-content px-6 pb-10">
              <p className="text-xs text-gold tracking-[0.3em] mb-5">
                QUICK ACCESS
              </p>

              <div className="flex flex-col gap-5 text-sm tracking-widest">
                <a href="#" className="hover:text-gold transition-colors">
                  ABOUT US
                </a>

                <a href="#" className="hover:text-gold transition-colors">
                  CONTACT US
                </a>

                <a href="#" className="hover:text-gold transition-colors">
                  MY CART
                </a>

                <a href="#" className="hover:text-gold transition-colors">
                  WISHLIST
                </a>
              </div>
            </div>

            {/* WHATSAPP ORDER */}

            <div className="sidebar-content mt-auto px-6 pb-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold tracking-widest text-black hover:opacity-90 active:scale-95 transition"
              >
                <MessageCircle size={18} />
                ORDER ON WHATSAPP
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;