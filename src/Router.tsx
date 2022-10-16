import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"

import { WallProductLayout, RenewalPage, AcquisitionPage } from "@modules/WallProduct"
import { ProtectedRoute } from "@shared/auth"

const Router: React.FC = () => (
  <>
    <BrowserRouter basename="telephones">
      <Routes>
        <Route path="/" element={<WallProductLayout />}>
          <Route path="/renouvellement" element={<RenewalPage />} />
          <Route
            path="/acquisition"
            element={
              <ProtectedRoute>
                <AcquisitionPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)

export default Router
