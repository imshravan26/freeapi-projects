import { useEffect } from "react";
import { type Recipe } from "../types";

interface RecipeModalProps {
  recipe: Recipe;
  loading: boolean;
  onClose: () => void;
}

export default function RecipeModal({
  recipe,
  loading,
  onClose,
}: RecipeModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="modal-card bg-[#1c1c1c] w-full sm:max-w-2xl sm:rounded-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-[#2a2a2a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div className="relative h-52 sm:h-64 shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-4 right-12">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-[#ff8a93] uppercase tracking-wider">
                {recipe.category}
              </span>
              {recipe.area && (
                <>
                  <span className="text-gray-400">·</span>
                  <span className="text-xs text-gray-300">
                    🌍 {recipe.area}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">
              {recipe.name}
            </h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 scrollbar-modal">
          {/* Stats bar */}
          <div className="flex items-center justify-around py-4 border-b border-[#2a2a2a] px-4 bg-[#161616]">
            {[
              {
                icon: "🧅",
                label: "Ingredients",
                value: `${recipe.ingredients.length}`,
              },
              { icon: "📋", label: "Steps", value: `${recipe.steps.length}` },
              {
                icon: "🏷️",
                label: "Tags",
                value: recipe.tags.length ? recipe.tags.length.toString() : "—",
              },
              { icon: "🌍", label: "Cuisine", value: recipe.area || "—" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg">{stat.icon}</div>
                <div className="text-sm font-bold text-gray-100">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 sm:p-6">
            {/* Loading shimmer overlay — upgrades in background */}
            {loading && (
              <div className="flex items-center gap-2 mb-5 text-xs text-gray-500">
                <span className="inline-block w-3 h-3 rounded-full bg-[#E23744] animate-ping" />
                Loading full recipe details…
              </div>
            )}

            {/* Description */}
            {recipe.description && (
              <p className="text-gray-400 text-sm leading-relaxed mb-5 italic border-l-4 border-[#E23744] pl-4 bg-[#E23744]/10 py-3 rounded-r-lg">
                "{recipe.description}"
              </p>
            )}

            {/* Tags */}
            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#2a2a2a] text-gray-400 px-3 py-1 rounded-full font-medium border border-[#333]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Two-column: ingredients + steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div>
                <h3 className="text-base font-black text-gray-100 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#E23744] text-white rounded-lg flex items-center justify-center text-sm">
                    🧅
                  </span>
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm py-2 border-b border-[#252525] last:border-0"
                    >
                      <span className="font-bold text-[#E23744] shrink-0 min-w-[70px] text-xs pt-0.5">
                        {ing.amount || "—"}
                      </span>
                      <span className="text-gray-300">{ing.item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-base font-black text-gray-100 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#E23744] text-white rounded-lg flex items-center justify-center text-sm">
                    👨‍🍳
                  </span>
                  Instructions
                </h3>
                <ol className="space-y-3">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#E23744] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-gray-400 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* External links */}
            {(recipe.youtubeUrl || recipe.sourceUrl) && (
              <div className="mt-6 flex gap-3 flex-wrap">
                {recipe.youtubeUrl && (
                  <a
                    href={recipe.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-800/50 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-900/50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
                    </svg>
                    Watch on YouTube
                  </a>
                )}
                {recipe.sourceUrl && (
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border border-[#333] text-gray-300 text-sm font-semibold rounded-lg hover:border-[#E23744]/50 hover:text-[#E23744] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Original Source
                  </a>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-[#1c1c1c] to-[#2d0a0d] rounded-xl p-4 text-center border border-[#2a2a2a]">
              <p className="text-white font-bold text-base mb-1">
                🍳 You've got everything you need.
              </p>
              <p className="text-gray-400 text-xs">
                No delivery fee. No 45-minute wait. No wrong order. Just you, a
                pan, and a little bit of glory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
