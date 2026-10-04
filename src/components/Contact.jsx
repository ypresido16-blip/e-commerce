import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import constactusbg from "../assets/constact-us-bg.jpg"

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const contactRef = useRef(null)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".contact-animate", {
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        toggleActions: "restart none restart reset",
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.3,
    })
  }, contactRef)

  ScrollTrigger.refresh()

  return () => ctx.revert()
}, [])


  return (
    <section
      ref={contactRef}
      style={{ backgroundImage: `url(${constactusbg})` }}
      className="relative bg-cover bg-center text-white py-20 px-6 md:px-20"
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col gap-6">
        
        <p className="contact-animate text-amber-600 font-extrabold text-sm tracking-widest"
          style={{ fontFamily: "Cormorant Garamond, serif" }}>
          GET IN TOUCH
        </p>

        <h1 className="contact-animate text-4xl md:text-6xl font-bold"
          style={{ fontFamily: "Cormorant Garamond, serif" }}>
          CONTACT US
        </h1>


        <p className="contact-animate text-gray-300 text-lg max-w-xl leading-relaxed">
          Have a question about an order, a custom piece, or just want to know more? 
          Reach out to us directly on WhatsApp  we'd love to hear from you.
        </p>

        <a
          href="https://wa.me/2348066131958"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-animate flex items-center gap-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-8 py-4 rounded-2xl tracking-widest text-sm transition-colors cursor-pointer w-fit"
        >
          <span className="text-2xl">💬</span>
          CHAT WITH US ON WHATSAPP
        </a>

        <p className="contact-animate text-gray-500 text-sm tracking-widest">
          We typically respond within a few hours
        </p>
   

      </div>
    </section>
  )
}

export default Contact