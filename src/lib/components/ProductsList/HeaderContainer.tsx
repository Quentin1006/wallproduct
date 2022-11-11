import { useRef } from "react"
import { useStickyMenu } from "../../../modules/WallProduct/hooks/useStickyMenu"

export const HeaderContainer = ({ children }: any) => {
  const containerRef = useRef<HTMLDivElement>(null)

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
          backgroundColor: "#fff",
          width: "100%",
          // width: position === "fixed" ? `calc(100% - ${paddingSide * 2}px)` : "inherit",
          left: position === "fixed" ? "0px" : "inherit",
          boxShadow: position === "fixed" ? "0px 6px 11px -3px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {children}
      </div>
    </div>
  )
}
