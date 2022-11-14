import { useCallback } from "react"

import { useStore } from "@shared/state"

import Select, { SingleValue } from "react-select"
import type { SortOption } from "typings"

export const ProductsListHeader = () => {
  const { products, nbProductsToDisplay, sortOptions, selectedSortOption, selectSortOption } =
    useStore("wallProductStore")

  const handleSortChange = useCallback(
    (newValue: SingleValue<SortOption>) => {
      selectSortOption(newValue)
    },
    [selectSortOption]
  )

  return (
    <>
      <div style={{ display: "flex", fontSize: "24px" }}>
        <div>{products?.length} Téléphones</div>
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>|</div>
        <div>Displayed : {nbProductsToDisplay}</div>
      </div>

      <div style={{ minWidth: "200px" }}>
        <Select
          options={sortOptions}
          defaultValue={selectedSortOption}
          onChange={handleSortChange}
          placeholder="Trier Par"
        />
      </div>
    </>
  )
}
