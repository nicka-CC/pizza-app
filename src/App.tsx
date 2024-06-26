import React, {createContext, useState} from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/header.tsx";
import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/cart.tsx";
import NotFound from "./pages/n404.tsx";
import PizzaItem from "./components/pizzaItem.tsx";

interface AppContextType {
  searches: string;
  setSearches: React.Dispatch<React.SetStateAction<string>>;
}
export const AppContext = createContext<AppContextType>({
  searches: '',
  setSearches: () => {}
});
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
              <Route path="/pizza/:id" element={<PizzaItem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
