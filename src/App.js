import React, { createContext, useState } from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

import Cart from "./pages/cart";
import NotFound from "./pages/n404";

export const AppContext = createContext();
function App() {
  const [searches, setSearches] = useState("");

  return (
    <div>
      <div className="wrapper">
        <AppContext.Provider value={{ searches, setSearches }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
