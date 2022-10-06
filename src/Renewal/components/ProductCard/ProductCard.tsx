import LazyLoad from "react-lazy-load"

import { SuspenseImg } from "../SuspenseImage/SuspenseImage"

import type { Product } from "../../typings"
import { useStore } from "../../../state"

export type ProductProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductProps) => {
  const uiStore = useStore("uiStore")

  const updateModal = () => {
    uiStore.setModal(true, `Information ${product.name}`, `Details: ${product.year}`)
  }

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
      <LazyLoad offset={300}>
        <SuspenseImg src={product.link} alt="telephone" width="80px" />
      </LazyLoad>

      <div>Color : {product.color}</div>
      <div>Year : {product.year}</div>
      <br />
      <button onClick={updateModal}>i</button>
    </div>
  )
}
