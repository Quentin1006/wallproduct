import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { lazy, Suspense } from "react"

import { ProtectedRoute } from "@shared/auth"

import MainLayout from "./Layout"
import { Menus } from "./typings"

const RenewalPage = lazy(() => import("./modules/WallProduct/RenewalPage"))
const AcquisitionPage = lazy(() => import("@modules/WallProduct/AcquisitionPage"))
const OtherProductsListPage = lazy(() => import("@modules/OtherProductsList/OtherProductsListPage"))

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
                <Suspense fallback={<div>Loading module...</div>}>
                  <RenewalPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={RouteMapping[Menus.ACQUISITION]}
            element={
              <Suspense fallback={<div>Loading module...</div>}>
                <AcquisitionPage />
              </Suspense>
            }
          />
          <Route
            path={RouteMapping[Menus.OTHER_PRODUCT_LIST]}
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading module...</div>}>
                  <OtherProductsListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
)

export default Router
