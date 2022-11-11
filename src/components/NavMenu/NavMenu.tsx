import { Link } from "react-router-dom"

export type NavMenuProps = {
  name: string
  isSelected: boolean
  pathname: string
  onSelect: (name: string) => void
}

export const NavMenu = ({ isSelected, name, onSelect, pathname }: NavMenuProps) => {
  return (
    <div
      style={{
        padding: "0px 10px",
        height: "calc(100% - 5px)",
        display: "flex",
        alignItems: "center",
        color: isSelected ? "white" : "inherit",
        border: isSelected ? "1px solid white" : "none",
      }}
    >
      <Link
        to={pathname}
        onClick={() => onSelect(name)}
        style={{
          textDecoration: "none",
        }}
      >
        {name}
      </Link>
    </div>
  )
}
