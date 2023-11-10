import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loadable from "react-loadable";
import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

//codesplitting: динамический импорт, чтобы отрезать чанк от бандла
//и грузить чанками, чтобы при загрузке Home не грузились ненужные страницы
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
/*const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ /* "./pages/NotFound")
);*/

//тоже самое через библиотеку react-loadable, чтобы на стороне сервера
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div>Загрузка 404!!</div>,
});

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
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка корзины!!</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка выбранной пиццы!!</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
