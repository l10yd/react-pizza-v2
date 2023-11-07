import React from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza.tsx";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

export const SearchContext = React.createContext("");

/*function Parent({ children }) {
  return (
    <div>
      <h1>Заголовок</h1>
      <Outlet />
      <h4>Заключение</h4>
    </div>
  );
}*/

function App() {
  //уже используется в redux, ну пусть будет
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
