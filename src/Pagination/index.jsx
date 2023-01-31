import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePagination, value }) => {
  return (
    <div>
      {" "}
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePagination(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={value -1}
        renderOnZ
      />
    </div>
  );
};
export default Pagination;
