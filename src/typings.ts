export type Product = {
  name: string
  hash: string
  brand: string
  color: string
  link: string
  price: number
  year: number
}

export type Filter = {
  state: string | string[]
  type: "checkbox" | "input"
  choices?: string[]
  name: string
}

export type FilterRecord = Record<string, Filter>
