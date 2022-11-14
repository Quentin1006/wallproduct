import { makeAutoObservable } from "mobx"
import autoBind from "auto-bind"

import { hasFilters, mapChoicesToState } from "../helpers/helpers"
import { PAGE_SIZE, SORT_OPTIONS } from "../config"

import type { FilterRecord, Product, SortOption } from "typings"
import type { MergedConfig } from "config"

export enum SortCriteria {
  BEST_SELLER = "meilleures_ventes",
  INCREASING_PRICE = "prix_croissants",
  NEWEST = "nouveautes",
}

export default class WallProductStore {
  config
  constructor(config: MergedConfig) {
    this.config = config
    makeAutoObservable(this)
    autoBind(this)
  }

  name = "wallProductStore"

  /** Products */
  products: Product[] | undefined

  nbProductsToDisplay = PAGE_SIZE

  get productsToDisplay() {
    return this.products?.slice(0, this.nbProductsToDisplay) || []
  }

  addNextProductToDisplay() {
    const nextNbProductToDisplay = this.nbProductsToDisplay + PAGE_SIZE
    this.nbProductsToDisplay = Math.min(nextNbProductToDisplay, this.products?.length || 0)
  }

  setProducts(products: Product[]): void {
    this.products = products
    this.sortProducts(this.selectedSortOption.value)
  }

  /** Filters */
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

  /** Sort Products */
  sortOptions = SORT_OPTIONS

  selectedSortOption = SORT_OPTIONS[0]

  _sortFromLowToHigh() {
    this.products?.sort((a, b) => a.price - b.price)
  }

  _sortByBestSells() {
    this.products?.sort((a, b) => b.sold - a.sold)
  }

  _sortByNewest() {
    this.products?.sort((a, b) => a.daysSinceLaunch - b.daysSinceLaunch)
  }

  // @TODO: Find a way to do it in one action
  selectSortOption(newSortOption: SortOption | null) {
    if (newSortOption) {
      this.selectedSortOption = newSortOption
      this.sortProducts(newSortOption.value)
    }
  }

  sortProducts(criteria: string) {
    switch (criteria) {
      case SortCriteria.BEST_SELLER:
        this._sortByBestSells()
        break
      case SortCriteria.INCREASING_PRICE:
        this._sortFromLowToHigh()
        break
      case SortCriteria.NEWEST:
        this._sortByNewest()
        break
      default:
        console.warn(`criteria : ${criteria} cannot be handled`)
        break
    }
  }
}
