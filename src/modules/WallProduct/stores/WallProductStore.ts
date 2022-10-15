import { makeAutoObservable } from "mobx"
import autoBind from "auto-bind"

import type { FilterRecord, Product } from "typings"
import { hasFilters, mapChoicesToState } from "../helpers/helpers"
import { PAGE_SIZE } from "../config"

export default class WallProductStore {
  config
  constructor(config: any) {
    this.config = config
    makeAutoObservable(this)
    autoBind(this)
  }
  products: Product[] | undefined

  nbProductsToDisplay = PAGE_SIZE

  name = "wallProductStore"

  filters: FilterRecord = {
    search: {
      name: "Recherche",
      state: "",
      type: "input",
    },
    brand: {
      name: "Marque",
      state: [],
      type: "checkbox",
      choices: ["Google", "Apple", "Xiaomi", "Samsung", "Sony"],
    },
    price: {
      name: "Prix",
      state: [],
      type: "checkbox",
      choices: [],
    },
    color: {
      name: "Couleur",
      state: [],
      type: "checkbox",
      choices: ["blue", "black", "red", "white"],
    },
  }

  get checkboxFiltersChoices() {
    return Object.values(this.filters)
      .filter((f) => f.type === "checkbox")
      .map((f) =>
        (f.choices || []).map((choice) => ({
          name: choice,
          checked: f.state.indexOf(choice) >= 0,
        }))
      )
  }

  get brandFilterChoices() {
    return mapChoicesToState(this.filters.brand.choices, this.filters.brand.state)
  }

  get colorFilterChoices() {
    return mapChoicesToState(this.filters.color.choices, this.filters.color.state)
  }

  get productsToDisplay() {
    return this.products?.slice(0, this.nbProductsToDisplay) || []
  }

  addNextProductToDisplay() {
    this.nbProductsToDisplay += PAGE_SIZE
  }

  setProducts(products: Product[]): void {
    this.products = products
  }

  setFilters(filters: FilterRecord) {
    this.filters = filters
  }

  get hasFilters() {
    return hasFilters(this.filters)
  }

  updateCheckboxFilter(group: string, name: string, isChecked: boolean) {
    let state = this.filters[group].state as Array<string>
    if (isChecked && state.indexOf(name) < 0) {
      // and doesnt have filter
      state.push(name)
    } else if (state.indexOf(name) >= 0) {
      const idx = state.findIndex((val) => val === name)
      idx >= 0 && state.splice(idx, 1)
    }

    this.filters = {
      ...this.filters,
      [group]: this.filters[group],
    }
  }

  updateFilter(filterName: string, newState: Record<string, string>) {
    const newFilter = {
      ...this.filters[filterName],
      ...newState,
    }
    this.filters = {
      ...this.filters,
      [filterName]: newFilter,
    }
    console.log({ filters: JSON.stringify(this.filters) })
  }
}
