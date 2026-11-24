import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  MapPin,
  Heart,
  ShoppingBag,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import hoaLogo from "../assets/hoa aunty tawa.jpg";

const WHATSAPP_NUMBER = "2348066131958";

const Profile = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-block",
        { y: 25, opacity: 0 },
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
    <main
      ref={pageRef}
      id="profile"
      className="min-h-screen bg-[#0b0b0b] px-6 pt-10 pb-28 text-[#e8e3d9] md:px-12 md:pb-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* Brand Header */}
        <header className="profile-block flex flex-col items-center pb-8 text-center">
          <img
            src={hoaLogo}
            alt="House of Althea Logo"
            className="mb-5 h-20 w-20 object-contain"
          />

          <h1
            className="text-3xl tracking-[0.18em] text-[#c5a46d] md:text-4xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            HOUSE OF ALTHEA
          </h1>

          <p className="mt-2 text-[9px] tracking-[0.45em] text-gray-500">
            LUXURY READY TO WEAR
          </p>
        </header>

        {/* Shopping Links */}
        <section className="profile-block flex flex-wrap justify-center gap-8 py-6">
          <Link
            to="/wishlist"
            className="flex items-center gap-2 text-xs tracking-[0.15em] text-gray-400 transition hover:text-[#c5a46d]"
          >
            <Heart size={16} />
            WISHLIST
            <ArrowUpRight size={13} />
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 text-xs tracking-[0.15em] text-gray-400 transition hover:text-[#c5a46d]"
          >
            <ShoppingBag size={16} />
            MY CART
            <ArrowUpRight size={13} />
          </Link>
        </section>

        {/* Editorial About Section */}
        <section className="profile-block mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden">
            <img
              src={hoaLogo}
              alt="House of Althea"
              className="h-[340px] w-full object-cover md:h-[520px]"
            />
          </div>

          <div className="py-4">
            <p className="text-[10px] tracking-[0.4em] text-[#c5a46d]">
              OUR STORY
            </p>

            <h2
              className="mt-5 text-4xl text-[#e8e3d9] md:text-6xl"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              More Than a Brand.
              <br />
              A Home for Handmade Stories.
            </h2>

            <p className="mt-7 text-sm leading-8 text-gray-400">
              House of Althea is a clothing and footwear brand that
              celebrates craftsmanship. Our ready-to-wear pieces and
              handmade shoes are made with care, with attention to
              every stitch and finish.
            </p>

            <p className="mt-5 text-sm leading-8 text-gray-400">
              Every piece is made to be worn often and kept for years.
              We believe fashion should express individuality while
              standing the test of time.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-3 pb-3 text-[10px] tracking-[0.2em] text-[#c5a46d] transition hover:text-white"
            >
              DISCOVER OUR COLLECTION
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Philosophy */}
        <section className="profile-block mt-24 py-14">
          <div className="mb-12 text-center">
            <p className="text-[10px] tracking-[0.4em] text-[#c5a46d]">
              WHAT WE BELIEVE
            </p>

            <h2
              className="mt-4 text-4xl text-[#e8e3d9] md:text-5xl"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              The House Philosophy
            </h2>
          </div>

          <div className="grid gap-10 text-center md:grid-cols-3">
            <div>
              <span className="text-xs text-[#c5a46d]">01</span>
              <h3
                className="mt-4 text-2xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Craftsmanship
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-xs leading-7 text-gray-500">
                Thoughtfully created pieces with attention to every detail.
              </p>
            </div>

            <div>
              <span className="text-xs text-[#c5a46d]">02</span>
              <h3
                className="mt-4 text-2xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Quality
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-xs leading-7 text-gray-500">
                Designs made to be treasured and enjoyed for years.
              </p>
            </div>

            <div>
              <span className="text-xs text-[#c5a46d]">03</span>
              <h3
                className="mt-4 text-2xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Individuality
              </h3>
              <p className="mx-auto mt-3 text-xs leading-7 text-gray-500">
                Fashion that celebrates your personal expression.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="profile-block mt-10 text-center">
          <h2
            className="mt-4 text-4xl text-[#e8e3d9] md:text-5xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Let's Start a Conversation.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-500">
            Whether you have a question about our collections or need
            help with an order, we're always happy to assist.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-[#c5a46d]"
            >
              <Phone size={17} />
              Call Us
            </a>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin size={17} className="text-[#c5a46d]" />
              Delivery confirmed through WhatsApp
            </div>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-9 flex w-fit items-center justify-center gap-3 bg-[#c5a46d] px-9 py-4 text-[10px] font-semibold tracking-[0.2em] text-black transition hover:bg-[#dfc18a]"
          >
            <MessageCircle size={17} />
            ORDER ON WHATSAPP
          </a>
        </section>

        {/* Footer Statement */}
        <footer className="profile-block mt-24 pt-8 text-center">
          <h2
            className="text-3xl tracking-wider text-[#c5a46d]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            HOUSE OF ALTHEA
          </h2>

          <p className="mt-3 text-[9px] tracking-[0.4em] text-gray-600">
            MORE THAN FASHION. A STORY IN EVERY STITCH.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default Profile;