import { type ApiMeal, type ApiListResponse, type ApiDetailResponse, type Recipe, type Ingredient } from "../types";

const BASE = "https://api.freeapi.app/api/v1/public/meals";

// ─── Transformer ──────────────────────────────────────────────────────────────

export function transformMeal(m: ApiMeal): Recipe {
  // Collect non-empty ingredient/measure pairs (API has strIngredient1…20)
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const item = m[`strIngredient${i}`]?.trim();
    const amount = m[`strMeasure${i}`]?.trim();
    if (item) ingredients.push({ item, amount: amount || "" });
  }

  // Split instructions into step paragraphs on ". " or newlines
  const rawSteps = m.strInstructions
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Use first step sentence as the card description
  const description = rawSteps[0]?.slice(0, 160) ?? "";

  const tags = m.strTags
    ? m.strTags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
    : [];

  return {
    id: m.idMeal,
    name: m.strMeal,
    description,
    category: m.strCategory ?? "Other",
    area: m.strArea ?? "",
    image: m.strMealThumb,
    tags,
    ingredients,
    steps: rawSteps,
    youtubeUrl: m.strYoutube || null,
    sourceUrl: m.strSource || null,
    isVeg: m.strCategory?.toLowerCase() === "vegetarian",
  };
}

// ─── API calls ────────────────────────────────────────────────────────────────

export interface FetchListResult {
  recipes: Recipe[];
  totalPages: number;
  totalItems: number;
  page: number;
}

/** Fetch paginated list, optionally filtered by search query */
export async function fetchMeals(
  page: number,
  limit: number,
  query: string
): Promise<FetchListResult> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(query.trim() ? { query: query.trim() } : {}),
  });

  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const json: ApiListResponse = await res.json();
  const d = json.data;

  return {
    recipes: d.data.map(transformMeal),
    totalPages: d.totalPages,
    totalItems: d.totalItems,
    page: d.page,
  };
}

/** Fetch a single meal by numeric id */
export async function fetchMealById(id: string): Promise<Recipe> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const json: ApiDetailResponse = await res.json();
  return transformMeal(json.data);
}