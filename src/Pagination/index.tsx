import React from "react";
import styles from "./Pagination.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../redux/filter/selectors";
import { updateFilter } from "../redux/filter/slice";

const Pagination: React.FC = () => {
  const pageCount = 3;
  const { pageValue } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      dispatch(updateFilter({ pageValue: newPage }));
    }
  };

  return (
    <div className={styles.root}>
      {pageValue > 1 && (
        <button onClick={() => handlePageChange(pageValue - 1)}>&lt;</button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === pageValue ? styles.selected : null}
        >
          {page}
        </button>
      ))}
      {pageValue < pageCount && (
        <button onClick={() => handlePageChange(pageValue + 1)}>&gt;</button>
      )}
    </div>
  );
};

export default Pagination;
