import contactbg from "../assets/constact-us-bg.jpg"

const About = () => {
  return (
    <section className="bg-pink-100 text-black py-20 px-6 md:px-20">

      {/* Top label */}
      <p className="text-amber-600 text-xs tracking-widest mb-2">
        WHY HOUSE OF ALTHEA?
      </p>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-12 items-center">

        {/* Left — Text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}>
            More than a brand... <br />
            A home for <span className="text-amber-600 italic">Handmade Stories.</span>
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed max-w-md">
            We connect you with pieces crafted by hand, with intention, quality, 
            and soul. Every garment tells a story of the hands that made it, 
            the fabric that shapes it, and the person who wears it.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              "100% Handmade",
              "Luxury Quality",
              "Support Local Artisans",
              "Ready To Wear"
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
             <span className="text-amber-600">│</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image */}
        <div className="w-full md:w-1/2 h-[500px] overflow-hidden">
          <img
            src={contactbg}
            alt="House of Althea"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}

export default About