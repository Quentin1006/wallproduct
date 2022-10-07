import { makeAutoObservable } from "mobx";
import autoBind from "auto-bind";
import type { Product } from "../../typings";
import { MAX_COMPARATOR_SIZE } from "../config"


export default class ComparatorStore {
  config;
  list: Product[] = [];

  constructor(config: any) {
    console.log("creating ComparatorStore");
    this.config = config;
    makeAutoObservable(this);
    autoBind(this);
  }

  get canAddProduct (): boolean {
    return this.list.length < MAX_COMPARATOR_SIZE
  }

  addProduct(product: Product) {
    if(!this.canAddProduct) {
      return 
    }
    this.list.push(product)
  }

  removeProduct(productName: string) {
    const productIndex = this.list.findIndex((product) => ( product.name === productName))
    this.list.splice(productIndex, 1)
  }
}
