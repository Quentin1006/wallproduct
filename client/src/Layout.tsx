import { Outlet, useLocation } from "react-router-dom"
import { observer } from "mobx-react-lite"

import { useStore } from "@shared/state"
import { Menus } from "./typings"
import { useEffect } from "react"
import { RouteMapping } from "./Router"
import { NavMenu } from "./components/NavMenu"

const Layout = observer(() => {
  const { selectedMenu, setSelectedMenu } = useStore("uiStore")
  const loc = useLocation()

  useEffect(() => {
    const { pathname } = loc
    const selected = Object.keys(RouteMapping).find(
      (key) => (RouteMapping as any)[key] === pathname
    )
    selected && setSelectedMenu(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        style={{
          backgroundColor: "#6190b3",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "28px" }}>My App</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "56px",
          }}
        >
          <NavMenu
            isSelected={selectedMenu === Menus.ACQUISITION}
            name={Menus.ACQUISITION}
            pathname={RouteMapping[Menus.ACQUISITION]}
            onSelect={setSelectedMenu}
          />
          <NavMenu
            isSelected={selectedMenu === Menus.RENEWAL}
            name={Menus.RENEWAL}
            pathname={RouteMapping[Menus.RENEWAL]}
            onSelect={setSelectedMenu}
          />
          <NavMenu
            isSelected={selectedMenu === Menus.OTHER_PRODUCT_LIST}
            name={Menus.OTHER_PRODUCT_LIST}
            pathname={RouteMapping[Menus.OTHER_PRODUCT_LIST]}
            onSelect={setSelectedMenu}
          />
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Outlet />
      </div>
    </>
  )
})

export default Layout
