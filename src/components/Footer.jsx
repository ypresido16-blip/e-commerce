import { ArrowRight } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white ">
      
      <div className="px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-amber-600 tracking-widest"
            style={{ fontFamily: "Cormorant Garamond, serif" }}>
            HOUSE OF ALTHEA
          </h2>
          <p className="text-gray-400 text-sm tracking-widest">
            LUXURY READY-TO-WEAR
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            Handcrafted with passion. Designed for the extraordinary.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-widest text-amber-600"
            style={{ fontFamily: "Cormorant Garamond, serif" }}>
            QUICK LINKS
          </h3>
          <ul className="flex flex-col gap-3">
            {["Collection", "About Us", "Contact Us"].map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-400 text-sm tracking-widest hover:text-amber-600 transition-colors flex items-center gap-2">
               
                  {link.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-widest text-amber-600"
            style={{ fontFamily: "Cormorant Garamond, serif" }}>
            CONTACT
          </h3>
          <a
            href="https://wa.me/2348100462703"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-400 text-sm tracking-widest hover:text-green-500 transition-colors"
          >
            <span>💬</span>
            WHATSAPP US
          </a>
          <p className="text-gray-500 text-sm">
            We respond within a few hours
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className=" px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs tracking-widest">
          © 2026 HOUSE OF ALTHEA. ALL RIGHTS RESERVED.
        </p>
        <p className="text-gray-600 text-xs tracking-widest">
          LUXURY READY TO WEAR
        </p>
      </div>

    </footer>
  )
}

export default Footer