import { CSSProperties, ReactNode, useRef } from "react"
import { useStickyMenu } from "./useStickyMenu"

export type HeaderContainerProps = {
  customStyle?: CSSProperties
  children: ReactNode
}

export const HeaderContainer = ({ children, customStyle }: HeaderContainerProps) => {
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
          boxSizing: "border-box",
          width: "100%",
          // width: position === "fixed" ? `calc(100% - ${paddingSide * 2}px)` : "inherit",
          left: position === "fixed" ? "0px" : "inherit",
          boxShadow: position === "fixed" ? "0px 6px 11px -3px rgba(0,0,0,0.1)" : "none",
          ...customStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}
