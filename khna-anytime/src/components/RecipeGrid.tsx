import { type Recipe } from "../types";

interface RecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (p: number) => void;
  onSelectRecipe: (r: Recipe) => void;
  onRetry: () => void;
}

export default function RecipeGrid({
  recipes,
  loading,
  error,
  page,
  totalPages,
  totalItems,
  onPageChange,
  onSelectRecipe,
  onRetry,
}: RecipeGridProps) {
  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-lg font-bold text-gray-300 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-500 text-sm mb-5">{error}</p>
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-[#E23744] text-white text-sm font-bold rounded-lg hover:bg-[#c62f3b] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Skeleton loading ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div>
        <div className="flex items-baseline justify-between mb-5">
          <div className="h-6 w-40 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="h-4 w-32 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Empty state ──────────────────────────────────────────────────────────────
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-500 text-sm">
          Try a different search or category. Unlike Zomato, we can't deliver
          what doesn't exist.
        </p>
      </div>
    );
  }

  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (page > 3) pages.push("…");
    for (
      let p = Math.max(2, page - 1);
      p <= Math.min(totalPages - 1, page + 1);
      p++
    ) {
      pages.push(p);
    }
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-100">
          {totalItems.toLocaleString()} Recipe{totalItems !== 1 ? "s" : ""}{" "}
          Found
        </h2>
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => onSelectRecipe(recipe)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pb-4">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border border-[#2e2e2e] bg-[#1c1c1c] text-gray-400 hover:border-[#E23744]/60 hover:text-[#E23744] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2e2e2e] disabled:hover:text-gray-400 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>

          {getPageNumbers().map((p, i) =>
            p === "…" ? (
              <span
                key={`el-${i}`}
                className="w-9 text-center text-gray-600 text-sm select-none"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 rounded-lg text-sm font-bold border transition-all ${
                  page === p
                    ? "bg-[#E23744] border-[#E23744] text-white shadow-lg shadow-[#E23744]/25"
                    : "bg-[#1c1c1c] border-[#2e2e2e] text-gray-400 hover:border-[#E23744]/60 hover:text-[#E23744]"
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border border-[#2e2e2e] bg-[#1c1c1c] text-gray-400 hover:border-[#E23744]/60 hover:text-[#E23744] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#2e2e2e] disabled:hover:text-gray-400 transition-all"
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-[#2a2a2a]">
      <div className="h-44 bg-[#2a2a2a] animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="h-3 w-14 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="h-4 w-3/4 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="pt-2 border-t border-[#2a2a2a] flex justify-between">
          <div className="h-5 w-14 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="h-4 w-16 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ── Recipe card ────────────────────────────────────────────────────────────────
function RecipeCard({
  recipe,
  onClick,
}: {
  recipe: Recipe;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-sm hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Veg indicator */}
        <div className="absolute top-3 left-3">
          <div
            className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center bg-white ${
              recipe.isVeg ? "border-green-600" : "border-red-600"
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${recipe.isVeg ? "bg-green-600" : "bg-red-600"}`}
            />
          </div>
        </div>
        {/* Area badge */}
        {recipe.area && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
            🌍 {recipe.area}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#E23744] uppercase tracking-wide">
            {recipe.category}
          </span>
          {recipe.tags[0] && (
            <span className="text-xs text-gray-500 bg-[#2a2a2a] px-2 py-0.5 rounded-full">
              #{recipe.tags[0]}
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-100 text-base mb-1.5 leading-snug group-hover:text-[#E23744] transition-colors line-clamp-1">
          {recipe.name}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">🧅</span>
            <span className="text-xs text-gray-400">
              {recipe.ingredients.length} ingredients
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">📋</span>
            <span className="text-xs text-gray-400">
              {recipe.steps.length} steps
            </span>
          </div>
          {recipe.youtubeUrl && (
            <div className="flex items-center gap-1 text-[#E23744]">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
              <span className="text-xs font-semibold">Video</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
