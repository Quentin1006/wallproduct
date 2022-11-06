import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"

import { WallProductLayout, RenewalPage, AcquisitionPage } from "@modules/WallProduct"
import { ProtectedRoute } from "@shared/auth"

const Router: React.FC = () => (
  <>
    <BrowserRouter basename="telephones">
      <Routes>
        <Route path="/" element={<WallProductLayout />}>
          <Route
            path="/renouvellement"
            element={
              <ProtectedRoute>
                <RenewalPage />
              </ProtectedRoute>
            }
          />
          <Route path="/acquisition" element={<AcquisitionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)

export default Router
