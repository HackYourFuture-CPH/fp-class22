import React from 'react';
import PropTypes from 'prop-types';
import './ViewPageButton.styles.css';

export const ViewPageButton = ({ label, backgroundColor }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor }}
      className="view-page-button"
    >
      {label}
    </button>
  );
};

ViewPageButton.propTypes = {
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
