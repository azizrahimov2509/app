import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SelectedCart from "./Components/SelectedItems";

import "./App.css";
import Header from "./Components/Header";
import Products from "./Components/Products";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/selected-cart" element={<SelectedCart />} />
      </Routes>
    </Router>
  );
}
