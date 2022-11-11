import { observer } from "mobx-react-lite"

import { Comparator } from "./components/Comparator"
import { AppModal } from "./components/AppModal"

import BackgroundPhone from "./assets/background-phone.png"

const Layout = observer(({ children }: any) => {
  return (
    <>
      <div style={{ height: "300px" }}>
        <img src={BackgroundPhone} width="100%" height="300px" alt="background_phone" />
      </div>

      <hr />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>

      <Comparator />
      <AppModal />
    </>
  )
})

export default Layout
