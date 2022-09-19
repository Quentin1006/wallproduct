import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

import RenewalLayout from "./Renewal/Layout";
import PublicRenewal from "./Renewal/PublicRenewal";

const Draft = ({ subtitle, goBack }: any) => {
  return (
    <>
      <div>Work in progress : {subtitle}</div>
      <Link to={goBack}>Go back</Link>
    </>
  );
};

const Router: React.FC = () => (
  <BrowserRouter basename="renouvellement">
    <Routes>
      <Route path="/" element={<RenewalLayout />}>
        <Route index element={<PublicRenewal goBack="/pro" />} />
        <Route path="/pro" element={<Draft subtitle="PRO" goBack="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
