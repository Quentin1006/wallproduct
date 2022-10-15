import InfiniteScroll from "react-infinite-scroll-component"
import { observer } from "mobx-react-lite"

import React, { Fragment } from "react"

type NamedObj = { name: string }
export type ProductsListProps<T extends NamedObj> = {
  products: Array<T>
  totalLength: number
  productType: string
  getNextProducts: any
  renderProduct: (p: T) => React.ReactNode
}

export const ProductsList = observer(
  <T extends NamedObj>({
    getNextProducts,
    productType,
    products,
    renderProduct,
    totalLength,
  }: ProductsListProps<T>) => {
    console.log("rendering ProductsList", products.length)
    console.log(
      "has More ? ",
      products.length < totalLength,
      ", productsLen",
      products.length,
      ", totalLength",
      totalLength
    )

    if (!products || products.length === 0) {
      return <div>No product to display</div>
    }
    return (
      <div style={{ paddingBottom: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            fontSize: "24px",
          }}
        >
          <div>
            {totalLength} {productType}
          </div>
          <div>Displayed : {products.length}</div>
        </div>

        <InfiniteScroll
          dataLength={products.length}
          hasMore={products.length < totalLength}
          next={getNextProducts}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
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
