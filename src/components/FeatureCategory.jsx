import { useRef, useEffect } from "react"
import { Shirt, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ShoeIcon from "./ShoeIcon"

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const FeatureCategory = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-card",
        {
          rotationX: -90,
          rotationY: 25,
          z: -400,
          y: 80,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            end: "top 1%",
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)

    return () => {
      window.removeEventListener("load", refresh)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <h1
        className="font-bold text-3xl text-shadow-black text-center my-4"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        FEATURED CATEGORY
      </h1>

      <div
        className="flex justify-center gap-6 md:gap-10 px-4 py-6"
        style={{ perspective: "1000px" }}
      >
        {/* Clothes */}
        <div className="category-card flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[20px] bg-gold flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-pointer">
            <Shirt size={40} className="text-white" />
          </div>
          <span className="text-sm tracking-wide">Clothes</span>
        </div>

        {/* Shoes */}
        <div className="category-card flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[20px] bg-gold flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-pointer">
            <ShoeIcon size={40} className="text-white" />
          </div>
          <span className="text-sm tracking-wide">Shoes</span>
        </div>

        {/* New Arrivals */}
        <div className="category-card flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[20px] bg-gold flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-pointer">
            <Sparkles size={40} className="text-white" />
          </div>
          <span className="text-sm tracking-wide">New Arrivals</span>
        </div>
      </div>
    </div>
  )
}

export default FeatureCategory