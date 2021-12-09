import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Pagination = props => {
  const { totalPages, maxPagesToShow, selectedPageString, onSetPage } = props;
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const makePageArray = totalPages => Array.from({ length: totalPages }, (_, idx) => ++idx);
  const [pages, setPages] = useState(makePageArray(totalPages));
  const pageIdGen = i => `page-${i}`;

  useEffect(() => {
    setPages(makePageArray(totalPages));
    const totPages = selectedPageString === "first" ? 1 : totalPages;
    setCurrentPage(totPages);
    onSetPage(totPages);
  }, [totalPages]);

  useEffect(() => {
    let newPages = [];
    if (maxPagesToShow < totalPages && currentPage > 0) {
      if (currentPage < totalPages - maxPagesToShow) {
        newPages = [
          ...createfromToArray(maxPagesToShow, currentPage),
          "...",
          totalPages
        ];
        setPages(newPages);
      } else {
        newPages = [
          ...createfromToArray(maxPagesToShow + 1, totalPages - maxPagesToShow)
        ];
        setPages(newPages);
      }
    }
  }, [currentPage]);

  const onSetCurrentPage = page => {
    setCurrentPage(page);
    onSetPage(page);
  };

  const createfromToArray = (a, b) =>
    Array(a)
      .fill()
      .map((_, idx) => b + idx);
  return (
    pages.length > 0 && (
      <ul className="page">
        <li
          onClick={() => (currentPage > 1 ? onSetCurrentPage(1) : null)}
          className={`lt ${currentPage > 1 ? "" : "disabled"}`}
        >
          &lt;&lt;
        </li>
        <li
          onClick={() =>
            currentPage > 1 ? onSetCurrentPage(currentPage - 1) : null
          }
          className={`lt ${currentPage > 1 ? "" : "disabled"}`}
        >
          &lt;
        </li>
        {pages.map((page, i) => (
          <li
            key={pageIdGen(i)}
            onClick={() =>
              !isNaN(page) && page <= totalPages ? onSetCurrentPage(page) : null
            }
            {...(page === currentPage && { className: "active" })}
          >
            {page}
          </li>
        ))}
        <li
          onClick={() =>
            currentPage < totalPages ? onSetCurrentPage(currentPage + 1) : null
          }
          className={`gt ${currentPage === totalPages ? "disabled" : ""}`}
        >
          &gt;
        </li>
        <li
          onClick={() =>
            currentPage < totalPages ? onSetCurrentPage(totalPages) : null
          }
          className={`gt ${currentPage === totalPages ? "disabled" : ""}`}
        >
          &gt;&gt;
        </li>
      </ul>
    )
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  maxPagesToShow: PropTypes.number,
  onSetCurrentPage: PropTypes.func
};
Pagination.defaultProps = {};

export default Pagination;
