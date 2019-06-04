import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange
}) => {

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  const handleClasses = page => {
    return page === currentPage ? 'page-item active' : 'page-item';
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={handleClasses(page)}
          >
            <NavLink
              to={'/movies/?page=' + page}
              onClick={() => onPageChange(page)}
              className="page-link"
            >{page}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;