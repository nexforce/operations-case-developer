import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../home";
import FormPage from "../form";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/new-product/:id?" element={<FormPage />} />
    </Routes>
  );
};

export default AppRoutes;
