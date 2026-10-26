import { useRef, useEffect } from "react"
import { Shirt, Sparkles } from "lucide-react"
import "@google/model-viewer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const FeatureCategory = () => {
  const sectionRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    const orbit = { angle: 0 }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. the three tiles flip in
      tl.fromTo(
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
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      )

      // 2. the shoe tile jumps up
      tl.to(
        ".shoe-tile",
        { y: -40, duration: 0.6, ease: "power2.out" },
        "+=0.1"
      )

      // 2. and the shoe spins 360 at the same time
      tl.to(
        orbit,
        {
          angle: 360,
          duration: 1.2,
          ease: "none",
          onUpdate: () => {
            if (viewerRef.current) {
              viewerRef.current.cameraOrbit = `${orbit.angle}deg 75deg 100%`
            }
          },
        },
        "<"
      )

      // 3. the tile lands with a bounce
      tl.to(
        ".shoe-tile",
        { y: 0, duration: 0.6, ease: "bounce.out" },
        "<0.6"
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
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-[20px] bg-gold flex items-center justify-center shadow-lg">
            <Shirt size={44} className="text-white" />
          </div>
          <span className="text-sm tracking-wide">Clothes</span>
        </div>

        {/* Shoes: the 3D shoe sits inside the box */}
        <div className="category-card flex flex-col items-center gap-2">
          <div className="shoe-tile w-24 h-24 md:w-28 md:h-28 rounded-[20px] bg-gold flex items-center justify-center shadow-lg overflow-hidden">
            <model-viewer
              loading="lazy"
              ref={viewerRef}
              src="/models/shoe-small.glb"
              alt="Shoe in 3D"
              camera-orbit="0deg 75deg 100%"
              environment-image="neutral"
              exposure="1.1"
              style={{
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                background: "transparent",
              }}
            ></model-viewer>
          </div>
          <span className="text-sm tracking-wide">Shoes</span>
        </div>

        {/* New Arrivals */}
        <div className="category-card flex flex-col items-center gap-2">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-[20px] bg-gold flex items-center justify-center shadow-lg">
            <Sparkles size={44} className="text-white" />
          </div>
          <span className="text-sm tracking-wide">New Arrivals</span>
        </div>
      </div>
    </div>
  )
}

export default FeatureCategory