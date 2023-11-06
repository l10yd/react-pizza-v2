import React from "react";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import "../scss/app.scss";
import Pagination from "../Pagination";

import { useSelector, useDispatch } from "react-redux";
import {
  updateFilter,
  newFilter,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";
import { selectSearch } from "../redux/slices/searchSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  //кастомные селекторы, хранятся в соответствующих слайсах
  //да просто заменяют state => state.Name
  //так что их надо делать, если код повторяется в разных компонентах
  const { searchValue } = useSelector(selectSearch);
  const { sortValue, sortOrder, categoryValue, pageValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  //первый рендер - парсим ссылку(если есть) и записываем данные в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log("window search", params);
      dispatch(
        newFilter({
          sortValue: params.sortValue,
          sortOrder: params.sortOrder,
          categoryValue: parseInt(params.categoryValue),
          pageValue: parseInt(params.pageValue),
        })
      );
      isSearch.current = true;
      console.log("Home cat 1st useEffect", categoryValue);
    }
  }, []);

  //без try catch т.к. это обрабатывается в redux через status="loading" и тд
  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortValue,
        sortOrder,
        categoryValue,
        searchValue,
        pageValue,
      })
    );
  };

  //если был первый рендер, запрашиваем пиццы
  React.useEffect(() => {
    //на самый верх страницы скроллим
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [sortValue, sortOrder, categoryValue, searchValue, pageValue]);

  //если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortValue: sortValue,
        sortOrder: sortOrder,
        categoryValue: categoryValue,
        pageValue: pageValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortValue, sortOrder, categoryValue, pageValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Какая-то ошибка!</h2>
          <p>Не удалось получить пиццы!</p>
        </div>
      ) : (
        <div className="content__items">
          {" "}
          {status === "loading"
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}{" "}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
