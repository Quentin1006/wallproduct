import { useRef } from "react"
import { useStickyMenu } from "../../hooks/useStickyMenu"

const paddingSide = 15

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
          padding: `${paddingSide}x`,
          backgroundColor: "#fff",
          width: `calc("100%" - ${paddingSide * 2}px")`,
          // width: position === "fixed" ? "100vw" : "100%",
          // left: position === "fixed" ? "0px" : "inherit",
          borderBottom: position === "fixed" ? "1px solid grey" : "0px",
        }}
      >
        {children}
      </div>
    </div>
  )
}
