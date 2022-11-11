export type Product = {
  id: string | number
  name: string
  hash: string
  brand: string
  color: string
  link: string
  price: number
  year: number
  sold: number
  daysSinceLaunch: number
}

export type User = {
  id: string | number
  first_name: string
  last_name: string
  email: string
  gender: string
}

export type Filter = {
  state: string | string[]
  type: "checkbox" | "input"
  choices?: string[]
  name: string
}

export type FilterRecord = Record<string, Filter>

export type SortOption = {
  value: string
  label: string
}

export enum Menus {
  ACQUISITION = "Acquisition",
  RENEWAL = "Renouvellement",
  OTHER_PRODUCT_LIST = "Other ProductList",
}
