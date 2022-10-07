import { makeAutoObservable } from "mobx";
import autoBind from "auto-bind";

import type { FilterRecord, Product } from "../../typings";
import { appendFiltersToUrl, hasFilters } from "../helpers";

export default class WallProductStore {
  config;
  constructor(config: any) {
    console.log("creating store");
    this.config = config;
    makeAutoObservable(this);
    autoBind(this);
  }
  isLoading = true;
  isError = false;
  name = "wallProductStore";
  filters: FilterRecord = {
    brand: {
      label: "brand",
      state: "",
      type: "input",
    },
    color: {
      label: "color",
      state: "",
      type: "input",
    },
  };

  products: Product[] | undefined;

  setError(val = true): void {
    this.isError = val;
  }

  setLoading(val: boolean): void {
    this.isLoading = val;
  }

  setProducts(products: Product[]): void {
    this.products = products;
  }

  setFilters(filters: FilterRecord) {
    this.filters = filters;
  }

  get hasFilters() {
    return hasFilters(this.filters);
  }

  updateFilter(filterName: string, newState: string) {
    const newFilter = {
      ...this.filters[filterName],
      state: newState,
    };

    this.filters = {
      ...this.filters,
      [filterName]: newFilter,
    };

    console.log({ filters: JSON.stringify(this.filters) });
  }

  async fetchProducts(headers: Record<string, string>) {
    try {
      console.log({ apiUrl: this.config.apiUrl });
      const urlWithQueryString = appendFiltersToUrl(
        `${this.config.apiUrl}/products`,
        this.filters
      );
      const response = await fetch(urlWithQueryString, headers);
      const data = await response.json();
      this.setProducts(data.products);
    } catch (error) {
      this.setError();
    }
    this.setLoading(false);
  }
}
