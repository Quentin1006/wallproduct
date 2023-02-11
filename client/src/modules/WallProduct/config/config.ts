import type { SortOption } from "typings"
import { SortCriteria } from "../stores/WallProductStore"

export const FETCH_PRODUCT_URL = (): string => "/products"
export const FETCH_USER_URL = (userId?: number): string => `/users/${userId}`

export const MAX_COMPARATOR_SIZE = 3
export const PAGE_SIZE = 20

export const SORT_OPTIONS: SortOption[] = [
  { value: SortCriteria.INCREASING_PRICE, label: "Prix Croissants" },
  { value: SortCriteria.BEST_SELLER, label: "Meilleures Ventes" },
  { value: SortCriteria.NEWEST, label: "Nouveautés" },
]

export enum OfferType {
  ACQUISITION = "acquisition",
  RENEWAL = "renouvellement",
}
