import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"

import { RenewalPage, AcquisitionPage } from "@modules/WallProduct"
import { OtherProductsListPage } from "@modules/OtherProductsList"

import { ProtectedRoute } from "@shared/auth"

import MainLayout from "./Layout"
import { Menus } from "./typings"

export const RouteMapping: Record<Menus, string> = {
  [Menus.OTHER_PRODUCT_LIST]: "/other-products-list",
  [Menus.RENEWAL]: "/renouvellement",
  [Menus.ACQUISITION]: "/acquisition",
}

const Router: React.FC = () => (
  <>
    <BrowserRouter basename="telephones">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path={RouteMapping[Menus.RENEWAL]}
            element={
              <ProtectedRoute>
                <RenewalPage />
              </ProtectedRoute>
            }
          />
          <Route path={RouteMapping[Menus.ACQUISITION]} element={<AcquisitionPage />} />
          <Route
            path={RouteMapping[Menus.OTHER_PRODUCT_LIST]}
            element={
              <ProtectedRoute>
                <OtherProductsListPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)

export default Router
