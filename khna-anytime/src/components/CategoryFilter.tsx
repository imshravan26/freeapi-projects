import { useRef } from "react";

interface CategoryFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
}

const categories = [
  { label: "All", emoji: "🍽️" },
  { label: "Vegetarian", emoji: "🥗" },
  { label: "Pasta", emoji: "🍝" },
  { label: "Dessert", emoji: "🍰" },
  { label: "Breakfast", emoji: "🥞" },
  { label: "Chicken", emoji: "🍗" },
  { label: "Seafood", emoji: "🦐" },
  { label: "Lamb", emoji: "🫕" },
  { label: "Side", emoji: "🍚" },
  { label: "Starter", emoji: "🥙" },
];

// Popular tags users can click to instantly search
const quickTags = [
  "curry",
  "rice",
  "spicy",
  "grilled",
  "soup",
  "salad",
  "fried",
  "baked",
];

export default function CategoryFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleCategoryClick(label: string) {
    setSelectedCategory(label);
    // Clear search when switching category so they don't conflict
    setSearchQuery("");
  }

  function handleTagClick(tag: string) {
    setSearchQuery(tag);
    setSelectedCategory("All");
    inputRef.current?.focus();
  }

  function handleClear() {
    setSearchQuery("");
    setSelectedCategory("All");
    inputRef.current?.focus();
  }

  const hasActiveSearch = searchQuery.trim().length > 0;
  const hasActiveFilter = selectedCategory !== "All";

  return (
    <div className="mb-8 space-y-5">
      {/* ── Search bar ─────────────────────────────────────────────────────── */}
      <div className="relative group">
        {/* Search icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#E23744] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // Picking a category and then typing should reset category
            if (selectedCategory !== "All") setSelectedCategory("All");
          }}
          placeholder="Search recipes by name, tag, or ingredient…"
          className="w-full pl-11 pr-28 py-3.5 bg-[#1c1c1c] border border-[#2e2e2e] rounded-xl text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#E23744]/60 focus:ring-1 focus:ring-[#E23744]/20 transition-all"
        />

        {/* Right side: kbd hint or clear button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {hasActiveSearch || hasActiveFilter ? (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#E23744] transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded text-[10px] text-gray-500 font-mono">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded text-[10px] text-gray-500 font-mono">
                K
              </kbd>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick tag pills ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest shrink-0">
          Quick search:
        </span>
        {quickTags.map((tag) => {
          const active = searchQuery.toLowerCase() === tag;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                active
                  ? "bg-[#E23744]/15 border-[#E23744]/50 text-[#E23744]"
                  : "bg-transparent border-[#2e2e2e] text-gray-500 hover:border-[#E23744]/40 hover:text-gray-300"
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#2a2a2a]" />
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          or browse by category
        </span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </div>

      {/* ── Category chips ──────────────────────────────────────────────────── */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleCategoryClick(cat.label)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.label
                ? "bg-[#E23744] border-[#E23744] text-white shadow-lg shadow-[#E23744]/30"
                : "bg-[#1e1e1e] border-[#2e2e2e] text-gray-400 hover:border-[#E23744]/60 hover:text-[#E23744]"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
