import { observer } from "mobx-react-lite"
import { Link, Outlet } from "react-router-dom"
import { useStore } from "@shared/state"

import { Comparator } from "./components/Comparator"
import { AppModal } from "./components/AppModal"

import BackgroundPhone from "./assets/background-phone.png"
import { useEffect } from "react"

const Layout = observer(() => {
  const { title, selectedMenu, setSelectedMenu } = useStore("uiStore")

  // @TODO: Set selected menu on load
  useEffect(() => {
    if (!selectedMenu) {
    }
  }, [])

  return (
    <>
      <div
        style={{
          backgroundColor: "#0065af",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "white", fontSize: "28px" }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              padding: "10px",
            }}
          >
            <Link
              to="/acquisition"
              onClick={() => setSelectedMenu("Acquisition")}
              style={{
                textDecoration: "none",
                color: selectedMenu === "Acquisition" ? "white" : "inherit",
              }}
            >
              Acquisition
            </Link>
          </div>
          <div style={{ padding: "10px", borderRight: "1px solid #0065a" }}>
            <Link
              onClick={() => setSelectedMenu("Renouvellement")}
              style={{
                textDecoration: "none",
                color: selectedMenu === "Renouvellement" ? "white" : "inherit",
              }}
              to="/renouvellement"
            >
              Renouvellement
            </Link>
          </div>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <img src={BackgroundPhone} width="100%" height="300px" />
      </div>

      <hr />
      <div style={{ maxWidth: "1200px", margin: "0 25px" }}>
        <Outlet />
      </div>

      <Comparator />
      <AppModal />
    </>
  )
})

export default Layout
