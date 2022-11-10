import { useStickyMenu } from "../../hooks/useStickyMenu"
import { useState, useEffect, useRef } from "react"

export type ProductsListHeaderProps = {
  displayedLength: number
  totalLength: number
  type: string
}

export const ProductsListHeader = ({
  totalLength,
  displayedLength,
  type,
}: ProductsListHeaderProps) => {
  const containerRef = useRef<any>(null)

  const { position } = useStickyMenu(containerRef)

  return (
    <div className="products-list-header-container" ref={containerRef}>
      <div
        className="products-list-header"
        style={{
          position,
          top: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          fontSize: "24px",
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            {totalLength} {type}
          </div>
          <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>|</div>
          <div>Displayed : {displayedLength}</div>
        </div>

        {/* <div>
          <select>
            <option></option>
          </select>
        </div> */}
      </div>
    </div>
  )
}
