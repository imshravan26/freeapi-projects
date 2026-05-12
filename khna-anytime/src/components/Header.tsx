export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1c1c1c 0%, #2d0a0d 50%, #E23744 100%)",
        minHeight: "320px",
      }}
    >
      {/* Background decorative circles */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#E23744]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2     py-1.5 mb-3">
            <span className="text-3xl flex flex-col font-black tracking-tighter text-[#ff9191] uppercase ">
              Homato{" "}
              <span className=" text-base tracking-wide font-light">
                The Anti-Zomato Experience
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Discover Recipes. <span className="text-[#E23744]">Cook Them.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-lg mb-3 leading-relaxed">
            Your kitchen has all the potential in the world. Use it.{" "}
            <span className="text-[#E23744] font-bold">Homato</span> is where
            real cooking happens.
          </p>

          {/* Snarky tagline */}
          <p className="text-[#ff8a93] text-sm font-medium italic mb-8">
            "Because paying ₹50 in delivery fees and ₹70 GST for a ₹150 meal is
            peak comedy."
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "1,200+", label: "Free Recipes" },
              { value: "₹0", label: "Delivery Fee" },
              { value: "0 min", label: "Wait Time" },
              { value: "100%", label: "Made by You" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right illustration (emoji-based) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 ">
          {["🍛", "🍝", "🥗", "🍰", "🍜"].map((emoji, i) => (
            <div
              key={i}
              className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl border border-white/10"
              style={{
                transform: `translateX(${i % 2 === 0 ? "0px" : "20px"})`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
