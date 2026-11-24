import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, X } from "lucide-react";
import gsap from "gsap";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      gsap.to(searchRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(searchRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.3,
        ease: "power3.in",
        overwrite: "auto",
      });
    }
  }, [isSearchOpen]);

  return (
    <div className="relative bg-black text-white">
      <nav className="flex md:grid md:grid-cols-3 items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex flex-col items-start md:items-center md:order-2">
          <span
            className="text-gold font-bold tracking-widest whitespace-nowrap text-[10px] sm:text-base md:text-xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            HOUSE OF ALTHEA
          </span>

          <span className="text-white tracking-widest whitespace-nowrap text-[9px] sm:text-[10px]">
            LUXURY READY TO WEAR
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm tracking-wide md:order-1">
          <Link to="/shop" className="hover:text-amber-600 transition-colors">
            Shop
          </Link>

          <Link to="/profile" className="hover:text-amber-600 transition-colors">
            About Us
          </Link>

          <Link to="/profile" className="hover:text-amber-600 transition-colors">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center justify-end gap-3 md:gap-4 md:order-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-amber-600 transition-colors"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link to="/profile" className="hover:text-amber-600 transition-colors">
            <User size={20} />
          </Link>

          <Link to="/wishlist" className="hover:text-amber-600 transition-colors">
            <Heart size={20} />
          </Link>

          <Link to="/cart" className="hover:text-amber-600 transition-colors">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </nav>

      <div
        ref={searchRef}
        className="absolute left-0 right-0 top-full z-40 w-full bg-black px-4 py-3 md:hidden"
        style={{ opacity: 0, visibility: "hidden", transform: "translateY(-12px)" }}
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
    </div>
  );
};

export default Header;