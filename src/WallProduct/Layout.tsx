import { observer } from "mobx-react-lite"
import { Link, Outlet } from "react-router-dom"
import { useStore } from "../state"

import { Comparator } from "./components/Comparator"
import AppModal from "./components/AppModal"

import BackgroundPhone from "./img/background-phone.png"

const Layout = observer(() => {
  const { title } = useStore("uiStore")

  return (
    <>
      <div
        style={{ backgroundColor: "#0065af", color: "white", fontSize: "28px", padding: "20px" }}
      >
        {title}
      </div>
      <img src={BackgroundPhone} width="100%" height="300px" />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ padding: "10px", border: "1px solid #0065a" }}>
          <Link to="/acquisition">Acquisition</Link>
        </div>
        <div style={{ padding: "10px", border: "1px solid #0065a" }}>
          <Link to="/renouvellement">Renouvellement</Link>
        </div>
      </div>
      <Outlet />
      <Comparator />
      <AppModal />
    </>
  )
})

export default Layout
