// ─── Raw API shapes ────────────────────────────────────────────────────────────

export interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strDrinkAlternate: string | null;
  [key: string]: string | null;
}

export interface ApiListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    totalPages: number;
    previousPage: boolean;
    nextPage: boolean;
    totalItems: number;
    currentPageItems: number;
    data: ApiMeal[];
  };
}

export interface ApiDetailResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ApiMeal;
}

// ─── Unified app type ──────────────────────────────────────────────────────────

export interface Ingredient {
  amount: string;
  item: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  area: string;
  image: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  youtubeUrl: string | null;
  sourceUrl: string | null;
  isVeg: boolean;
}
