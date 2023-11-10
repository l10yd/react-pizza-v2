import React from "react";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import "../scss/app.scss";

//рееэкспорт в components/index
import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
} from "../components/";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { newFilter } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/pizza/slice";
import { selectPizza } from "../redux/pizza/selectors";
import { selectSearch } from "../redux/search/selectors";

const Home: React.FC = () => {
  //наводит курсор обратно в поиск после очистки (нажать крестик)
  const navigate = useNavigate();
  //кастомный диспатч, чтобы диспатчить только эшны из стора
  //а также асинхронные экшны
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  //кастомные селекторы, хранятся в соответствующих слайсах
  //да просто заменяют state => state.Name
  //так что их надо делать, если код повторяется в разных компонентах
  const { searchValue } = useSelector(selectSearch);
  const { sortValue, sortOrder, categoryValue, pageValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  //типы для парсинга ссылки - params
  interface UrlParams {
    sortValue: string;
    sortOrder: string;
    categoryValue: string;
    pageValue: string;
  }

  //первый рендер - парсим ссылку(если есть) и записываем данные в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params: UrlParams = {
        sortValue: "",
        sortOrder: "",
        categoryValue: "",
        pageValue: "",
        ...qs.parse(window.location.search.substring(1)),
      };
      dispatch(
        newFilter({
          sortValue: params.sortValue,
          sortOrder: params.sortOrder,
          categoryValue: parseInt(params.categoryValue),
          pageValue: parseInt(params.pageValue),
        })
      );
      isSearch.current = true;
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
            : items.map((obj: any) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}{" "}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
