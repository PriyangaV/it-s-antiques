import React, { useContext } from 'react';
import { ProductList } from '../../components';
import { ProductContext } from '../../context/products';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PageProducts = () => {
  const { sorted, page, changePage } = useContext(ProductContext);

  if (sorted[page]) {
    return (
      <div>
        <ProductList products={sorted[page]} />
        {sorted.length > 1 && (
          <article className="pagination-buttons">
            {/* prev */}
            {page > 0 && (
              <button
                className="prev-page-btn"
                onClick={() => changePage(page - 1)}
              >
                <FaChevronLeft />
              </button>
            )}
            {/* end of prev */}
            {sorted.map((_, index) => {
              return (
                <button
                  onClick={() => changePage(index)}
                  key={index}
                  className={`page-btn ${page === index && `page-btn-current`}`}
                >
                  {index + 1}
                </button>
              );
            })}
            {/* next */}
            {page < sorted.length - 1 && (
              <button
                className="next-page-btn"
                onClick={() => changePage(page + 1)}
              >
                <FaChevronRight />
              </button>
            )}
            {/* end of next */}
          </article>
        )}
      </div>
    );
  } else {
    return (
      <h3 className="search-errors">
        Sorry, no products matched your search. Please try different words that
        mean the same thing.
      </h3>
    );
  }
};

export default PageProducts;
