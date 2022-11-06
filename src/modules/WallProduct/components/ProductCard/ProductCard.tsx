import LazyLoad from "react-lazy-load"
import type { Product } from "typings"
import { useStore } from "@shared/state"
import { observer } from "mobx-react-lite"

import { OptimizedImage } from "../OptimizedImage/OptimizedImage"

export type ProductProps = {
  product: Product
  isInComparator: boolean
}

export const ProductCard = observer(({ product, isInComparator }: ProductProps) => {
  const { setModal } = useStore("uiStore")
  const { canAddProduct, addProduct } = useStore("comparatorStore")

  const updateModal = () => {
    setModal(true, `Information ${product.name}`, `Details: ${product.year}`)
  }

  console.log("rendering ProductCard")

  return (
    <div
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
      <div style={{ margin: "15px auto" }}>
        <LazyLoad offset={300}>
          <OptimizedImage
            src={product.link}
            hash={product.hash}
            alt="telephone"
            width={180}
            height={288}
          />
        </LazyLoad>
      </div>
      <div>Color : {product.color}</div>
      <div>Year : {product.year}</div>
      <br />
      <button onClick={updateModal}>i</button>
      <br />
      <button
        onClick={() => {
          addProduct(product)
        }}
        disabled={!canAddProduct || isInComparator}
      >
        ajouter au comparateur
      </button>
    </div>
  )
})
