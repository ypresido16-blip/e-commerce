import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, MapPin, Heart, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import hoaLogo from "../assets/hoa aunty tawa.jpg";

const WHATSAPP_NUMBER = "2348066131958";

const Profile = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-block",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello House of Althea, I would like to place an order."
  )}`;

  return (
    <div
      ref={pageRef}
      id="profile"
      className="min-h-screen bg-black px-6 pt-10 pb-28 text-white md:pb-16"
    >
      <div className="mx-auto max-w-xl">

        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full borderbg-gradient-to-br from-white/10 to-transparent p-1 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <img
              src={hoaLogo}
              alt="House of Althea Logo"
              className="h-full w-full  object-cover"
            />
          </div>

          <h1
            className="mt-4 text-2xl font-bold tracking-widest text-gold"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            HOUSE OF ALTHEA
          </h1>

          <p className="mt-1 text-[10px] tracking-[0.3em] text-gray-400">
            LUXURY READY TO WEAR
          </p>
        </div>

        {/* Quick Links */}
        <div className="profile-block mt-8 grid grid-cols-2 gap-3">
          <Link
            to="/wishlist"
            className="flex items-center justify-center gap-2 rounded-2xl border border-gray-800 py-4 text-sm tracking-widest transition-colors hover:border-gold hover:text-gold"
          >
            <Heart size={18} />
            WISHLIST
          </Link>

          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 rounded-2xl border border-gray-800 py-4 text-sm tracking-widest transition-colors hover:border-gold hover:text-gold"
          >
            <ShoppingBag size={18} />
            MY CART
          </Link>
        </div>

        {/* About Us */}
        <section id="about" className="profile-block mt-10">
          <h2
            className="text-xl tracking-widest text-gold"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            About Us
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            House of Althea is a clothing and footwear brand that celebrates
            craftsmanship. Our ready to wear pieces and handmade shoes are made
            with care, with attention to every stitch and finish.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Every piece is made to be worn often and kept for years. Tell us
            what you like and we will help you find it.
          </p>
        </section>

        {/* Contact Us */}
        <section id="contact-us" className="profile-block mt-10">
          <h2
            className="text-xl tracking-widest text-gold"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Contact Us
          </h2>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-3 rounded-2xl border border-gray-800 px-4 py-4 text-sm transition-colors hover:border-gold"
            >
              <Phone size={18} className="text-gold" />
              <span>Call us</span>
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-gray-800 px-4 py-4 text-sm">
              <MapPin size={18} className="text-gold" />
              <span>Orders are delivered after you confirm on WhatsApp</span>
            </div>
          </div>
        </section>

        {/* WhatsApp Order */}
        <div className="profile-block mt-10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-semibold tracking-widest text-black transition hover:opacity-90 active:scale-95"
          >
            <MessageCircle size={18} />
            ORDER ON WHATSAPP
          </a>
        </div>

      </div>
    </div>
  );
};

export default Profile;