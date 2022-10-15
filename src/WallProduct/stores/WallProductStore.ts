import { makeAutoObservable } from "mobx"
import autoBind from "auto-bind"

import type { FilterRecord, Product } from "../../typings"
import { appendFiltersToUrl, hasFilters } from "../helpers/helpers"

export default class WallProductStore {
  config
  constructor(config: any) {
    console.log("creating store")
    this.config = config
    makeAutoObservable(this)
    autoBind(this)
  }

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
      choices: ["Google", "Apple", "Xiaomi", "Sony"],
    },
    price: {
      name: "Prix",
      state: [],
      type: "checkbox",
      choices: [],
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
    const resp = (this.filters.brand.choices || []).map((choice) => ({
      name: choice,
      checked: this.filters.brand.state.indexOf(choice) >= 0,
    }))

    return resp
  }

  products: Product[] | undefined

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
