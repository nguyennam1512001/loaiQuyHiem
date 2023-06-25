import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers.map((number) => (
        <li
          key={number}
          className={currentPage === number ? 'active' : ''}
          onClick={() => onPageChange(number)}
        >
          {number}
        </li>
      ));
    } else {
      const renderedPages = [];
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          renderedPages.push(
            <li
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => onPageChange(i)}
            >
              {i}
            </li>
          );
        }
        renderedPages.push(<li key="dots1">...</li>);
        renderedPages.push(
          <li
            key={totalPages}
            className={currentPage === totalPages ? 'active' : ''}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </li>
        );
      } else if (currentPage >= totalPages - 1) {
        renderedPages.push(
          <li
            key={1}
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => onPageChange(1)}
          >
            1
          </li>
        );
        renderedPages.push(<li key="dots2">...</li>);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          renderedPages.push(
            <li
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => onPageChange(i)}
            >
              {i}
            </li>
          );
        }
      } else {
        renderedPages.push(
          <li
            key={1}
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => onPageChange(1)}
          >
            1
          </li>
        );
        renderedPages.push(<li key="dots3">...</li>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          renderedPages.push(
            <li
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => onPageChange(i)}
            >
              {i}
            </li>
          );
        }
        renderedPages.push(<li key="dots4">...</li>);
        renderedPages.push(
          <li
            key={totalPages}
            className={currentPage === totalPages ? 'active' : ''}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </li>
        );
      }
  
      return renderedPages;
    }
  };
  

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <>
          <li
            className="prev"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </li>
        </>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <>
          <li
            className="next"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </li>
        </>
      )}
    </ul>
  );
};

export default Pagination;
