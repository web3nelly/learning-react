import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      onChange={e => onChange(e.currentTarget.value)}
      type="text"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      name="query"
    />
  );
}

export default SearchBox;