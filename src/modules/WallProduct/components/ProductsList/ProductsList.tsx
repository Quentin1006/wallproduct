import InfiniteScroll from "react-infinite-scroll-component"
import { observer } from "mobx-react-lite"

import { ProductCard } from "../ProductCard"
import React, { Fragment } from "react"

type NamedObj = { name: string }
export type ProductsListProps<T extends NamedObj> = {
  products: Array<T>
  productType: string
  renderProduct: (p: T) => React.ReactNode
}

export const ProductsList = observer(
  <T extends NamedObj>({ productType, products, renderProduct }: ProductsListProps<T>) => {
    console.log("rendering ProductsList", products.length)

    if (!products || products.length === 0) {
      return <div>No product to display</div>
    }
    return (
      <div>
        <div style={{ padding: "15px", fontSize: "24px" }}>
          {products.length} {productType}
        </div>
        <InfiniteScroll
          dataLength={products.length}
          hasMore={false}
          next={() => {}}
          loader={<h4>Loading...</h4>}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {products.map((product) => (
              <Fragment key={product.name}>{renderProduct(product)}</Fragment>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
)
