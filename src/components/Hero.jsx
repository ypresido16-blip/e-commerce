import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import newbgg from "../assets/new bgg.jpg"
import secondbg from "../assets/second-bg.jpg"
import thirdslidebg from "../assets/third-slide-bg.jpg"

const Hero = () => {
  return (
    <div className="bg-gray-900">
      <section className="relative w-full h-[70vh] overflow-hidden">

     
        <div className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* SLIDE 1 */}
          <div
            style={{ backgroundImage: `url(${newbgg})` }}
            className="relative w-full h-full shrink-0 snap-center bg-cover bg-center flex items-end"
          >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative flex flex-col items-start p-4 md:p-8">
              <p
                className="font-bold text-3xl md:text-6xl mb-6 text-gold"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                All Ready to wear <br /> Collection
              </p>
              <button className="bg-gold flex text-white items-center gap-2 px-3 py-3 rounded-2xl hover:bg-amber-500 active:bg-amber-700 cursor-pointer transition-colors">
              
                Shop New Arrivals   
                   <ArrowRight size={25} />
              </button>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div
            style={{ backgroundImage: `url(${secondbg})` }}
            className="relative w-full h-full shrink-0 snap-center bg-cover bg-center flex items-end"
          >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative flex flex-col items-start p-4 md:p-8">
              <p
                className="font-bold text-3xl md:text-6xl mb-6 text-gold"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Handmade Shoes <br /> and Handmade Clothes
              </p>
              <button className="bg-gold text-white px-6 py-3 rounded-2xl hover:bg-amber-500 active:bg-amber-700 cursor-pointer transition-colors">
                Shop Now
              </button>
            </div>
          </div>


             {/* SLIDE 3 */}
          <div
            style={{ backgroundImage: `url(${thirdslidebg})` }}
            className="relative w-full h-full shrink-0 snap-center bg-cover bg-center flex items-end"
          >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative flex flex-col items-start p-4 md:p-8">
              <p
                className="font-bold text-3xl md:text-6xl mb-6 text-gold"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Handmade Shoes <br /> and Handmade Clothes
              </p>
              <button className="bg-gold text-white px-6 py-3 rounded-2xl hover:bg-amber-500 active:bg-amber-700 cursor-pointer transition-colors">
                Shop Now
              </button>
            </div>
          </div>

        </div>

       
        <button className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 bg-white/10  hover:active:bg-amber-500 hover:bg-white rounded-full p-2 transition-colors">
          <ChevronLeft size={24} className="text-black" />
        </button>

       
        <button className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:active:bg-amber-500 hover:bg-white rounded-full p-2 transition-colors">
          <ChevronRight size={24} className="text-black" />
        </button>

       
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="w-8 h-2.5 rounded-full bg-gold"></span>
          <span className="w-8 h-2.5 rounded-full bg-white/60"></span>
          <span className="w-8 h-2.5 rounded-full bg-white/60"></span>
        </div>

      </section>
    </div>
  )
}

export default Hero