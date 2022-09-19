import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazy-load";
import { SuspenseImg } from "../SuspenseImage/SuspenseImage";

import type { Product } from "../../typings";

type WallProductsProps = {
  products: Product[] | undefined;
};

export const WallProducts = ({ products }: WallProductsProps) => {
  console.log("in WallProducts", {
    productsLen: products?.length,
    products: JSON.stringify(products),
  });
  if (!products || products.length === 0) {
    return <div>No products to display</div>;
  }
  return (
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
          <div
            key={product.name}
            style={{
              border: "1px solid black",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "calc(33% - 50px)",
              margin: "15px",
              borderRadius: "5%",
            }}
          >
            <div>Modele : {product.name}</div>
            <div>Marque : {product.brand}</div>
            <LazyLoad offset={300}>
              <SuspenseImg src={product.link} alt="telephone" width="80px" />
            </LazyLoad>

            <div>Color : {product.color}</div>
            <div>Year : {product.year}</div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};
