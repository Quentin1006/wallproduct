import LazyLoad from "react-lazy-load"
import { useEffect, useMemo, useState } from "react"
import type { Product } from "typings"
import { useStore } from "@shared/state"
import { observer } from "mobx-react-lite"

import { SuspenseImg } from "../SuspenseImage/SuspenseImage"

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
      <LazyLoad offset={300}>
        <SuspenseImg src={product.link} alt="telephone" width="80px" />
      </LazyLoad>

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
