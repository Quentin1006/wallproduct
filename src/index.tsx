import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"
import App from "./App"
import Modal from "react-modal"
import reportWebVitals from "./reportWebVitals"

const rootAnchor = document.getElementById("root") as HTMLElement
Modal.setAppElement("#root")

const root = ReactDOM.createRoot(rootAnchor)
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
