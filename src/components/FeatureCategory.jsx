import React from 'react'
import { Shirt,  Sparkles } from "lucide-react"
import {  } from "@tabler/icons-react"
import ShoeIcon from "./ShoeIcon"
const FeatureCategory = () => {
  return (
    <div>
      <h1 className='font-bold text-3xl text-shadow-black text-center my-4' style={{fontFamily: "Cormorant Garamond, serif"}}>
        FEATURED CATEGORY
      </h1>

       {/* Shirt Circle  */}
      <div className="flex justify-center gap-10 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[20px] bg-gold flex items-center justify-center">
            <Shirt size={40} className='text-white'/>
          </div>
          <span className="text-sm tracking-wide">Clothes</span>
        </div>


          {/* Shoe Circle  */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[20px] bg-gold flex items-center justify-center">
            < ShoeIcon size={40} className='text-white' />
          </div>
          <span className="text-sm tracking-wide">Shoes</span>
        </div>


          {/* New Arrival Circle  */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[20px] bg-gold flex items-center justify-center">
            <Sparkles size={40}  className='text-white' />
          </div>
          <span className="text-sm tracking-wide">New Arrivals</span>
        </div>
      </div>
    </div>
  )
}

export default FeatureCategory