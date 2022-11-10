import { useStore } from "@shared/state"

import Select from "react-select"

export const ProductsListHeader = () => {
  const { products, nbProductsToDisplay } = useStore("wallProductStore")

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  return (
    <>
      <div style={{ display: "flex", fontSize: "24px" }}>
        <div>{products?.length} Téléphones</div>
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>|</div>
        <div>Displayed : {nbProductsToDisplay}</div>
      </div>

      <div style={{ minWidth: "200px" }}>
        <Select options={options} />
      </div>
    </>
  )
}
