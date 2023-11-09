import React from "react";
import "../scss/app.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../redux/filter/selectors";
import { updateFilter } from "../redux/filter/slice";

const categories = [
  "Все",
  "Мясные",
  "Вегетрианская",
  "Гриль",
  "Острая",
  "Закрытая",
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(
                updateFilter({
                  categoryValue: index === 0 ? 0 : index % categories.length,
                })
              );
            }}
            className={category === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
