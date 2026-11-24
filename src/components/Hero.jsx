import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import newbgg from "../assets/new bgg.jpg"
import secondbg from "../assets/second-bg.jpg"
import thirdslidebg from "../assets/third-slide-bg.jpg"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"

const Hero = () => {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const sectionRef = useRef(null)

  const nextSlide = () =>{
      setCurrentSlide((prev) => (prev + 1) % 3)
  }

  const prevSlide = () => {
    setCurrentSlide((next)=>(next -1 + 3)% 3)
  }

  const handleTouchStart = (e) =>{
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) =>{
    const touchEnd = e.changedTouches[0].clientX
    const touchDiff = touchStart - touchEnd

    if(touchDiff > 50){
      nextSlide()
    }else if(touchDiff < -50){
      prevSlide()
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slide = sectionRef.current.querySelectorAll(".slide")[currentSlide]
      const texts = slide.querySelectorAll(".anim")

      gsap.fromTo(
        texts,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.4 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [currentSlide])

  return (
    <div>
      <section
        ref={sectionRef}
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className="flex h-full transition-transform duration-500 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >

          {/* SLIDE 1 */}
          <div
            style={{ backgroundImage: `url(${newbgg})` }}
            className="slide relative w-full h-full shrink-0 snap-center bg-cover bg-center flex items-end"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="relative p-6 pb-10 md:p-16 max-w-2xl">
           
              <p
                className="anim text-4xl md:text-7xl font-semibold leading-[1.05] text-white"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                All Ready to wear <br /> Collection
              </p>
              <button className="anim mt-5 inline-flex items-center gap-2   pb-1 text-sm md:text-lg tracking-wide text-white hover:text-gold transition-colors">
                Shop new arrivals <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div
            style={{ backgroundImage: `url(${secondbg})` }}
            className="slide relative w-full h-full shrink-0 snap-center bg-cover bg-center flex items-end"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="relative p-6 pb-10 md:p-16 max-w-2xl">
            
              <p
                className="anim text-4xl md:text-7xl font-semibold leading-[1.05] text-white"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Handmade Shoes <br /> and Handmade Clothes
              </p>
              <button className="anim mt-5 inline-flex items-center gap-2  pb-1 text-sm md:text-lg tracking-wide text-white hover:text-gold transition-colors">
                Shop now <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div
            style={{ backgroundImage: `url(${thirdslidebg})` }}
            className="slide relative w-full h-full shrink-0 snap-center bg-cover bg-center flex items-end"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="relative p-6 pb-10 md:p-16 max-w-2xl">
             
              <p
                className="anim text-4xl md:text-7xl font-semibold leading-[1.05] text-white"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Handmade Shoes <br /> and Handmade Clothes
              </p>
              <button className="anim mt-5 inline-flex items-center gap-2  pb-1 text-sm md:text-lg tracking-wide text-white hover:text-gold transition-colors">
                Shop now <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        <button onClick={()=>{prevSlide()}} className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 bg-white/10  hover:active:bg-amber-500 hover:bg-white rounded-full p-2 transition-colors">
          <ChevronLeft size={24} className="text-black" />
        </button>

        <button onClick={()=>{nextSlide()}} className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:active:bg-amber-500 hover:bg-white rounded-full p-2 transition-colors">
          <ChevronRight size={24} className="text-black" />
        </button>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-6 md:bottom-16 md:right-16 text-sm md:text-lg tracking-widest text-white/80">
            {String(currentSlide + 1).padStart(2, "0")} / 03
        </div>

      </section>
    </div>
  )
}

export default Hero