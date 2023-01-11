import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ViewDropdown.styles.css';

const ViewDropdown = ({ options, label, onSelect }) => {
  const [value, setValue] = useState('');
  const optionList =
    options.length > 0 &&
    options.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });

  const handleChange = (event) => {
    setValue(event.target.value);
    onSelect(event.target.value);
  };
  return (
    <div className="view-dropdown">
      <label htmlFor={label}>{label}</label>
      <div>
        <select id={label} onChange={handleChange} value={value}>
          <option>Choose</option>
          {optionList}
        </select>
      </div>
    </div>
  );
};

ViewDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ViewDropdown;
