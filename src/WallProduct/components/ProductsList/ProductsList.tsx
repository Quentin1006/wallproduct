import InfiniteScroll from "react-infinite-scroll-component"
import { observer } from "mobx-react-lite"

import { useStore } from "../../../state"
import { ProductCard } from "../ProductCard"

export const ProductsList = observer(() => {
  const { products } = useStore("wallProductStore")

  console.log("in WallProducts", {
    productsLen: products?.length,
    products: JSON.stringify(products),
  })
  if (!products || products.length === 0) {
    return <div>No products to display</div>
  }
  return (
    <>
      <div style={{ padding: "15px", fontSize: "24px" }}>{products.length} Téléphones</div>
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
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
})
