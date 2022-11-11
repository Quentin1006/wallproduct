import React, { Fragment, ReactNode } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { observer } from "mobx-react-lite"

import { HeaderContainer } from "./HeaderContainer"

type NamedObj = { id: string | number }

export type ProductsListProps<T extends NamedObj> = {
  products: Array<T>
  totalLength: number
  productType: string
  getNextProducts: any
  renderProduct: (p: T) => ReactNode
  Header?: React.FC
  headerStyle?: React.CSSProperties
  listStyle?: React.CSSProperties
}

export const ProductsList = observer(
  <T extends NamedObj>({
    getNextProducts,
    products,
    renderProduct,
    Header,
    totalLength,
    headerStyle,
    listStyle,
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
        {Header ? (
          <HeaderContainer customStyle={headerStyle}>
            <Header />
          </HeaderContainer>
        ) : null}

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
              ...listStyle,
            }}
          >
            {products.map((product) => (
              <Fragment key={product.id}>{renderProduct(product)}</Fragment>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
)
