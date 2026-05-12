export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#E23744] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-black">H</span>
              </div>
              <span className="text-white font-black text-lg">Homato</span>
            </div>
            <p className="text-sm leading-relaxed">
              The recipe platform that doesn't want your money. We just want you
              to cook.
            </p>
            <p className="text-[#E23744] text-xs font-semibold mt-3 italic">
              "Delivery apps fear us."
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Indian Cuisine",
                "Italian Classics",
                "Quick & Easy",
                "Healthy Meals",
                "Desserts",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Zomato */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              Why Not Zomato?
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "₹0 delivery fee",
                "Fresh, not lukewarm",
                "Your portion sizes",
                "No wrong orders",
                "Actually satisfying",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              By The Numbers
            </h4>
            <div className="space-y-3">
              {[
                { value: "₹47 Cr", label: "Saved from delivery apps" },
                { value: "1.2M", label: "Meals cooked at home" },
                { value: "4.8★", label: "Average recipe rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-white font-black text-lg">
                    {stat.value}
                  </div>
                  <div className="text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center sm:text-left">
            © 2026 Homato. Inspired by Zomato's fonts and colors — but not their
            business model.
          </p>

          <p className="text-xs text-[#E23744] text-center font-medium italic">
            "Cook more. Order less. Your wallet will thank you."
          </p>
        </div>
      </div>
    </footer>
  );
}
