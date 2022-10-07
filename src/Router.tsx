import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import React from "react"

import WallProductLayout from "./WallProduct/Layout"
import RenewalPage from "./WallProduct/RenewalPage"
import AcquisitionPage from "./WallProduct/AcquisitionPage"

const Draft = ({ subtitle, goBack }: any) => {
  return (
    <>
      <div>Work in progress : {subtitle}</div>
      <Link to={goBack}>Go back</Link>
    </>
  )
}

const Router: React.FC = () => (
  <>
    <BrowserRouter basename="telephones">
      <Routes>
        <Route path="/" element={<WallProductLayout />}>
          <Route path="/renouvellement" element={<RenewalPage />} />
          <Route path="/acquisition" element={<AcquisitionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)

export default Router
