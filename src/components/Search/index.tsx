import React, { ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { clear, update } from "../../redux/search/slice";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
  //костыльный стейт для debounce
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(clear());
    setValue("");
    //оператор опциональной последовательности
    //? - если есть current, двигаемся дальше
    //без этого typescript ругается, т.к. может быть null
    inputRef.current?.focus();
  };

  //обновляет данные из поисковой строки через 1 сек
  //чтобы не ддосить бэкенд при каждом обновлении инпута
  //без колбэка функция перевызывается при каждом рендере (не работает)
  const updateSearch: (text: string) => void = React.useCallback(
    debounce((text: string) => {
      dispatch(update(text));
    }, 1000),
    []
  );

  //сразу меняет содержимое поисковой строки
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    //вызываем обновление redux с задержкой
    updateSearch(event.target.value);
  };

  //для примера - типизация для клика мыши на весь элемент
  const onClickDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    //console.log(event);
  };

  return (
    <div onClick={onClickDiv} className={styles.root}>
      <svg
        className={styles.icon}
        height="32px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="32px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <span onClick={onClickClear} className={styles.clearIcon}>
          &#10006;
        </span>
      )}
    </div>
  );
};

export default Search;
