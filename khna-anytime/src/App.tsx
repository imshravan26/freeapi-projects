import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import RecipeGrid from "./components/RecipeGrid";
import RecipeModal from "./components/Recipemodal";
import Footer from "./components/Footer";
import { type Recipe } from "./types";
import { fetchMeals, fetchMealById } from "./api/meals";

const PAGE_LIMIT = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // 400ms debounce on free-text search
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Reset to page 1 on any filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedCategory]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Category chips take priority; search text is used when category is "All"
      const query =
        selectedCategory !== "All" ? selectedCategory : debouncedQuery;
      const result = await fetchMeals(page, PAGE_LIMIT, query);
      setRecipes(result.recipes);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQuery, selectedCategory]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSelectRecipe(recipe: Recipe) {
    setSelectedRecipe(recipe);
    setModalLoading(true);
    try {
      const full = await fetchMealById(recipe.id);
      setSelectedRecipe(full);
    } catch {
      /* keep card-level data */
    } finally {
      setModalLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <RecipeGrid
          recipes={recipes}
          loading={loading}
          error={error}
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setPage}
          onSelectRecipe={handleSelectRecipe}
          onRetry={load}
        />
      </main>
      <Footer />
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          loading={modalLoading}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
