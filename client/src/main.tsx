import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"
import App from "./App"
import Modal from "react-modal"

const rootAnchor = document.getElementById("root") as HTMLElement
Modal.setAppElement("#root")

const root = ReactDOM.createRoot(rootAnchor)
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
)

