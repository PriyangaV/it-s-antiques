import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';

const Filters = () => {
  const {
    sorted,
    filters: { search, category, shipping, price },
    updateFilters,
  } = useContext(ProductContext);
  return (
    <section className="section filters-section">
      <h2 className="section-title">Filters</h2>
      <form className="filters-form">
        <div>
          {/* search input */}
          <div className="form-group">
            <label htmlFor="search" className="heading">
              search
            </label>
            <input
              type="text"
              id="search"
              className="form-control"
              name="search"
              value={search}
              placeholder="Search here..."
              onChange={updateFilters}
            />
          </div>
          {/* end of search input */}

          {/* select category */}
          <div className="form-group items">
            <label htmlFor="category" className="heading">
              category
            </label>
            <select
              name="category"
              id="category"
              className="form-control"
              value={category}
              onChange={updateFilters}
            >
              <option value="all">all</option>
              <option value="watch">watch</option>
              <option value="camera">camera</option>
              <option value="frame">frame</option>
              <option value="perfume">perfume</option>
            </select>
          </div>
          {/* end of select category */}

          {/* free shipping */}
          <div className="form-group items">
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
            <label htmlFor="shipping" className="heading">
              free shipping
            </label>
          </div>
          {/* end of free shipping */}
        </div>
        <div className="price-group items">
          <p className="heading">price</p>
          <label>
            <input
              type="radio"
              name="price"
              value="all"
              checked={price === 'all'}
              onChange={updateFilters}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="0"
              checked={price === 0}
              onChange={updateFilters}
            />
            $0 - $300
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="300"
              checked={price === 300}
              onChange={updateFilters}
            />
            $300 - $650
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="650"
              checked={price === 650}
              onChange={updateFilters}
            />
            Over $650
          </label>
        </div>
      </form>
      {sorted.flat().length > 0 && (
        <h6>
          {sorted.flat().length > 1 ? 'total products:' : 'total product:'}
          {sorted.flat().length}
        </h6>
      )}
      <hr />
    </section>
  );
};

export default Filters;
