export const FETCH_PRODUCT_URL = (): string => "/products"
export const FETCH_USER_URL = (userId?: number): string => `/users/${userId}`

export const MAX_COMPARATOR_SIZE = 3

export enum OfferType {
  ACQUISITION = "acquisition",
  RENEWAL = "renouvellement",
}
