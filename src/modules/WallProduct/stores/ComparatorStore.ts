import { makeAutoObservable } from "mobx"
import type { Product } from "typings"
import { MAX_COMPARATOR_SIZE } from "../config"

export default class ComparatorStore {
  config
  list: Product[] = []

  constructor(config: any) {
    console.log("creating ComparatorStore")
    this.config = config
    makeAutoObservable(this)
  }

  get canAddProduct(): boolean {
    return this.list.length < MAX_COMPARATOR_SIZE
  }

  addProduct(product: Product) {
    if (!this.canAddProduct) {
      return
    }
    this.list = [...this.list, product]
  }

  removeProduct(productName: string) {
    this.list = this.list.reduce((acc, el) => {
      return el.name === productName ? acc : [...acc, el]
    }, [] as Product[])
  }
}
