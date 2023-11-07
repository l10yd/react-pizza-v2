import React from "react";
import "../scss/app.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectFilter, updateFilter } from "../redux/slices/filterSlice";

const Sort: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  //определяем свой тип - аналогично Record<string,string>
  type SortItem = {
    [key: string]: string;
  };
  //и применяем его сюда, хотя вообще тут ключи это не строки, но пашет
  const list: SortItem = {
    rating: "популярности",
    price: "цене",
    title: "алфавиту",
  };

  const sortRef = React.useRef<HTMLDivElement | null>(null);
  const { sortValue } = useSelector(selectFilter);
  const dispatch = useDispatch();

  //закрывает сорт, если жмем на любое место на экране
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() => dispatch(updateFilter({ sortOrder: "asc" }))}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>По возрастанию</title>
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5 0.16927 5.31576 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5 0.16927 5.31576 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <svg
          onClick={() => dispatch(updateFilter({ sortOrder: "desc" }))}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          transform="rotate(180)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>По убыванию</title>
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5 0.16927 5.31576 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5 0.16927 5.31576 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{list[sortValue]}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {Object.keys(list).map((key) => (
              <li
                key={key}
                onClick={() => {
                  dispatch(updateFilter({ sortValue: key }));
                  setOpen(!open);
                }}
                className={sortValue === key ? "active" : ""}
              >
                {list[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
